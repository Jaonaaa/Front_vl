import React, { useEffect, useState } from "react";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import { alaivoGet, alaivoPut } from "../../../utils/Alaivo";
import Table from "../../../utilsComponents/Table/Table";
import { formatNumber } from "../../../utils/Format";
import { AnimatePresence } from "framer-motion";
import Modal from "../../../utilsComponents/Modal/Modal";
import Box from "../../../utilsComponents/Box/Box";
import Form from "../../../utilsComponents/Form/Form";
import useForm from "../../../hooks/useForm";
import Row from "../../../utilsComponents/Form/Row";
import Input from "../../../utilsComponents/Input/Input";
import { MdEdit } from "react-icons/md";
import Select from "../../../utilsComponents/Select/Select";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";

export const dataDefault = {
  titles: ["Code", "Type travaux", "Building", "Unite", "Prix unitaire", "Quantite", ""],
  classes: ["", ""],
  index: ["codeTravaux", "type_travaux", "building_label", "unite", "pu", "quantite", "modify"],
  body: [],
};

const Travaux = () => {
  const [dataBody, setDataBody] = useState(dataDefault);
  const [loading, setLoading] = useState(true);
  const [units, setUnits] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    let res = await alaivoGet("worksPredefinedBy", null, false);
    let units_ = await alaivoGet("unit", null, false);
    setUnits(units_.data);

    let data = res.data.map((row) => ({
      ...row,
      type_travaux: row.label,
      building_label: row.buildingType.label,
      unite: row.worksInDevisDetails.unit.label,
      pu: formatNumber(row.worksInDevisDetails.pu) + " Ar",
      quantite: row.worksInDevisDetails.quantity,
      modify: <ModifyForm data={row} units={units_.data} />,
    }));

    setLoading(false);
    setDataBody({ ...dataDefault, body: data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ContentContainer>
      <div className="inner">
        <Table {...dataBody} headerOn={{ title: "List of the Works" }} rowCount={10} loadingContent={loading} />
      </div>
    </ContentContainer>
  );
};

const ModifyForm = ({ data, units }) => {
  const [open, setOpen] = useState(false);
  const { formData, handleInputForm } = useForm();
  const [unitsData, setUnitsData] = useState([]);
  const { notifs, addNotifs } = useMyNotifs();

  const updateWorks = async (e) => {
    e.preventDefault();
    let data_ = {
      ...formData,
      id: data.id,
    };
    let res = await alaivoPut("worksPredefinedBy", JSON.stringify(data_), null, false);
    addNotifs(res.status, res.message);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  const formatUnit = () => {
    let data = [];
    for (let i = 0; i < units.length; i++) {
      data.push({ label: units[i].label, value: units[i] });
    }
    setUnitsData(data);
  };

  useEffect(() => {
    formatUnit();
  }, [units]);

  return (
    <>
      {notifs.map((notif) => notif)}
      <AnimatePresence>
        {open && (
          <Modal closer={handleOpen}>
            <Box>
              <Form title="Modification Work" onSubmit={updateWorks}>
                <Row>
                  <Input name="label" onChange={handleInputForm} title="Type travaux" fullWidth defaultValue={data.label} />
                </Row>
                <Row>
                  <Input
                    name="quantity"
                    onChange={handleInputForm}
                    type="number"
                    title="Quantity"
                    defaultValue={data.worksInDevisDetails.quantity}
                  />
                  <Input
                    name="pu"
                    onChange={handleInputForm}
                    type="number"
                    title="Price unit"
                    defaultValue={data.worksInDevisDetails.pu}
                  />
                </Row>
                <Row>
                  <Select
                    title={"Unit"}
                    name={"unit"}
                    fullWidth
                    onChange={handleInputForm}
                    defaultValue={data.worksInDevisDetails.unit}
                    optionsType={unitsData}
                  />
                </Row>
              </Form>
            </Box>
          </Modal>
        )}
      </AnimatePresence>

      <button
        onClick={handleOpen}
        style={{ fontSize: "1rem", padding: "0.6rem 0.6rem", display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <MdEdit />
      </button>
    </>
  );
};

export default Travaux;
