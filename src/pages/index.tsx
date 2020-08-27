import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import store from "../store";
import SnippetStoreImage from "../../static/snippetstore.png";
import ControlPanelImage from "../../static/control-panel.png";
import FreeTransformImage from "../../static/free-transform.gif";
import LimusInActionWebM from "../../static/limus.webm";
import LimusInActionMp4 from "../../static/limus.mp4";
import "./index.sass";

export default withRouter(({ history }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleOpenFile = () => {
    document.getElementById("image-input").click();
  };

  const handleFileChange = (e: any) => {
    var reader = new FileReader();
    reader.onload = async (event: any) => {
      await store.setState({ image: event.target.result });
      history.push("/app");
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFileDragOver = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const imageInput = document.getElementById(
      "image-input"
    ) as HTMLInputElement;
    imageInput.files = e.dataTransfer.files;
  };

  const handleFileDragExit = e => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div id="index-page">
      <div className="header">
        <p className="title">Limus</p>
        <p className="sub-title">Look at your screenshot at different angles</p>
      </div>
      <div
        className={`image-start ${isDragOver ? "dragover" : ""}`}
        onDrop={handleFileDrop}
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragExit}
      >
        <div className="inner-border" />
        <div className="inner-content">
          <p className="main-drop-text">Drop you screenshot here</p>
          <p className="or-text">OR</p>
          <button onClick={handleOpenFile}>Browse file</button>
        </div>
        <input
          type="file"
          accept=".jpg,.png"
          id="image-input"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <div className="feature">
        <div className="feature-text">
          <h1 className="title">Your screenshot at different angles</h1>
          <p className="content">
            With Limus, your screenshot / picture can be easily viewed at
            different angles, all can be controlled by your hand. In fact, the
            picture on below is the screenshot of one of my apps—
            <a href="https://zerox-dg.github.io/SnippetStoreWeb/">
              SnippetStore
            </a>{" "}
            after being transformed using <b>Limus</b>.
          </p>
        </div>
        <img src={SnippetStoreImage} />
      </div>
      <div className="two-part-feature">
        <div className="left-part">
          <img src={ControlPanelImage} />
        </div>
        <div className="right-part with-text">
          <h1 className="title">Highly customizable</h1>
          <p className="content">
            Everything is within your power to control. Using our config panel,
            everything is possible.
          </p>
        </div>
      </div>
      <div className="two-part-feature">
        <div className="left-part with-text">
          <h1 className="title">Manual transformation</h1>
          <p className="content">
            Slider control is not enough? Transform it manualy using our manual
            transformation support system. Just hold shift and start dragging
            your picture around with your mouse until you are satisfied.
          </p>
        </div>
        <div className="right-part">
          <img src={FreeTransformImage} style={{ boxShadow: "none" }} />
        </div>
      </div>
      <div className="in-action">
        <h1>Limus in action</h1>
        <video controls={true}>
          <source src={LimusInActionMp4} type={"video/mp4"} />
          <source src={LimusInActionWebM} type={"video/webm"} />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="footer">
        <div className="content">
          <div className="info">
            <a href="https://github.com/ZeroX-DG/limus">
              <i className="fa fa-github" />
            </a>
            <a href="https://github.com/ZeroX-DG/limus/issues/new">
              <i className="fa fa-bug" />
            </a>
          </div>
          <div className="credit">
            Create by <a href="https://zerox-dg.github.io/">Viet Hung Nguyen</a>
          </div>
        </div>
      </div>
    </div>
  );
});
