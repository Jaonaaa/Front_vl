import React, { useEffect, useState } from "react";
import ContentContainer from "../../../../components/ContentContainer/ContentContainer";
import "./AddRequest.sass";
import Form from "../../../../utilsComponents/Form/Form";
import useForm from "../../../../hooks/useForm";
import Row from "../../../../utilsComponents/Form/Row";
import Input from "../../../../utilsComponents/Input/Input";
import { getUserPresp } from "../../../../hooks/useIdentity";
import { alaivoGet, alaivoPost } from "../../../../utils/Alaivo";
import { useMyNotifs } from "../../../../utilsComponents/Notif/useNotifs";
import { formatNumber, formatTimestamp } from "../../../../utils/Format";

const DoPayemnt = () => {
  const { formData, handleInputForm } = useForm();
  const { addNotifs, notifs } = useMyNotifs();
  const { devis } = useGetData();
  const [devisSelected, setDevisSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (devisSelected == null) {
      addNotifs("error", "Please select a devis");
      return;
    }
    let data = {
      id_user: getUserPresp().id,
      ...formData,
      payement_time: formData.payement_time + ":00.0+03:00",
      devis: devisSelected,
      id_devis: devisSelected.id,
    };
    let res = await alaivoPost("payement", JSON.stringify(data), null, false);
    addNotifs(res.status, res.message);
  };
  return (
    <ContentContainer>
      {notifs.map((notif) => notif)}
      <div className="inner">
        <Form title="Make a payement" onSubmit={handleSubmit}>
          <Row>
            <Input title="Date of payement" type="datetime-local" name="payement_time" onChange={handleInputForm} />
            <Input title="Amount" type="number" name="amount" onChange={handleInputForm} />
          </Row>
          <Row title={"My devis"} className="row_devis">
            {devis.map((d, i) => (
              <div
                className="devis-container"
                onClick={() => {
                  setDevisSelected(d);
                }}
                key={i}
              >
                {devisSelected ? devisSelected.id === d.id ? <div className="lighter"></div> : "" : ""}
                <div className="title">{d.buildingTypeLabel + " - " + d.buildingFinitionLabel}</div>
                <div className="row">
                  <div className="price"> {formatNumber(d.total_price)} Ar</div>
                  <div className="price_rest">
                    <div className="label"> Rest to pay </div>
                    <div className="value">{formatNumber(+d.restToPay)} Ar</div>
                  </div>
                  <div className="date_creation">{formatTimestamp(d.creation_date)}</div>
                </div>
              </div>
            ))}
          </Row>
        </Form>
      </div>
    </ContentContainer>
  );
};

const useGetData = () => {
  const [devis, setDevis] = useState([]);

  useEffect(() => {
    getDevis();
  }, []);

  const getDevis = async () => {
    const user = getUserPresp();
    let res = await alaivoGet("devis/client/" + user.id, null, false);
    console.log(res);
    // let data = res.data.map((data) => ({
    //   ...data,
    // }));
    setDevis(res.data);
  };
  return { devis };
};
export default DoPayemnt;
