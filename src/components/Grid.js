import React, { useState, useEffect } from "react";
import Box from "./Box";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Grid = (props) => {
  let numberOfRow = props.gridSize.numberOfRow;
  let numberOfCol = props.gridSize.numberOfCol;

  //   /* Extra small devices (phones, 600px and down) */
  // @media only screen and (max-width: 600px) {...}

  // /* Small devices (portrait tablets and large phones, 600px and up) */
  // @media only screen and (min-width: 600px) {...}

  const resetGrid = () => {
    return Array(numberOfRow)
      .fill(0)
      .map((row) => new Array(numberOfCol).fill(0));
  };

  const presetGrid = () => {
    if (props.preset !== "Presets" && props.preset !== "Custom") {
      let midPoint = Math.floor(numberOfRow / 2);
      let presetGrid = resetGrid();
      if (props.preset === "Glider") {
        let arrayGlider = [
          [midPoint, midPoint],
          [midPoint + 1, midPoint],
          [midPoint, midPoint + 1],
          [midPoint - 1, midPoint + 1],
          [midPoint - 1, midPoint - 1],
        ];

        arrayGlider.forEach(([row, col]) => {
          presetGrid[row][col] = 1;
        });

        setGrid(presetGrid);
      } else if (props.preset === "Plus") {
        let arrayPlus = [
          [midPoint, midPoint],
          [midPoint + 1, midPoint],
          [midPoint - 1, midPoint],
          [midPoint, midPoint + 1],
          [midPoint, midPoint - 1],
        ];

        arrayPlus.forEach(([row, col]) => {
          presetGrid[row][col] = 1;
        });

        setGrid(presetGrid);
      }
    } else {
      setGrid(resetGrid());
    }
  };
  const [grid, setGrid] = useState(resetGrid());

  const [simGeneration, setSimGeneration] = useState(0);
  const [boxSize, setBoxSize] = useState({
    grid: {
      width:
        numberOfCol *
          (numberOfCol > 26
            ? props.boxDimension.width - 0.9
            : props.boxDimension.width) +
        "vh",
      height:
        numberOfCol *
          (numberOfCol > 26
            ? props.boxDimension.width - 0.9
            : props.boxDimension.width) +
        "vh",
    },
    box: {
      width:
        numberOfCol > 26
          ? props.boxDimension.width - 0.9 + "vh"
          : props.boxDimension.width + "vh",
      height:
        numberOfCol > 26
          ? props.boxDimension.width - 0.9 + "vh"
          : props.boxDimension.width + "vh",
    },
  });

  useEffect(() => {
    if (props.simRun) {
      let timeout = setTimeout(() => {
        startSimHandler();
      }, props.animSpeed);
      return () => clearTimeout(timeout);
    }
  });
  function calculateBoxSize() {
    setBoxSize({
      grid: {
        width:
          numberOfCol *
            (numberOfCol > 26
              ? props.boxDimension.width - 0.9
              : props.boxDimension.width) +
          "vh",
        height:
          numberOfCol *
            (numberOfCol > 26
              ? props.boxDimension.width - 0.9
              : props.boxDimension.width) +
          "vh",
      },
      box: {
        width:
          numberOfCol > 26
            ? props.boxDimension.width - 0.9 + "vh"
            : props.boxDimension.width + "vh",
        height:
          numberOfCol > 26
            ? props.boxDimension.width - 0.9 + "vh"
            : props.boxDimension.width + "vh",
      },
    });
  }

  console.log(boxSize);
  const startSimHandler = () => {
    let copiedArr = JSON.parse(JSON.stringify(grid));

    if (props.simRun) {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
          let neighbor = 0;
          if (
            props.simRun &&
            row - 1 >= 0 &&
            row + 1 < numberOfRow &&
            col - 1 >= 0 &&
            col + 1 < numberOfCol
          ) {
            if (grid[row - 1][col - 1]) {
              neighbor += 1;
            }
            if (grid[row][col - 1]) {
              neighbor += 1;
            }
            if (grid[row + 1][col - 1]) {
              neighbor += 1;
            }
            if (grid[row - 1][col]) {
              neighbor += 1;
            }
            if (grid[row + 1][col]) {
              neighbor += 1;
            }
            if (grid[row - 1][col + 1]) {
              neighbor += 1;
            }
            if (grid[row][col + 1]) {
              neighbor += 1;
            }
            if (grid[row + 1][col + 1]) {
              neighbor += 1;
            }
            if (neighbor < 2 || neighbor > 3) {
              copiedArr[row][col] = 0;
            } else if (grid[row][col] === 0 && neighbor === 3) {
              copiedArr[row][col] = 1;
            } else if (grid[row][col] === 1 && neighbor > 1 && neighbor < 4) {
              copiedArr[row][col] = 1;
            }
          } else {
            copiedArr[row][col] = 0;
          }
        }
      }
      setSimGeneration(simGeneration + 1);
      setGrid(copiedArr);
    }
  };

  // row-1 col-1  |  row-1 col       |   row-1 col+1
  // row   col-1  |  row col (target) |   row   col+1
  // row+1 col-1  |  row+1 col        |   row+1 col+1

  return (
    <>
      {props.boxDimension.width < 2 ? (
        <Col className="contGen mb-3" lg={6} xs={12}>
          Generation: {simGeneration}
        </Col>
      ) : undefined}
      <div
        style={{ width: boxSize.grid.width, height: boxSize.grid.height }}
        className="gridContainer"
      >
        {grid.map((rows, indexOfRow) =>
          rows.map((col, indexOfCol) => (
            <Box
              key={`${indexOfRow}/${indexOfCol}`}
              grid={grid}
              setGrid={setGrid}
              boxValue={grid[indexOfRow][indexOfCol]}
              boxIndexofRow={indexOfRow}
              boxIndexofCol={indexOfCol}
              simRun={props.simRun}
              colorPicker={props.colorPicker}
              boxSize={boxSize}
            />
          ))
        )}
      </div>
      <div className="d-flex justify-content-start">
        <Row>
          <Col lg={2} xs={3}>
            <Button
              className="spinnBtn mt-3"
              onClick={() => {
                props.setSimRun(true);

                startSimHandler();
              }}
              variant="success"
            >
              {props.simRun ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : (
                "Start"
              )}
            </Button>
          </Col>
          <Col lg={2} xs={3}>
            <Button
              className="mt-3"
              onClick={() => (props.simRun ? props.setSimRun(false) : "")}
              variant="danger"
            >
              Stop
            </Button>
          </Col>
          <Col lg={2} xs={12}>
            <Button
              className="mt-3 mb-5"
              onClick={() => {
                setSimGeneration(0);
                calculateBoxSize();
                props.setSimRun(false);
                presetGrid();
                //setGrid(resetGrid());
              }}
              variant="warning"
            >
              Reset/Create
            </Button>
          </Col>
          {props.boxDimension.width > 1.9 ? (
            <Col className="contGen pl-5 mt-md-3" lg={6} xs={5}>
              Generation: {simGeneration}
            </Col>
          ) : undefined}
        </Row>
      </div>
    </>
  );
};

export default Grid;
