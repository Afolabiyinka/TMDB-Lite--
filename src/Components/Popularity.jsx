import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PopularityProgress = ({ popularity }) => {
  return (
    <div style={{ width: 80, height: 80 }}>
      <CircularProgressbar
        value={popularity}
        text={`${popularity}%`}
        styles={buildStyles({
          textSize: "16px",
          pathColor: `rgba(62, 152, 199, ${popularity / 100})`,
          textColor: "#fff",
          trailColor: "#d6d6d6",
        })}
      />
    </div>
  );
};

export default PopularityProgress;
