import React from "react";
import "./loading.css";

const Loading = loader => {
  return loader.loading ? (
    <div className="overlay-content">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="row">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
        <div className="row message">
          <strong><span className="message">{loader.message}</span></strong>
        </div>
      </div>
    </div>
  ) : null;
};

export default Loading;
