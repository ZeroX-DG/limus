import React, { useState, useEffect } from "react";
import "./twoway-switch.sass";

interface ITwowaySwitchProps {
  value: string;
  values: string[];
  labels: string[];
  onChange(value: string): void;
}

export default (props: ITwowaySwitchProps) => {
  const [index, setIndex] = useState(0);
  const onChange = (index: number) => {
    setIndex(index);
    props.onChange(props.values[index]);
  }
  useEffect(() => {
    setIndex(props.value === props.values[0] ? 0 : 1)
  });
  return (
    <div className="twoway-switch">
      <div
        className={`switch ${index === 0 ? "active" : ""}`}
        onClick={() => onChange(0)}
      >
        {props.labels[0]}
      </div>
      <div
        className={`switch ${index === 1 ? "active" : ""}`}
        onClick={() => onChange(1)}
      >
        {props.labels[1]}
      </div>
    </div>
  )
}
