import React from "react";
import { withRouter } from "react-router-dom";
import store from "../store";
import SnippetStoreImage from "../../static/snippetstore.png";
import ControlPanelImage from "../../static/control-panel.png";
import FreeTransformImage from "../../static/free-transform.gif";
import "./index.sass";

export default withRouter(({ history }) => {
  const handleOpenFile = () => {
    document.getElementById("image-input").click();
  };

  const handleFileChange = (e: any) => {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      store.setState({ image: event.target.result });
      history.push("/app");
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div id="index-page">
      <div className="header">
        <p className="title">Limus</p>
        <p className="sub-title">Look at your screenshot at different angles</p>
      </div>
      <div className="image-start">
        <div className="inner-border" />
        <div className="inner-content">
          <p>Drop you screenshot here</p>
          <p>OR</p>
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
    </div>
  );
});
