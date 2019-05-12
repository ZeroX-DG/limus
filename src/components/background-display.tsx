import React from "react";
import "./background-display.sass";

interface IBackgroundDisplayProps {
  backgroundType: string;
  src: string;
}

export default (props: IBackgroundDisplayProps) => {
  const { backgroundType, src } = props;

  const isImage = backgroundType === "image";
  const isTransparentBackground = backgroundType === "none";
  let style = {
    [isImage
      ? "backgroundImage"
      : "backgroundColor"]: isImage ? `url(${src})` : src
  };

  if (isTransparentBackground) {
    style = {};
  }

  return (
    <div
      className={`background-display ${isTransparentBackground ? 'transparent' : ''}`}
      style={style}
    />
  )
}
