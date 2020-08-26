import React, { useState, useEffect } from "react";
import Box from "./Box";
import { Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Grid = (props) => {
  let numberOfRow = props.gridSize.numberOfRow;
  let numberOfCol = props.gridSize.numberOfCol;

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
  const [simRun, setSimRun] = useState(false);

  const [simGeneration, setSimGeneration] = useState(0);
  const [boxSize, setBoxSize] = useState({
    grid: {
      width: numberOfCol * (numberOfCol > 26 ? 2 : 3) + "vh",
      height: numberOfCol * (numberOfCol > 26 ? 2 : 3) + "vh",
    },
    box: {
      width: numberOfCol > 26 ? "2vh" : "3vh",
      height: numberOfCol > 26 ? "2vh" : "3vh",
    },
  });

  useEffect(() => {
    if (simRun) {
      let timeout = setTimeout(() => {
        startSimHandler();
      }, props.animSpeed);
      return () => clearTimeout(timeout);
    }
  });
  function calculateBoxSize() {
    setBoxSize({
      grid: {
        width: numberOfCol * (numberOfCol > 26 ? 2 : 3) + "vh",
        height: numberOfCol * (numberOfCol > 26 ? 2 : 3) + "vh",
      },
      box: {
        width: numberOfCol > 26 ? "2vh" : "3vh",
        height: numberOfCol > 26 ? "2vh" : "3vh",
      },
    });
  }
  const startSimHandler = () => {
    let copiedArr = JSON.parse(JSON.stringify(grid));

    if (simRun) {
      for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid.length; col++) {
          let neighbor = 0;
          if (
            simRun &&
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
              simRun={simRun}
              colorPicker={props.colorPicker}
              boxSize={boxSize}
            />
          ))
        )}
      </div>
      <div className="d-flex justify-content-start mt-4">
        <Row>
          <Col lg={2}>
            <Button
              className="spinnBtn"
              onClick={() => {
                setSimRun(true);

                startSimHandler();
              }}
              variant="success"
            >
              {simRun ? (
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
          <Col lg={2}>
            <Button
              onClick={() => (simRun ? setSimRun(false) : "")}
              variant="danger"
            >
              Stop
            </Button>
          </Col>
          <Col lg={2}>
            <Button
              onClick={() => {
                setSimGeneration(0);
                calculateBoxSize();
                setSimRun(false);
                presetGrid();
                //setGrid(resetGrid());
              }}
              variant="warning"
            >
              Reset/Create
            </Button>
          </Col>
          <Col className="contGen pl-5" lg={6}>
            Generation: {simGeneration}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Grid;
