import React, { useState } from "react";
import Bg from "../../../assets/img/brume.jpg";
import ArrowRight from "../../../assets/svg/ArrowRight";
import LineSlide from "../../../utilsComponents/Container/LineSlide/LineSlide";
import "./ActuSwiper.sass";
const data = {
  categorie: "Featured App",
  title: "Lorem ipsnum",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  imgSrc: Bg,
};

const ActuSwiper = ({ contents = [data, data] }) => {
  const [content, setContent] = useState(contents);
  const [percent, setPercent] = useState(0);

  const next = () => {
    const next = percent + 100;
    if (next >= 100 * content.length) return;
    setPercent(next);
  };

  const back = () => {
    const back = percent - 100;
    if (back < 0) return;
    setPercent(percent - 100);
  };

  return (
    <div className="actu_swiper_container">
      <div className="counter_part">
        {content.map((c, key) => (
          <div
            className={`round ${key === percent / 100 ? "on" : ""}`}
            onClick={() => {
              setPercent(key * 100);
            }}
            key={key}
          ></div>
        ))}
      </div>
      <div className="switcher_part">
        <div className="go_left" onClick={back}>
          <ArrowRight />
        </div>
        <div className="go_right" onClick={next}>
          <ArrowRight />
        </div>
      </div>
      {content.map((c, key) => (
        <div className="block_actu" key={key} style={{ transform: `translateX(-${percent}%)` }}>
          <div className="actu_pic">
            <img src={c.imgSrc} />
          </div>
          <div className="about">
            <LineSlide>
              <div className="categorie"> {c.categorie}</div>
            </LineSlide>
            <LineSlide>
              <div className="title_about">{c.title}</div>
            </LineSlide>
            <LineSlide>
              <div className="description">{c.description}</div>
            </LineSlide>
          </div>
          <div className="overlay"></div>
        </div>
      ))}
    </div>
  );
};

export default ActuSwiper;
