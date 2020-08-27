import * as React from "react";
import logo from "../../static/logo.png";
import LimusInActionMp4 from "../../static/limus.mp4";
import LimusInActionWebM from "../../static/limus.webm";
import "./mobile.sass";

export default () => {
  return (
    <div className="mobile">
      <img id="logo" src={logo} />
      <p id="description">Transform image to be more professional</p>
      <h1 id="instruction">Please use a desktop device to try out this app.</h1>
      <div className="limus-in-action">
        <h1>Limus in action</h1>
        <video controls={true}>
          <source src={LimusInActionMp4} type={"video/mp4"} />
          <source src={LimusInActionWebM} type={"video/webm"} />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};
