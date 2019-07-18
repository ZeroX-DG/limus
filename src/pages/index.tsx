import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import store from '../store';
import SnippetStoreImage from '../../static/snippetstore.png';
import ControlPanelImage from '../../static/control-panel.png';
import FreeTransformImage from '../../static/free-transform.gif';
import LimusInAction from '../../static/limus.mp4';
import './index.sass';

export default withRouter(({history}) => {
  const [isEmailValid, setEmailValid] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleOpenFile = () => {
    document.getElementById('image-input').click();
  };

  const handleFileChange = (e: any) => {
    var reader = new FileReader();
    reader.onload = (event: any) => {
      store.setState({image: event.target.result});
      history.push('/app');
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleSubscribe = () => {
    const date = new Date();
    const endpoint = `https://script.google.com/macros/s/AKfycbyB4DlJxp__U3-QpUcYpm1StqHW8UF97YKkFfUIJmWtEloeDg8/exec?email=${encodeURIComponent(
      email,
    )}&JoinDate=${encodeURIComponent(
      date.toDateString(),
    )}&Time=${date.getTime()}&sheet=limusEmail`;
    setIsSending(true);
    fetch(endpoint, {method: 'GET'}).then(() => {
      setIsSubscribed(true);
      setIsSending(false);
    });
  };

  const handleEmailChange = (e: any) => {
    if (e.target.value) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
    setEmail(e.target.value);
  };

  const handleFileDragOver = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleFileDrop = (e: any) => {
    e.preventDefault();
    const imageInput = document.getElementById(
      'image-input',
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
        className={`image-start ${isDragOver ? 'dragover' : ''}`}
        onDrop={handleFileDrop}
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragExit}>
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
          style={{display: 'none'}}
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
            </a>{' '}
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
          <img src={FreeTransformImage} style={{boxShadow: 'none'}} />
        </div>
      </div>
      <div className="in-action">
        <h1>Limus in action</h1>
        <video controls={true}>
          <source src={LimusInAction} type={'video/mp4'} />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="subscribe">
        <h1>Interested?</h1>
        <p>
          If you are interested, you can leave your email down below to receive
          up-to-date information about this app.
        </p>
        <p className="email-input">
          <input
            type="text"
            onChange={handleEmailChange}
            placeholder="email@example.com"
          />
        </p>
        <p className="email-input-button">
          {!isSubscribed ? (
            isEmailValid ? (
              !isSending ? (
                <button onClick={handleSubscribe}>Subscribe</button>
              ) : (
                'Submitting your email...'
              )
            ) : (
              ''
            )
          ) : (
            'Your email has been submitted successfully'
          )}
        </p>
      </div>
      <div className="faqs">
        <h1>FAQ</h1>
        <div className="faq">
          <p className="question">How can I request new feature?</p>
          <p className="answer">
            You can send me a tweet at{' '}
            <a href="https://twitter.com/ZeroX_Hung">@ZeroX_Hung</a>, send me an
            email at limusapp@outlook.com, or use the chat box down below.
          </p>
        </div>
        <div className="faq">
          <p className="question">Will this app free forever?</p>
          <p className="answer">
            As much as I love open source and free softwares, this app will
            eventually became a paid app. In the future, users will have to pay
            for the extra features.
          </p>
        </div>
      </div>
      <div className="footer">
        <p>
          Made with <span className="heart">♥</span> by{' '}
          <a href="https://github.com/ZeroX-DG">Viet Hung Nguyen</a>
        </p>
      </div>
    </div>
  );
});
