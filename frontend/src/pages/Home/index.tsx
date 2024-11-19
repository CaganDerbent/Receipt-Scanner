import { lazy } from "react";
import IntroContent from "../../content/IntroContent.json";
import MiddleBlockContent from "../../content/MiddleBlockContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";
import { title } from "process";
import { useHistory } from "react-router-dom";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));

const Home = () => {

  const history = useHistory();

const handleButtonClick = () => {
  history.push('/scan'); 
};

  return (
    <Container>
      <ScrollToTop /> 
      <ContentBlock
        direction="right"
        title={"Scan your receipt easily with Receipt AI"}
        content={"Receipt AI allows you to effortlessly scan and process receipts with advanced artificial intelligence. Quickly extract key information such as totals, dates, and vendor names, all from a simple scan. Save time, reduce errors, and streamline your receipt management process with cutting-edge technology."}
        button={[{ title: "Try it out !", onClick: handleButtonClick }]}
        icon="receipt.svg"
        id="intro" 
      />
      
    </Container>
  );
};

export default Home;
