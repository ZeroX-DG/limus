import React, { useState, useEffect } from "react";
import "./switch.sass";

interface ISwitchProps {
  value: string;
  values: string[];
  labels: string[];
  onChange(value: string): void;
}

export default (props: ISwitchProps) => {
  const [index, setIndex] = useState(0);
  const onChange = (index: number) => {
    setIndex(index);
    props.onChange(props.values[index]);
  }
  useEffect(() => {
    for (let i = 0; i < props.values.length; i++) {
      if (props.value === props.values[i]) {
        setIndex(i);
        break;
      }
    }
  });
  return (
    <div className="multi-switch">
      {
        props.labels.map((label, i: number) => (
          <div
            className={`switch ${index === i ? "active" : ""}`}
            onClick={() => onChange(i)}
          >
            {label}
          </div>
        ))
      }
    </div>
  )
}
