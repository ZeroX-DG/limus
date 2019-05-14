import React from "react";
import "./image-display.sass";
import { IPropertyList } from "./property-controller";

interface IImageDisplayProps {
  image: string;
  properties: IPropertyList;
}

export default (props: IImageDisplayProps) => {
  const { image, properties } = props;

  const wrapperStyle = {
    perspective: `${properties.perspective}px`
  };

  const imageStyle = {
    transform: `
        rotateX(${properties.rotationX}deg)
        rotateY(${properties.rotationY}deg)
        rotateZ(${properties.rotationZ}deg)
        scale(${properties.scale}, ${properties.scale})`,
    top: `${properties.positionTop}px`,
    left: `${properties.positionLeft}px`,
    borderRadius: `${properties.corner}px`
  };

  if (properties.dropShadow) {
    imageStyle["boxShadow"] = `0 ${properties.shadowY}px ${
      properties.shadowBlur
    }px rgba(0, 0, 0, 0.25)`;
  }

  return (
    <div className="image-display-wrapper" style={wrapperStyle}>
      <img className="image-display" src={image} style={imageStyle} />
    </div>
  );
};
