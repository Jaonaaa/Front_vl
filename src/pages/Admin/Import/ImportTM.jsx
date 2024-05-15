import React from "react";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import "./Request.sass";
import useForm from "../../../hooks/useForm";
import Form from "../../../utilsComponents/Form/Form";
import Row from "../../../utilsComponents/Form/Row";
import Input from "../../../utilsComponents/Input/Input";
import { getBase64 } from "../../../utils/Image";
import { alaivoPost } from "../../../utils/Alaivo";
import { useMyNotifs } from "../../../utilsComponents/Notif/useNotifs";

const ImportTM = () => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const onSubmit = async (e) => {
    e.preventDefault();
    let building_work_base64 = await getBase64(formData.building_work[0]);
    let devis_base64 = await getBase64(formData.devis[0]);

    let data = {
      building_work: building_work_base64,
      devis: devis_base64,
    };
    let res = await alaivoPost("works/file", JSON.stringify(data), null, false);
    addNotifs(res.status, res.message);
  };
  return (
    <ContentContainer>
      {notifs.map((notif) => notif)}
      <div className="inner">
        <Form title="Import payement details" onSubmit={onSubmit}>
          <Row className="centered">
            <Input type="file" name="building_work" title="Building & Work CSV" fullWidth onChange={handleInputForm} />
          </Row>
          <Row className="centered">
            <Input type="file" name="devis" title="Devis" fullWidth onChange={handleInputForm} />
          </Row>
        </Form>
      </div>
    </ContentContainer>
  );
};

export default ImportTM;
