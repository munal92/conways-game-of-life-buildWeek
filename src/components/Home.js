import React from "react";
import Grid from "./Grid";

const Home = (props) => {
  return (
    <div>
      <Grid
        gridSize={props.gridSize}
        colorPicker={props.colorPicker}
        animSpeed={props.animSpeed}
      />
    </div>
  );
};

export default Home;
