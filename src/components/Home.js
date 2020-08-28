import React from "react";
import Grid from "./Grid";

const Home = (props) => {
  return (
    <div>
      <Grid
        gridSize={props.gridSize}
        colorPicker={props.colorPicker}
        animSpeed={props.animSpeed}
        preset={props.preset}
        simRun={props.simRun}
        setSimRun={props.setSimRun}
        boxDimension={props.boxDimension}
      />
    </div>
  );
};

export default Home;
