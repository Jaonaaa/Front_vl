import React from "react";
import ContentContainer from "../../../../components/ContentContainer/ContentContainer";
import useForm from "../../../../hooks/useForm";
import "./Unit.sass";
import Form from "../../../../utilsComponents/Form/Form";
import Row from "../../../../utilsComponents/Form/Row";
import Input from "../../../../utilsComponents/Input/Input";
import { alaivoPost } from "../../../../utils/Alaivo";
import { useMyNotifs } from "../../../../utilsComponents/Notif/useNotifs";

const Unit = () => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const onSubmit = async (e) => {
    e.preventDefault();
    let res = await alaivoPost("unit", JSON.stringify(formData), true);
    addNotifs(res.status, res.message);
  };
  return (
    <ContentContainer>
      {notifs.map((notif) => notif)}
      <div className="inner" style={{ marginTop: "3rem" }}>
        <Form onSubmit={onSubmit} title={"Unit gestion"}>
          <Row>
            <Input title="Label of the unit" name="label" onChange={handleInputForm} fullWidth placeholder="kg,cm,l...etc" />
          </Row>
        </Form>
      </div>
    </ContentContainer>
  );
};

export default Unit;
