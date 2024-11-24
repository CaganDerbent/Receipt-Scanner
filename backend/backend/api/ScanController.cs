using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Threading.Tasks;
using System;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Http;
using backend.Models;
using Newtonsoft.Json.Linq;

namespace YourNamespace.Controllers
{
    [ApiController]
    public class ProcessController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;

        public ProcessController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }
        [Route("/")]
        [HttpGet]
        public IActionResult GetHelloWorld()
        {
            return Ok("Hello World");
        }

        [Route("/process")]
        [HttpPost]
        public async Task<IActionResult> Process([FromForm] IFormFile file)
        {
            try
            {
                if (file == null)
                {;
                    return BadRequest(new { error = "Dosya yüklenemedi." });
                }


                var ext = Path.GetExtension(file.FileName);
                var filename = $"{DateTimeOffset.UtcNow.ToUnixTimeMilliseconds()}{ext}";
                var filePath = Path.Combine("/tmp", filename);

                if (!Directory.Exists("/tmp"))
                {
                    Directory.CreateDirectory("/tmp");
                }

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                byte[] imageBytes = await System.IO.File.ReadAllBytesAsync(filePath);
                string base64Image = Convert.ToBase64String(imageBytes);

                string apiKey = Environment.GetEnvironmentVariable("API_KEY");
                string prompt = Environment.GetEnvironmentVariable("PROMPT");

                var requestBody = new
                {
                    model = "gpt-4o",
                    messages = new[]
                    {
                        new
                        {
                            role = "user",
                            content = new object[]
                            {
                                new { type = "text", text = prompt },
                                new
                                {
                                    type = "image_url",
                                    image_url = new
                                    {
                                        url = $"data:image/jpeg;base64,{base64Image}"
                                    }
                                }
                            }
                        }
                    },
                    max_tokens = 2048,
                    temperature = 1.0
                };

                var client = _httpClientFactory.CreateClient();
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

                var jsonContent = JsonConvert.SerializeObject(requestBody);
                var httpContent = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                var response = await client.PostAsync("https://api.openai.com/v1/chat/completions", httpContent);

                if (!response.IsSuccessStatusCode)
                {
                    var errorResponse = await response.Content.ReadAsStringAsync();
                    Console.WriteLine(errorResponse);
                    return StatusCode((int)response.StatusCode, errorResponse);
                }

                var result = await response.Content.ReadAsStringAsync();


                var jsonResponse = JObject.Parse(result);

                var messageContent = jsonResponse["choices"][0]["message"]["content"].ToString();

                messageContent = messageContent.Replace("```json", "").Replace("```", "").Trim();

                var jsonObject = JObject.Parse(messageContent);

                string companyname = jsonObject["CompanyName"].ToString();
                string date = jsonObject["Date"].ToString();
                string taxnum = jsonObject["TaxID"].ToString();
                string total =jsonObject["Total"]?.ToString();
                string tax = jsonObject["Tax"]?.ToString();
                string address = jsonObject["Address"].ToString();


                var receipt = new Receipts
                {
                    CompanyName = companyname,
                    Date = date,
                    TaxID = taxnum,
                    Tax = tax,
                    Address = address,
                    Total = total

                };

                return Ok(receipt);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(500, ex);
            }
        }
    }
}