import React, { useState } from "react";
import ContentContainer from "../../../../components/ContentContainer/ContentContainer";
import useForm from "../../../../hooks/useForm";
import { HiOutlinePlus } from "react-icons/hi2";

import "./BuildingType.sass";
import Form from "../../../../utilsComponents/Form/Form";
import Row from "../../../../utilsComponents/Form/Row";
import Input from "../../../../utilsComponents/Input/Input";
import { alaivoPost } from "../../../../utils/Alaivo";
import { useMyNotifs } from "../../../../utilsComponents/Notif/useNotifs";
import { IoMdClose } from "react-icons/io";
import { getUid } from "../../../../utils/Uid";

const BuildingType = () => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const [rowsDescription, setRowsDescription] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    let descriptions = [];

    let refs = document.querySelectorAll(".input_type_row");
    refs.forEach((ref) => {
      let value = ref.querySelector("textarea");
      if (value) value = value.value;
      descriptions.push(value);
    });
    formData.descriptions = descriptions;
    let res = await alaivoPost("buildingType", JSON.stringify(formData), false);
    addNotifs(res.status, res.message);
  };

  const moreRow = (e, index) => {
    e.preventDefault();
    const up = [...rowsDescription, index];
    setRowsDescription(up);
  };
  const removeRow = (e, index) => {
    e.preventDefault();
    const down = rowsDescription.filter((row) => row !== index);
    setRowsDescription(down);
  };

  return (
    <ContentContainer>
      {notifs.map((notif) => notif)}
      <div className="inner" style={{ marginTop: "3rem" }}>
        <Form onSubmit={onSubmit} title={"BuildingType gestion"}>
          <Row>
            <Input title="Type of the building" name="label" onChange={handleInputForm} fullWidth placeholder="...." />
          </Row>
          <Row>
            <Input
              title="Duration"
              name="duration"
              type="number"
              onChange={handleInputForm}
              constraint={(v) => {
                return Math.floor(+v);
              }}
              fullWidth
              defaultValue="1"
            />
          </Row>
          <Row>
            <Input title="Surface" name="surface" onChange={handleInputForm} type="number" fullWidth defaultValue={1} />
          </Row>
          {rowsDescription.map((row, i) => (
            <Row key={row}>
              <div className="input_type_row" style={{ width: "100%" }}>
                <div
                  className="closer"
                  onClick={(e) => {
                    removeRow(e, row);
                  }}
                >
                  <IoMdClose />
                </div>
                <Input name="nothing" type="textarea" fullWidth title={"Description " + (i + 1)} />
              </div>
            </Row>
          ))}
          <Row>
            <div className="btn" style={{ display: "flex", marginLeft: "auto" }}>
              <button
                onClick={(e) => {
                  moreRow(e, getUid());
                }}
                style={{ display: "flex", alignItems: "center" }}
              >
                More <HiOutlinePlus style={{ marginLeft: "0.3rem", color: "#fff" }} />
              </button>
            </div>
          </Row>
        </Form>
      </div>
    </ContentContainer>
  );
};

export default BuildingType;
