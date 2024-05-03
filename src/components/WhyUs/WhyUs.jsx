import ChooseBox from "../ChooseBox";
import "./WhyUs.css";
import React from "react";
import BitHand from "../../images/chooseus/choose-main.png";
import {
  IconChecklist,
  IconDeviceMobileMessage,
  IconMoneybag,
  IconPencilBolt,
  IconStack,
  IconWallet,
} from "@tabler/icons-react";
import chooseBoxData from "./chooseBoxData.json";

function WhyUs() {
  const icons = {
    IconWallet,
    IconPencilBolt,
    IconChecklist,
    IconDeviceMobileMessage,
    IconMoneybag,
    IconStack,
  };

  return (
    <>
      <section id="choose-us" className="why-section">
        <div className="container">
          <div className="choose-container">
            <h2>
              <span>چرا ما را انتخاب کنید</span>
            </h2>
            <div className="choose-container__content">
              {chooseBoxData.map((item, index) => (
                <ChooseBox
                  key={index}
                  img={React.createElement(icons[item.img])}
                  title={item.title}
                  text={item.text}
                />
              ))}
              {/* <div className="choose-container__content__2">
                <img src={BitHand} alt="hand_img" />
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default WhyUs;
