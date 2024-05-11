import React from "react";
import Banner from "./Banner/Banner";
import ActuSwiper from "./ActuSwiper/ActuSwiper";
import { motion } from "framer-motion";
import { variantContainerStag } from "../../utilsComponents/Variants";
import PerspectiveBox from "./PerspectiveBox/PerspectiveBox";
import ContentContainer from "../ContentContainer/ContentContainer";
import Input from "../../utilsComponents/Input/Input";
import useForm from "../../hooks/useForm";
import { alaivoGet, alaivoPost } from "../../utils/Alaivo";
import HorizContainer from "../../utilsComponents/Container/HorizContainer/HorizContainer";
import Card from "../../utilsComponents/Card/Card";
import img from "../../assets/img/brume.jpg";
import "./Home.sass";
import { getRandomValue } from "../../utils/Uid";

const Home = () => {
  const { formData, handleInputForm } = useForm();

  const submit = async (e) => {
    e.preventDefault();
    formData.time_ = formData.time + ":00.00+03:00";
    // formData.time = formData.time;
    //
    console.log(formData);
    let res = await alaivoPost("test/time", JSON.stringify(formData));
    console.log(res);
  };

  return (
    <>
      <ContentContainer>
        <div className="inner">
          <motion.div variants={variantContainerStag} initial="initial" animate="animate" className="container_home_main">
            <motion.div className="row" variants={variantContainerStag}>
              <Banner />
              <ActuSwiper />
            </motion.div>
            <motion.div
              className="row grid_row"
              variants={variantContainerStag}
              style={{ minHeight: "fit-content", justifyContent: "center" }}
            >
              <PerspectiveBox bubbleBg="red" />
              <PerspectiveBox bubbleBg="#9acbe4" />
              <PerspectiveBox bubbleBg="#9acbe4" />
            </motion.div>
            <motion.div
              className="row grid_row"
              variants={variantContainerStag}
              style={{ minHeight: "fit-content", justifyContent: "center" }}
            >
              <HorizContainer title={"Cards"}>
                {/* <form onSubmit={submit}>
                  <Input type="datetime-local" name="time" title="Times" onChange={handleInputForm} />
                  <button> Send</button>
                </form> */}
                <div className="cards_container">
                  {[...Array(6).keys()].map((c) => (
                    <Card
                      key={c}
                      title={"Lorem Ispum"}
                      imgSrc={img}
                      value={getRandomValue(1, 100) + " $"}
                      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, corrupti esse, perferendis sunt soluta quidem quia dicta quisquam tenetur recusandae est ea."
                      actions={[{ text: "Check it" }, { text: "Buy now", className: "btn-black" }]}
                    />
                  ))}
                </div>
              </HorizContainer>
            </motion.div>
          </motion.div>
        </div>
      </ContentContainer>
    </>
  );
};

export default Home;
