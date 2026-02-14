import { Header } from "@/components";
import bgImage from "@assets/bg.png";
import "./homePage.scss";

export const HomePage = () => {
  return (
    <div className="c-page">
      <img src={bgImage} alt="Background" className="c-page-background" />
      <div className="c-container">
        <Header />
      </div>
    </div>
  );
};
