import React from "react";
import ContentContainer from "../../components/ContentContainer/ContentContainer";
import SearchBar from "../../components/ContentContainer/Header/SearchBar/SearchBar";
import Form from "../../utilsComponents/Form/Form";
import "./About.sass";
import Row from "../../utilsComponents/Form/Row";
import Input from "../../utilsComponents/Input/Input";

const About = () => {
  return (
    <ContentContainer>
      <Form title="Payement details" subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit.">
        <div className="search_c" style={{ display: "flex", marginLeft: "auto" }}>
          <SearchBar />
        </div>
        <Row title={"Test"}>
          <Input name="name" title="Your name" type="text" defaultValue="Hello world" />
          <Input name="name" title="Your name" type="text" defaultValue="Hello world" />
        </Row>
        <Row>
          <Input name="name" title="Your name" type="text" defaultValue="Hello world" />
          <Input name="date" title="Your name" type="date" defaultValue="Hello world" />
          <Input name="date" title="Your name" type="date" defaultValue="Hello world" />
        </Row>
        <Row>
          <Input name="file" title="Your name" fullWidth type="datetime-local" isPicture />
        </Row>
      </Form>
    </ContentContainer>
  );
};

export default About;
