import React, { useState, useEffect } from "react";
import ColorPicker from "./color-picker";
import Switch from "./switch";
import exportImage from "../lib/export";
import "./property-controller.sass";

export interface IPropertyList {
  rotationY: number;
  rotationX: number;
  rotationZ: number;
  perspective: number;
  positionLeft: number;
  positionTop: number;
  dropShadow: boolean;
  shadowY: number;
  shadowBlur: number;
  corner: number;
  backgroundType: string;
  backgroundSource: string;
}

interface IPropertyControllerProps {
  onPropertyChange(properties: IPropertyList): void;
}

export default (props: IPropertyControllerProps) => {
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(0);
  const [rotationZ, setRotationZ] = useState(0);
  const [perspective, setPerspective] = useState(1000);
  const [positionLeft, setPositionLeft] = useState(20);
  const [positionTop, setPositionTop] = useState(20);
  const [dropShadow, setDropShadow] = useState(true);
  const [shadowY, setShadowY] = useState(10);
  const [shadowBlur, setShadowBlur] = useState(20);
  const [corner, setCorner] = useState(0);
  const [backgroundType, setBackgroundType] = useState("color");
  const [backgroundSource, setBackgroundSource] = useState("#6c5ce7");
  const [controllerOpacity, setControllerOpacity] = useState(100);
  const [isFreeHandRotate, setIsFreeHandRotate] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);

  const getAllProperties = () => {
    return {
      rotationY,
      rotationX,
      rotationZ,
      perspective,
      positionLeft,
      positionTop,
      dropShadow,
      shadowY,
      shadowBlur,
      corner,
      backgroundType,
      backgroundSource
    };
  };

  const handleSliderChange = (property: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);
    switch (property) {
      case "rotationY":
        setRotationY(value);
        break;
      case "rotationX":
        setRotationX(value);
        break;
      case "rotationZ":
        setRotationZ(value);
        break;
      case "perspective":
        setPerspective(value);
        break;
      case "positionLeft":
        setPositionLeft(value);
        break;
      case "positionTop":
        setPositionTop(value);
        break;
      case "shadowY":
        setShadowY(value);
        break;
      case "shadowBlur":
        setShadowBlur(value);
        break;
      case "corner":
        setCorner(value);
        break;
    }
    props.onPropertyChange(getAllProperties());
  };

  const handleCheckboxChange = (property: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.checked;
    switch (property) {
      case "dropShadow":
        setDropShadow(value);
        break;
    }
    props.onPropertyChange(getAllProperties());
  };

  const handleBackgroundColorChange = (color: string) => {
    setBackgroundSource(color);
    props.onPropertyChange(getAllProperties());
  };

  const handleControllerOpacityChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setControllerOpacity(parseInt(e.target.value));
  };

  const handleBackgroundTypeChange = (backgroundType: string) => {
    setBackgroundType(backgroundType);
    backgroundType.charAt(0);
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    props.onPropertyChange(getAllProperties());
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  });

  const handleKeyUp = () => {
    setIsFreeHandRotate(false);
  };

  const handleKeyDown = (e: any) => {
    if (e.which === 16) {
      // Shift key
      setIsFreeHandRotate(true);
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isFreeHandRotate) return;
    if (!isMouseDown) return;

    const newRotateX = Math.floor(
      constraint(map(e.pageY, 0, window.innerHeight, 90, -90), -90, 90)
    );

    const newRotateY = Math.floor(
      constraint(map(e.pageX, 0, window.innerWidth, -90, 90), -90, 90)
    );

    setRotationX(newRotateX);
    setRotationY(newRotateY);

    props.onPropertyChange(getAllProperties());
  };

  const handleMouseDown = () => {
    if (!isFreeHandRotate) return;
    if (isMouseDown) return;

    setIsMouseDown(true);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  // stolen from P5.js :)
  const map = (
    n: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ) => {
    return ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
  };

  const constraint = (n: number, low: number, high: number) => {
    return Math.max(Math.min(n, high), low);
  };

  const handlePickBackground = () => {
    document.getElementById("background-input").click();
  };

  const handleBackgroundImageInput = (e: any) => {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      setBackgroundSource(event.target.result);
      props.onPropertyChange(getAllProperties());
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div
      className={`property-controller ${isFreeHandRotate ? "hide" : ""}`}
      style={{ opacity: controllerOpacity / 100 }}
    >
      <div className="controller-opacity">
        <span>Controller opacity: </span>
        <input
          type="range"
          value={controllerOpacity}
          onChange={handleControllerOpacityChange}
          min="20"
          max="100"
        />
        <span className="camera" onClick={exportImage}>
          <i className="fa fa-camera" />
        </span>
      </div>
      <div className="main-controls">
        <table>
          <tbody>
            <tr className="control">
              <td>Image rotation y-axis:</td>
              <td>
                <input
                  type="range"
                  value={rotationY}
                  onChange={handleSliderChange("rotationY")}
                  min="-90"
                  max="90"
                />
              </td>
              <td>{rotationY}</td>
            </tr>
            <tr className="control">
              <td>Image rotation x-axis:</td>
              <td>
                <input
                  type="range"
                  value={rotationX}
                  onChange={handleSliderChange("rotationX")}
                  min="-90"
                  max="90"
                />
              </td>
              <td>{rotationX}</td>
            </tr>
            <tr className="control">
              <td>Image rotation z-axis:</td>
              <td>
                <input
                  type="range"
                  value={rotationZ}
                  onChange={handleSliderChange("rotationZ")}
                  min="-90"
                  max="90"
                />
              </td>
              <td>{rotationZ}</td>
            </tr>
            <tr className="control">
              <td>Image perspective:</td>
              <td>
                <input
                  type="range"
                  value={perspective}
                  onChange={handleSliderChange("perspective")}
                  min="0"
                  max="2000"
                />
              </td>
              <td>{perspective}</td>
            </tr>
            <tr className="control">
              <td>Image left position:</td>
              <td>
                <input
                  type="range"
                  value={positionLeft}
                  onChange={handleSliderChange("positionLeft")}
                  min="0"
                  max={window.innerWidth}
                />
              </td>
              <td>{positionLeft}</td>
            </tr>
            <tr className="control">
              <td>Image top position:</td>
              <td>
                <input
                  type="range"
                  value={positionTop}
                  onChange={handleSliderChange("positionTop")}
                  min="0"
                  max={window.innerHeight}
                />
              </td>
              <td>{positionTop}</td>
            </tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr className="control">
              <td>Drop shadow:</td>
              <td>
                <input
                  type="checkbox"
                  checked={dropShadow}
                  onChange={handleCheckboxChange("dropShadow")}
                />
              </td>
            </tr>
            {dropShadow && (
              <>
                <tr className="control">
                  <td>Shadow Y-axis:</td>
                  <td>
                    <input
                      type="range"
                      value={shadowY}
                      onChange={handleSliderChange("shadowY")}
                      min="0"
                      max="100"
                      step="1"
                    />
                  </td>
                  <td>{shadowY}</td>
                </tr>
                <tr className="control">
                  <td>Shadow blur:</td>
                  <td>
                    <input
                      type="range"
                      value={shadowBlur}
                      onChange={handleSliderChange("shadowBlur")}
                      min="0"
                      max="100"
                      step="1"
                    />
                  </td>
                  <td>{shadowBlur}</td>
                </tr>
              </>
            )}
            <tr className="control">
              <td>Image round corner:</td>
              <td>
                <input
                  type="range"
                  value={corner}
                  onChange={handleSliderChange("corner")}
                  min="0"
                  max="100"
                />
              </td>
              <td>{positionTop}</td>
            </tr>
            <tr className="control">
              <td>Background type:</td>
              <td>
                <Switch
                  value={backgroundType}
                  values={["color", "image", "none"]}
                  labels={["color", "image", "transparent"]}
                  onChange={handleBackgroundTypeChange}
                />
              </td>
            </tr>
            {backgroundType === "color" && (
              <tr className="control">
                <td>Background color:</td>
                <td>
                  <ColorPicker
                    defaultColor={backgroundSource}
                    onChange={handleBackgroundColorChange}
                  />
                </td>
              </tr>
            )}
            {backgroundType === "image" && (
              <tr className="control">
                <td>Background image:</td>
                <td>
                  <input
                    id="background-input"
                    type="file"
                    style={{ display: "none" }}
                    onChange={handleBackgroundImageInput}
                  />
                  <button onClick={handlePickBackground}>
                    Pick background
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
