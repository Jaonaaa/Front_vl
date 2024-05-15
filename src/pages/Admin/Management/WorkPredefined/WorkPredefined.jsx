import React, { useEffect, useState } from "react";
import ContentContainer from "../../../../components/ContentContainer/ContentContainer";
import { SiUpptime } from "react-icons/si";
import Actions from "../../../../components/Action/Actions";
import Modal from "../../../../utilsComponents/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import Form from "../../../../utilsComponents/Form/Form";
import { alaivoGet } from "../../../../utils/Alaivo";
import CardTypeBuilding from "./CardTypeBuilding";
import Row from "../../../../utilsComponents/Form/Row";
import "./WorkType.sass";

const WorkPredefined = () => {
  const { houseType } = useGetData();
  const [selectedHouse, setSelectedHouse] = useState(0);
  const handleSelectedHouse = (index) => {
    console.log(index);
    setSelectedHouse(index);
  };
  return (
    <ContentContainer>
      <div className="inner">
        <Form title="Add Predifined Work" className="fullWidth">
          <Row title={"Tupe of the construction"} className="row-right">
            {houseType.map((house, i) => (
              <CardTypeBuilding
                {...house}
                key={i}
                price={house.price}
                index={i}
                onClick={handleSelectedHouse}
                className={selectedHouse === i ? "selected_card" : ""}
              />
            ))}
          </Row>
        </Form>
      </div>
      <Options />
    </ContentContainer>
  );
};

const useGetData = () => {
  const [houseType, setHouseType] = useState([]);

  useEffect(() => {
    getHouses();
  }, []);

  const getHouses = async () => {
    let res = await alaivoGet("buildingType", null, false);
    console.log(res);
    setHouseType(res.data);
  };

  return { houseType };
};

const Options = () => {
  const [openAdd, setOpenAdd] = useState(false);
  const handleAdd = () => {
    setOpenAdd(!openAdd);
  };
  return (
    <>
      <AnimatePresence>{openAdd && <Modal closer={handleAdd}>Text</Modal>}</AnimatePresence>
      <Actions
        actions={[{ text: "Open Modal", onClick: handleAdd }]}
        text={
          <>
            Work type features <SiUpptime style={{ marginLeft: "0.5rem" }} />{" "}
          </>
        }
      />
    </>
  );
};

export default WorkPredefined;

const pp = (
  <>
    {/* <AnimatePresence>{openAdd && <Modal closer={handleAdd}>Text</Modal>}</AnimatePresence>
    <Actions
      actions={[{ text: "Open Modal", onClick: handleAdd }]}
      // text={
      //   <>
      //     Work type features <SiUpptime style={{ marginLeft: "0.5rem" }} />{" "}
      //   </>
      // }
    /> */}
  </>
);
