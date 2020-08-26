import React from "react";

const Box = (props) => {
  const boxClickHandler = (boxValue, boxIndexofRow, boxIndexofCol) => {
    let copyBox = [...props.grid];
    let itemChange = { ...props.grid[boxIndexofRow][boxIndexofCol] };

    if (boxValue === 1) {
      itemChange = 0;
      copyBox[boxIndexofRow][boxIndexofCol] = itemChange;
      props.setGrid(copyBox);
    } else {
      itemChange = 1;
      copyBox[boxIndexofRow][boxIndexofCol] = itemChange;
      props.setGrid(copyBox);
    }
  };

  return (
    <div
      className="box"
      onClick={() =>
        boxClickHandler(
          props.boxValue,
          props.boxIndexofRow,
          props.boxIndexofCol
        )
      }
      style={{
        width: props.boxSize.box.width,
        height: props.boxSize.box.height,
        backgroundColor: props.boxValue !== 1 ? "#fdfffc" : props.colorPicker,
        pointerEvents: props.simRun ? "none" : "auto",
      }}
    ></div>
  );
};

export default Box;
