import React from "react";
import ContentContainer from "../../../../components/ContentContainer/ContentContainer";
import useForm from "../../../../hooks/useForm";
import "./Finition.sass";
import Form from "../../../../utilsComponents/Form/Form";
import Row from "../../../../utilsComponents/Form/Row";
import Input from "../../../../utilsComponents/Input/Input";
import { alaivoPost } from "../../../../utils/Alaivo";
import { useMyNotifs } from "../../../../utilsComponents/Notif/useNotifs";

const Finition = () => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const onSubmit = async (e) => {
    e.preventDefault();
    let res = await alaivoPost("buildingFinition", JSON.stringify(formData), false);
    addNotifs(res.status, res.message);
  };
  return (
    <ContentContainer>
      {notifs.map((notif) => notif)}
      <div className="inner" style={{ marginTop: "3rem" }}>
        <Form onSubmit={onSubmit} title={"Finition gestion"}>
          <Row>
            <Input title="Type Finition" name="label" onChange={handleInputForm} fullWidth placeholder="...." />
          </Row>
          <Row>
            <Input title="Percent taken" type="number" name="percent" onChange={handleInputForm} fullWidth placeholder="...." />
          </Row>
        </Form>
      </div>
    </ContentContainer>
  );
};

export default Finition;
