import React from "react";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import "./Request.sass";
import Form from "../../../utilsComponents/Form/Form";
import Row from "../../../utilsComponents/Form/Row";
import Input from "../../../utilsComponents/Input/Input";
import useForm from "../../../hooks/useForm";
import { getBase64 } from "../../../utils/Image";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";
import { alaivoPost } from "../../../utils/Alaivo";

const ImportPayement = () => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();

  const onSubmit = async (e) => {
    e.preventDefault();
    let base64 = await getBase64(formData.file[0]);
    let data = {
      file: base64,
    };
    let res = await alaivoPost("payement/file", JSON.stringify(data), null, false);
    addNotifs(res.status, res.message);
  };
  return (
    <ContentContainer>
      {notifs.map((notif) => notif)}

      <div className="inner">
        <Form title="Import payement details" onSubmit={onSubmit}>
          <Row className="centered">
            <Input type="file" name="file" title="Payement CSV" fullWidth onChange={handleInputForm} />
          </Row>
        </Form>
      </div>
    </ContentContainer>
  );
};

export default ImportPayement;
