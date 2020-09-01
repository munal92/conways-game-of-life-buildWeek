import React, { useState } from "react";
import ModalInfo from "./ModalInfo";
import { Container, Col } from "react-bootstrap";
import Logo from "../img/logo192.png";
import { CirclePicker } from "react-color";
import { Button } from "react-bootstrap";
import Slider from "react-input-slider";

import Dropdown from "react-bootstrap/Dropdown";

const NaviBar = (props) => {
  const handleColorChange = ({ hex }) => props.setColorPicker(hex);
  const [colorPop, setColorPop] = useState(false);
  const [sliderBar, setSliderBar] = useState({ x: 1000 });
  const [sliderBarForGrid, setsliderBarForGrid] = useState({ y: 25 });

  function handleDropdownMenu(e) {
    let selectedOption = e.split("/");
    props.setPreset(selectedOption[1]);
  }

  return (
    <Container>
      <Col className="navColCont">
        <div className="menuTitle mt-5 mb-1">
          <img
            alt=""
            src={Logo}
            className="logoImg d-inline-block align-top mt-3"
          />{" "}
          Conway's Game Of Life
        </div>
        <div></div>
        <div>
          <div className="slider " style={{ color: "white" }}>
            {"Sim. Speed: " + sliderBar.x + " ms"}
          </div>
          <Slider
            axis="x"
            xstep={10}
            xmin={100}
            xmax={1000}
            x={sliderBar.x}
            onChange={({ x }) => {
              setSliderBar({ x: parseFloat(x.toFixed(2)) });
              props.setAnimSpeed(parseFloat(x.toFixed(2)));
            }}
          />
          <div className="slider" style={{ color: "white" }}>
            {"Grid Size: " + sliderBarForGrid.y + " X " + sliderBarForGrid.y}
          </div>
          {props.simRun ? (
            <Slider
              disabled
              axis="x"
              xstep={1}
              xmin={5}
              xmax={40}
              x={sliderBarForGrid.y}
              onChange={({ x }) => {
                setsliderBarForGrid({ y: parseFloat(x.toFixed(2)) });
                props.setGridSize({
                  numberOfRow: parseFloat(x.toFixed(2)),
                  numberOfCol: parseFloat(x.toFixed(2)),
                });
              }}
            />
          ) : (
            <Slider
              axis="x"
              xstep={1}
              xmin={5}
              xmax={40}
              x={sliderBarForGrid.y}
              onChange={({ x }) => {
                setsliderBarForGrid({ y: parseFloat(x.toFixed(2)) });
                props.setGridSize({
                  numberOfRow: parseFloat(x.toFixed(2)),
                  numberOfCol: parseFloat(x.toFixed(2)),
                });
              }}
            />
          )}
        </div>

        <div>
          <Button
            onClick={() => (colorPop ? setColorPop(false) : setColorPop(true))}
            variant={colorPop ? "Dark" : "success"}
          >
            {colorPop ? (
              <CirclePicker onChangeComplete={handleColorChange} />
            ) : (
              "Pick a color"
            )}
          </Button>
        </div>
        <div>
          <Dropdown onSelect={handleDropdownMenu}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic">
              {props.preset}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/Custom">Custom</Dropdown.Item>
              <Dropdown.Item href="#/Glider">Glider</Dropdown.Item>
              <Dropdown.Item href="#/Plus">Plus</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div>
          <ModalInfo />
        </div>
      </Col>
    </Container>
  );
};

export default NaviBar;
