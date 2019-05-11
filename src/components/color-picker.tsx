import React, { useState } from "react";
import { SketchPicker } from "react-color";
import "./color-picker.sass";

interface IColorPickerProps {
  onChange(color: string): void;
  defaultColor: string;
}

export default (props: IColorPickerProps) => {
  const [show, setShow] = useState(false);
  const [color, setColor] = useState(props.defaultColor);

  const handleClick = () => {
    setShow(!show);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleChange = (color: any) => {
    setColor(color.hex);
    props.onChange(color.hex);
  };

  return (
    <div>
      <div className="swatch" onClick={handleClick}>
        <div className="color" style={
          { background: color }
        } />
      </div>
      {show && (<div className="popover">
        <div className="cover" onClick={handleClose} />
        <SketchPicker color={color} onChange={handleChange} />
      </div>)}
    </div>
  )
}
