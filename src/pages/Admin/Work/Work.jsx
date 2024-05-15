import React, { useEffect, useState } from "react";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import { alaivoDelete, alaivoGet } from "../../../utils/Alaivo";
import PercentBox from "../../../components/Home/PercentBox/PercentBox";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../utilsComponents/Modal/Modal";
import Table from "../../../utilsComponents/Table/Table";
import Box from "../../../utilsComponents/Box/Box";
import Actions from "../../../components/Action/Actions";
import { FaTrash } from "react-icons/fa6";
import { getUserPresp } from "../../../hooks/useIdentity";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import "./Work.sass";
import { formatNumber, formatTimestamp } from "../../../utils/Format";

const Work = () => {
  const { devis } = useGetData();
  const { addNotifs, notifs } = useMyNotifs();

  const deleteAllData = async () => {
    const user = getUserPresp();
    let res = await alaivoDelete("db/all", JSON.stringify({ email: user.email, password: user.password }), null, false);
    addNotifs(res.status, res.message);
  };
  return (
    <ContentContainer>
      {notifs.map((notif) => notif)}
      <div className="inner">
        <div className="title_works">List of devis</div>"
        <div className="list_works">
          {devis.map((d, i) => (
            <div className="box" key={i} style={{ width: "fit-content" }}>
              <DetailsWorks devis={d} />
            </div>
          ))}
          <Actions actions={[{ icon: <FaTrash />, text: "Delete all data", onClick: deleteAllData }]} />
        </div>
      </div>
    </ContentContainer>
  );
};

export const dataDefault = {
  titles: ["Designation", "Unité", "Quantité", "Prix unitaire", "total"],
  classes: ["", ""],
  index: ["label", "unite", "quantite", "pu", "total"],
  body: [],
};

const DetailsWorks = ({ devis }) => {
  const [openModal, setModalOpen] = useState(false);
  const [dataTable, setDataTable] = useState(dataDefault);

  const handleOpen = () => {
    setModalOpen(!openModal);
  };

  const setData = () => {
    let data = formatData(devis.devisSetDetails, [], 0);
    setDataTable({ ...dataDefault, body: data });
  };

  const formatData = (rows, returnData = [], profondeur) => {
    let rows_ = rows;
    for (let i = 0; i < rows_.length; i++) {
      let total = +rows_[i].quantity * rows_[i].pu;
      let new_data = {
        profondeur: profondeur,
        label: rows_[i].work_label,
        unite: rows_[i].unit,
        quantite: rows_[i].quantity,
        pu: rows_[i].pu,
        total: total === 0 ? "" : total + " Ar",
        total_price: total === 0 ? 0 : total,
      };
      returnData = [...returnData, new_data];
      if (rows_[i].childDevisSetDetails.length > 0) {
        const prof = profondeur + 1;
        returnData = [...formatData(rows_[i].childDevisSetDetails, returnData, prof)];
      }
    }
    return returnData;
  };

  const amounTotal = () => {
    let amount = 0;
    for (let i = 0; i < dataTable.body.length; i++) {
      amount += dataTable.body[i].total_price;
    }
    return formatNumber(amount) + " Ar";
  };

  useEffect(() => {
    setData();
  }, []);

  return (
    <>
      <AnimatePresence>
        {openModal && (
          <Modal closer={handleOpen}>
            <Box className="box_works_container_modal">
              <Table {...dataTable} headerOn={{ title: "Works details" }} rowCount={dataTable.body.length} />
              <div className="div" style={{ display: "flex" }}>
                <div className="label"> Total </div> <div className="value">{amounTotal()}</div>
              </div>
            </Box>
          </Modal>
        )}
      </AnimatePresence>
      <PercentBox
        clientName={devis.buildingTypeDuration + " days - \n" + devis.numero_user}
        date={formatTimestamp(devis.creation_date)}
        title={devis.buildingTypeLabel + " " + devis.buildingFinitionLabel}
        max={+devis.total_price}
        opositte={
          <div style={{ display: "flex", flexWrap: "nowrap", alignItems: "center" }}>
            {" "}
            {formatNumber(+devis.total_price - +devis.restToPay)}
            <span style={{ fontSize: "0.8rem", fontWeight: "bolder", margin: "0 0.2rem" }}> / </span>
            {formatNumber(+devis.total_price) + " Ar"}
          </div>
        }
        subtitle="Payement done"
        value={+devis.total_price - +devis.restToPay}
        onClick={handleOpen}
      />
    </>
  );
};

const useGetData = () => {
  const [devis, setDevis] = useState([]);

  useEffect(() => {
    getDevis();
  }, []);

  const getDevis = async () => {
    let res = await alaivoGet("devis", null, false);
    console.log(res);
    setDevis(res.data);
  };

  return { devis };
};
export default Work;
