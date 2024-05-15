import React from "react";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import { getUserPresp } from "../../../hooks/useIdentity";
import { motion } from "framer-motion";
import Banner from "../../../components/Home/Banner/Banner";
import ActuSwiper from "../../../components/Home/ActuSwiper/ActuSwiper";
import BannerImg from "../../../assets/img/ClientBanner.png";
import PerspectiveBox from "../../../components/Home/PerspectiveBox/PerspectiveBox";
import { variantContainerStag } from "../../../utilsComponents/Variants";
import PercentBox from "../../../components/Home/PercentBox/PercentBox";
import new1 from "../../../assets/img/new_1.jpeg";
import new2 from "../../../assets/img/new_2.jpg";

import "./Home.sass";
import { useNavigate } from "react-router-dom";

const bannersNews = [
  {
    categorie: "Project Highlights",
    title: "The Constructor Company's Latest Sustainable Project ",
    description:
      "Explore how the Constructor Company is pushing the boundaries of sustainable construction with their newest project, incorporating green building practices and innovative technologies to create a greener urban environment.",
    imgSrc: new1,
  },
  {
    categorie: "Industry Trends and Insights",
    title: "BTP Industry Trends and Constructor Company's Strategic Vision",
    description:
      "Dive into the evolving trends in the BTP sector and discover how the Constructor Company is strategically positioning itself to capitalize on emerging opportunities, from digital transformation to sustainable construction practices.",
    imgSrc: new2,
  },
];

const HomeClient = () => {
  const user = getUserPresp();
  const nav = useNavigate();

  return (
    <ContentContainer>
      <div className="inner">
        <motion.div variants={variantContainerStag} initial="initial" animate="animate" className="container_home_main">
          <motion.div className="row" variants={variantContainerStag}>
            <Banner
              imgSrc={BannerImg}
              title={
                <>
                  Welcome back 🤞
                  <br />
                  {user ? user.firstname + " " + user.lastname : " //// "}
                </>
              }
              color_bg="#f6e0cf"
              color_btn="#a36948"
              color_subtitle="#7f3823"
              color_title="#4d1e08"
              subtitle="Here you can look at all of your project on going with Constrcutor"
              btn_text={"Look activities"}
              onClick={() => {
                nav("/works");
              }}
            />
            <ActuSwiper contents={bannersNews} />
          </motion.div>
          <motion.div
            className="row grid_row"
            variants={variantContainerStag}
            style={{ minHeight: "fit-content", justifyContent: "center" }}
          >
            {/* <PerspectiveBox bubbleBg="blue" title_box="Number of project" value="+2%" valueBox="10" />
            <PerspectiveBox bubbleBg="#20c01f" title_box="Project done" value="+10%" valueBox="5" />
            <PerspectiveBox bubbleBg="#fd9815d6" title_box="Ongoing project" value="+14%" valueBox="5" />
            <PercentBox max={100} value={73} title="Rebuilding House in Mosco" clientName="Peter Parker" /> */}
          </motion.div>

          <motion.div
            className="row grid_row"
            variants={variantContainerStag}
            style={{ minHeight: "fit-content", justifyContent: "center" }}
          ></motion.div>
        </motion.div>
      </div>
    </ContentContainer>
  );
};

export default HomeClient;
