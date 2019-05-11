import React, { useEffect } from "react";
import "./background-display.sass";

interface IBackgroundDisplayProps {
  isImage: boolean;
  src: string;
}

export default (props: IBackgroundDisplayProps) => {
  const { isImage, src } = props;

  return (
    <div
      className="background-display"
      style={{
        [isImage
          ? "backgroundImage"
          : "backgroundColor"]: isImage ? `url(${src})` : src
      }}
    />
  )
}
