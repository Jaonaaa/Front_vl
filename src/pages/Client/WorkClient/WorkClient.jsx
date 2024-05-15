import React, { useEffect, useState } from "react";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../utilsComponents/Modal/Modal";
import Actions from "../../../components/Action/Actions";
import Form from "../../../utilsComponents/Form/Form";
import CardTypeBuilding from "../../Admin/Management/WorkPredefined/CardTypeBuilding";
import { alaivoGet, alaivoPost } from "../../../utils/Alaivo";
import Row from "../../../utilsComponents/Form/Row";
import "./WorkClient.sass";
import useForm from "../../../hooks/useForm";
import Input from "../../../utilsComponents/Input/Input";
import { getUserPresp } from "../../../hooks/useIdentity";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import Table from "../../../utilsComponents/Table/Table";
import PDFDevis from "./PdfDevis";
import { formatNumber, formatTimestamp } from "../../../utils/Format";
import Select from "../../../utilsComponents/Select/Select";

export const dataDefault = {
  titles: ["Type", "Finition", "Price total", "Created", "Works begin at", "End at", ""],
  classes: ["", ""],
  index: ["type", "finition", "price", "create", "begin", "end", "export"],
  body: [],
};

const WorkClient = () => {
  const [dataBody, setDataBody] = useState(dataDefault);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const user = getUserPresp();
    let res = await alaivoGet("devis/client/" + user.id, null, false);
    console.log(res.data);
    const dataPDF = {
      titles: ["DESIGNATION", "Unite", "Quantité", "PU", "TOTAL   "],
      index: ["label", "unite", "quantite", "pu", "total"],
      body: [],
    };

    let data = res.data.map((row) => ({
      type: row.buildingTypeLabel,
      finition: row.buildingFinitionLabel + ` - ${row.buildingFinitionPercent}%`,
      price: formatNumber(row.total_price) + " Ar",
      create: formatTimestamp(row.creation_date),
      begin: formatTimestamp(row.begin_date),
      end: formatTimestamp(row.end_date),
      export: (
        <PDFDevis data={{ ...dataPDF, body: formatDataPDF(row.devisSetDetails, [], 0) }} devis={row} total_devis={row.total_price} />
      ),
    }));

    setLoading(false);
    setDataBody({ ...dataDefault, body: data });
  };

  const formatDataPDF = (rows, returnData = [], profondeur) => {
    let rows_ = rows;
    for (let i = 0; i < rows_.length; i++) {
      let total = +rows_[i].quantity * rows_[i].pu;
      let new_data = {
        profondeur: profondeur,
        label: getSpace(profondeur) + rows_[i].work_label,
        unite: rows_[i].unit,
        quantite: rows_[i].quantity,
        pu: rows_[i].pu,
        total: total === 0 ? "" : +total + " Ar",
      };
      returnData = [...returnData, new_data];
      if (rows_[i].childDevisSetDetails.length > 0) {
        const prof = profondeur + 1;
        returnData = [...formatDataPDF(rows_[i].childDevisSetDetails, returnData, prof)];
      }
      if (profondeur === 0) {
      }
    }
    return returnData;
  };

  const getSpace = (length) => {
    let spaces = "";
    for (let i = 0; i < length; i++) {
      spaces += "    ";
    }
    return spaces;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentContainer>
      <div className="inner">
        <Table {...dataBody} headerOn={{ title: "My devis" }} rowCount={10} loadingContent={loading} />
      </div>
      <Options />
    </ContentContainer>
  );
};

export default WorkClient;

const Options = () => {
  const { houseType, finitions, lieux } = useGetData();
  const { notifs, addNotifs } = useMyNotifs();
  const [selectedHouse, setSelectedHouse] = useState(0);
  const [selectedFinition, setSelectedFinition] = useState(0);
  const { formData, handleInputForm } = useForm();

  const handleSelectedHouse = (index) => {
    setSelectedHouse(index);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = {
      buildingType: houseType[selectedHouse],
      buildingFinition: finitions[selectedFinition],
      ...formData,
      id_user: getUserPresp().id,
    };

    if (data.begin_date === undefined || data.begin_date === "") {
      addNotifs("error", "Please enter a time for lauching the work");
      return;
    }
    data.begin_date = data.begin_date + ":00.0+03:00";
    let res = await alaivoPost("devis", JSON.stringify(data), null, false);
    addNotifs(res.status, res.message);

    if (res.status === "ok")
      setTimeout(() => {
        handleAdd();
      }, 2000);
  };

  const [openAdd, setOpenAdd] = useState(false);
  const handleAdd = () => {
    setOpenAdd(!openAdd);
  };
  return (
    <>
      <AnimatePresence>
        {notifs.map((notif) => notif)}

        {openAdd && (
          <Modal closer={handleAdd}>
            <div className="column-modal" style={{ display: "flex", flexDirection: "column" }}>
              <Form title="Add Predifined Work" onSubmit={handleSubmit} className="fullWidth-screen">
                <Row title={"Type of the construction"} className="row-right">
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
                <Row className="centered-row" title={"Finitions"}>
                  {finitions.map((finition, i) => (
                    <div
                      className={`card_finition ${selectedFinition === i ? "selected_card" : ""}`}
                      key={i}
                      onClick={() => {
                        setSelectedFinition(i);
                      }}
                    >
                      <div className="value"> {finition.percent} %</div>
                      <div className="title"> {finition.label}</div>
                    </div>
                  ))}
                </Row>
                <Row className="centered-row">
                  <Input type="datetime-local" onChange={handleInputForm} title="Begin time of works" name="begin_date" />
                  <Select name={"lieu"} onChange={handleInputForm} title={"Lieu"} optionsType={lieux} />
                </Row>
                <div className="row_margin" style={{ margin: "2rem 0" }}></div>
              </Form>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <Actions actions={[{ text: "New Devis ", onClick: handleAdd }]} />
    </>
  );
};

const useGetData = () => {
  const [houseType, setHouseType] = useState([]);
  const [finitions, setFinitions] = useState([]);
  const [lieux, setLieux] = useState([]);

  useEffect(() => {
    getHouses();
    getFinitions();
    getLieux();
  }, []);

  const getHouses = async () => {
    let res = await alaivoGet("buildingType", null, false);
    setHouseType(res.data);
  };

  const getFinitions = async () => {
    let res = await alaivoGet("buildingFinition", null, false);
    setFinitions(res.data);
  };

  const getLieux = async () => {
    let res = await alaivoGet("lieu", null, false);
    let data = res.data.map((row) => ({
      label: row.label,
      value: row,
    }));
    setLieux(data);
  };

  return { houseType, finitions, lieux };
};
