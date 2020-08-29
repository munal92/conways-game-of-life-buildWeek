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
  const [preset, setPreset] = useState("Presets");
  const [simRun, setSimRun] = useState(false);
  const [boxDimension, setBoxDimension] = useState({
    width: window.screen.width < 670 ? 1.6 : 3,
  });

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg={3} className="menucont ">
            <NaviBar
              setColorPicker={setColorPicker}
              setAnimSpeed={setAnimSpeed}
              setGridSize={setGridSize}
              setPreset={setPreset}
              preset={preset}
              simRun={simRun}
              setSimRun={setSimRun}
            />
          </Col>
          <Col lg={9} className="colcont mt-5">
            <Home
              gridSize={gridSize}
              colorPicker={colorPicker}
              animSpeed={animSpeed}
              preset={preset}
              simRun={simRun}
              setSimRun={setSimRun}
              boxDimension={boxDimension}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
