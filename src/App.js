import React, { useState } from "react";

import Home from "./components/Home";
import NaviBar from "./components/NaviBar";
import { Container, Row, Col } from "react-bootstrap";
function App() {
  const [colorPicker, setColorPicker] = useState("#e71d36");
  const [animSpeed, setAnimSpeed] = useState(1000);
  const [gridSize, setGridSize] = useState({
    numberOfRow: 25,
    numberOfCol: 25,
  });
  console.log(gridSize);
  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={3} className="menucont ">
            <NaviBar
              setColorPicker={setColorPicker}
              setAnimSpeed={setAnimSpeed}
              setGridSize={setGridSize}
            />
          </Col>
          <Col lg={9} className="colcont mt-5">
            <Home
              gridSize={gridSize}
              colorPicker={colorPicker}
              animSpeed={animSpeed}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
