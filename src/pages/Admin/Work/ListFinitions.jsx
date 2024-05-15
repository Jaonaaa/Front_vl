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
  titles: ["Type", "Percent value", ""],
  classes: ["", ""],
  index: ["label", "percent", "modify"],
  body: [],
};

const ListFinition = () => {
  const [dataBody, setDataBody] = useState(dataDefault);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    let res = await alaivoGet("buildingFinition", null, false);

    let data = res.data.map((row) => ({
      ...row,
      percent: row.percent + " %",
      modify: <ModifyForm data={row} />,
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
        <Table {...dataBody} headerOn={{ title: "List of the finitions" }} rowCount={10} loadingContent={loading} />
      </div>
    </ContentContainer>
  );
};

const ModifyForm = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { formData, handleInputForm } = useForm();
  const { notifs, addNotifs } = useMyNotifs();

  const updateWorks = async (e) => {
    e.preventDefault();
    let data_ = {
      ...formData,
      id: data.id,
    };
    let res = await alaivoPut("buildingFinition", JSON.stringify(data_), null, false);
    addNotifs(res.status, res.message);
  };
  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      {notifs.map((notif) => notif)}
      <AnimatePresence>
        {open && (
          <Modal closer={handleOpen}>
            <Box>
              <Form title="Modification Work" onSubmit={updateWorks}>
                <Row>
                  <Input name="label" onChange={handleInputForm} title="Label" fullWidth defaultValue={data.label} />
                </Row>
                <Row>
                  <Input
                    name="percent"
                    onChange={handleInputForm}
                    type="number"
                    constraint={(v) => {
                      return !isNaN(+v) ? true : false;
                    }}
                    title="Percent value"
                    defaultValue={+data.percent}
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

export default ListFinition;
