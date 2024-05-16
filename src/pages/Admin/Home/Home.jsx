import React, { useEffect, useState } from "react";
import PerspectiveBox from "../../../components/Home/PerspectiveBox/PerspectiveBox";
import Banner from "../../../components/Home/Banner/Banner";
import ActuSwiper from "../../../components/Home/ActuSwiper/ActuSwiper";
import { motion } from "framer-motion";
import { variantContainerStag } from "../../../utilsComponents/Variants";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import { getUserPresp } from "../../../hooks/useIdentity";
import BannerImg from "../../../assets/img/AdminBanner.png";

import { useNavigate } from "react-router-dom";
import { bannersNews } from "./Banners";
import { alaivoGet, alaivoGetFile } from "../../../utils/Alaivo";
import CustomChart from "../../../utilsComponents/Chart/CustomChart";
import Select from "../../../utilsComponents/Select/Select";
import useForm from "../../../hooks/useForm";
import HorizContainer from "../../../utilsComponents/Container/HorizContainer/HorizContainer";
import { getMonthName } from "../../../utils/Uid";
import { formatNumber } from "../../../utils/Format";
import "./Home.sass";

const example = {
  labels: ["0000", "0000", "0000", "0000", "0000"],
  datasets: [
    {
      label: "Devis amount",
      backgroundColor: ["#e97a5e"],
      borderWidth: 1,
      data: [0, 0, 0, 0, 0],
    },
  ],
};

const HomeAdmin = () => {
  const user = getUserPresp();
  const [totalDevise, setTotalDevise] = useState(0);
  const [totalPayement, setTotalPayement] = useState(0);

  const [dataGraph, setDataGraph] = useState(example);
  const nav = useNavigate();
  const [filterTimeLabel, setFilter] = useState([{ label: 0, value: 0 }]);

  const getTotalDevise = async () => {
    let res = await alaivoGet("devis/total", null, false);
    setTotalDevise(res.data);
  };

  const getTotalPayement = async () => {
    let res = await alaivoGet("payement/all/amount", null, false);
    setTotalPayement(res.data);
  };

  const getAllYearDevis = async () => {
    let res = await alaivoGet("devis/allYear", null, false);
    let data = res.data.map((re) => ({
      label: re,
      value: re,
    }));
    setFilter(data);
  };

  const handleFilterTime = (e) => {
    getDataGraph(e.target.value);
  };

  const getDataGraph = async (categorie) => {
    let res = await alaivoGet("devis/by/month/" + categorie, null, false);
    console.log(res);
    /// eto raha anampy anleh date
    let data = {
      labels: res.data.labels.map((label) => getMonthName(label)),
      datasets: [
        {
          label: "Devis amount",
          backgroundColor: ["#e97a5e"],
          borderWidth: 1,
          data: res.data.values.map((val) => +val),
        },
      ],
    };
    setDataGraph(data);
  };

  useEffect(() => {
    getTotalDevise();
    getTotalPayement();
    getAllYearDevis();

    // alaivoGetFile("works/csv", null, false, "test", "csv");
  }, []);

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
              subtitle="Here you can check all the news activities for Constructor Company"
              btn_text={"Look Projects"}
              onClick={() => {
                nav("/devis");
              }}
            />
            <ActuSwiper contents={bannersNews} />
          </motion.div>
          <motion.div
            className="row grid_row"
            variants={variantContainerStag}
            style={{ minHeight: "fit-content", justifyContent: "center" }}
          >
            <PerspectiveBox bubbleBg="blue" title_box="Amount total devis" value=" XX " valueBox={formatNumber(totalDevise) + " Ar"} />

            <PerspectiveBox
              bubbleBg="red"
              title_box="Amount total payement"
              value=" XX "
              valueBox={formatNumber(totalPayement, 2) + " Ar"}
            />
          </motion.div>
          <motion.div
            className="row grid_row"
            variants={variantContainerStag}
            style={{ minHeight: "fit-content", justifyContent: "center" }}
          >
            <HorizContainer title={"Histogramme devis"}>
              <div className="Graphics" style={{ minWidth: "50%", margin: "auto", flexDirection: "column", alignItems: "flex-end" }}>
                <div
                  className="filter"
                  style={{ display: "flex", marginLeft: "auto", marginBottom: "1.5rem", justifyContent: "flex-end" }}
                >
                  <Select
                    title={"Filter"}
                    name={"time"}
                    onChange={(e) => {
                      handleFilterTime(e);
                    }}
                    optionsType={filterTimeLabel}
                  />
                </div>
                <div className="kkk" style={{ width: "50vw" }}>
                  <CustomChart
                    datasets={dataGraph.datasets}
                    type="bar"
                    labels={dataGraph.labels}
                    title="Amount of devis"
                    positionTitle="top"
                  />
                </div>
              </div>
            </HorizContainer>
          </motion.div>
        </motion.div>
      </div>
    </ContentContainer>
  );
};

export default HomeAdmin;
