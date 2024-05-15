import React, { useRef, useState } from "react";
import { Document, Page, Text, View, PDFViewer, PDFDownloadLink, Font, Image } from "@react-pdf/renderer";
import { dataDefault } from "../../../utilsComponents/Table/Table";
import Loader from "../../../utilsComponents/Hider/Loader/Loader";
import Modal from "../../../utilsComponents/Modal/Modal";
import { AnimatePresence } from "framer-motion";
import Poppins from "../../../assets/fonts/Poppins-Light.ttf";
import SoraSM from "../../../assets/fonts/Sora-SemiBold.ttf";
import { styles } from "./style";
import logo from "../../../assets/img/logo.png";
import CustomChart from "../../../utilsComponents/Chart/CustomChart";
import { getImage } from "../../../utils/Image";
import { formatNumber } from "../../../utils/Format";

Font.register({ family: "Poppins", fonts: [{ src: Poppins }, { src: SoraSM, fontWeight: "bold" }] });

// Create styles

const PDFDevis = ({ data, pdfName = "devis.pdf", total_devis = 0, devis = null }) => {
  const [showPDF, setShowPDF] = useState(false);
  const handlePdfView = () => {
    setShowPDF(!showPDF);
  };

  const total = () => {
    return total_devis;
  };

  const total2 = () => {
    let count = 0;
    data.body.forEach((d) => {
      count += d.pu * d.quantite;
    });

    return count;
  };
  return (
    <>
      <PDFDownloadLink
        document={<MyDocument devis={devis} logo={logo} data={data} total={total()} total_before_finition={total2()} />}
        fileName={pdfName}
      >
        {({ blob, url, loading, error }) => (loading ? <Loader /> : <button> Export </button>)}
      </PDFDownloadLink>
      <button onClick={handlePdfView} style={{ marginLeft: "0.5rem" }}>
        See PDF
      </button>

      <AnimatePresence>
        {showPDF && (
          <Modal closer={handlePdfView}>
            <div className="container_pdf" style={{ height: "85vh", width: "35rem" }}>
              <PDFViewer style={{ width: "100%", height: "93%", backgroundColor: "transparent" }} showToolbar={false}>
                <MyDocument devis={devis} logo={logo} data={data} total={total()} total_before_finition={total2()} />
              </PDFViewer>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

// Create Document Component
const MyDocument = ({ logo, data, total = 0, devis, total_before_finition = 0 }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View
        style={{
          width: "100%",
          margin: "25px 0px 20px 0px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "8%" }}>{logo ? <Image src={logo} /> : null}</View>
        <Text> Constructor </Text>
      </View>

      <TablePdf {...data} />
      <View
        style={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "flex-end",
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
        }}
      >
        <View style={{ marginLeft: "30px", flexDirection: "row", fontSize: "12px" }}></View>
        <View style={{ display: "flex", flexDirection: "row", marginRight: "40px", alignItems: "center" }}>
          <Text style={{ fontSize: "12px", marginRight: "10px", marginTop: "0.2px" }}> Total sans finition : </Text>
          <Text> {formatNumber(total_before_finition)} Ar </Text>
        </View>
      </View>
      <View style={{ width: "100%", justifyContent: "space-between", alignItems: "flex-end", display: "flex", flexDirection: "row" }}>
        <View style={{ marginLeft: "30px", flexDirection: "row", fontSize: "12px" }}>
          <Text> Finition : </Text>
          <Text style={{ margin: "2px 5px 0 10px ", fontWeight: "bold" }}>{devis.buildingFinitionLabel}</Text>
          <Text> {devis.buildingFinitionPercent}%</Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", marginRight: "40px", alignItems: "center" }}>
          <Text style={{ fontSize: "12px", marginRight: "10px", marginTop: "0.2px" }}> Total : </Text>
          <Text> {formatNumber(total)} Ar </Text>
        </View>
      </View>
    </Page>
  </Document>
);

const TablePdf = ({ body = [], index = [], titles = [] }) => {
  const lengths = getColumnLength(index, titles, body);
  const rowValues = getValues(index, body);

  return (
    <View style={styles.section}>
      <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
        {titles.map((t, i) => (
          <Text
            key={i}
            style={{
              width: lengths[i],
              fontWeight: "bold",
              padding: "10px 12px 10px 4px",
            }}
          >
            {t}
          </Text>
        ))}
      </View>
      <View style={{ borderBottom: "0.9px solid #000", width: "100%" }} />
      {rowValues.map((row, i) => (
        <View
          key={i}
          style={{
            display: "flex",
            backgroundColor: i % 2 === 0 ? "#f0f7f8" : "",
            flexDirection: "row",
            width: "100%",
            borderBottom: "0.2px solid #f0f7f8",
          }}
        >
          {row.map((text, j) => {
            return (
              <Text
                key={j}
                style={{
                  width: lengths[j],
                  color: "#232222",
                  padding: "10px 12px 10px 4px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <View style={{ display: "flex", alignItems: "center", flexWrap: "nowrap" }}>
                  {j === 0 && <Text style={{ color: "transparent" }}> {getSpace(body[i].profondeur)} </Text>}
                  <Text> {text}</Text>
                </View>
              </Text>
            );
          })}
        </View>
      ))}
    </View>
  );
};

const getSpace = (length) => {
  let spaces = "";
  for (let i = 0; i < length; i++) {
    spaces += "___i";
  }
  return spaces;
};

const getColumnLength = (index = [], titles = [], body = [], fontSize = 10) => {
  const lengths = titles.map((t) => 0);

  for (let i = 0; i < titles.length; i++) {
    let length = titles[i].length * fontSize;
    checkIfHigher(lengths, i, length);
  }

  let rowValues = getValues(index, body);
  for (let i = 0; i < rowValues.length; i++) {
    for (let o = 0; o < rowValues[i].length; o++) {
      let text = rowValues[i][o];
      let length = (text + "").length * fontSize;
      checkIfHigher(lengths, o, length);
    }
  }

  return lengths;
};

const getValues = (index = [], body = []) => {
  let rows = [];
  for (let u = 0; u < body.length; u++) {
    let row = body[u];
    let values = [];
    for (let i = 0; i < index.length; i++) {
      let text = row[index[i]];
      if (Array.isArray(index[i])) {
        text = row;
        for (let o = 0; o < index[i].length; o++) {
          text = text[index[i][o]];
        }
      }
      values.push(text);
    }
    rows.push(values);
  }
  return rows;
};

const checkIfHigher = (tab = [], index, newValue) => {
  if (tab[index] < newValue) {
    tab[index] = newValue;
  }
};
export default PDFDevis;
