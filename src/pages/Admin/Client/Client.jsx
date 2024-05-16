import React, { useEffect, useState } from "react";
import ContentContainer from "../../../components/ContentContainer/ContentContainer";
import Table from "../../../utilsComponents/Table/Table";
import { alaivoGet } from "../../../utils/Alaivo";

export const dataDefault = {
  titles: ["Numero", "Role", "Qt devis"],
  classes: ["", ""],
  index: ["numero", "roles", "devis_count"],
  body: [],
};

const Client = () => {
  const [dataBody, setDataBody] = useState(dataDefault);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    let res = await alaivoGet("client", null, false);
    let data = res.data.map((row) => ({
      ...row,
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
        {/* Liste des clients & leurs travaux - quantité & etat & date */}
        <Table {...dataBody} headerOn={{ title: "List of the customers" }} rowCount={10} loadingContent={loading} />
      </div>
    </ContentContainer>
  );
};

export default Client;
