import React from "react";
import { withRouter } from "react-router-dom";
import store from "../store";
import "./index.sass";

export default withRouter(({ history }) => {
  const handleOpenFile = () => {
    document.getElementById("image-input").click();
  }

  const handleFileChange = (e: any) => {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      store.setState({ image: event.target.result });
      history.push("/app");
    }
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <div id="index-page">
      <div className="header">
        <p className="title">Limus</p>
        <p className="sub-title">
          Look at your screenshot at different angles
        </p>
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
    </div>
  )
})
