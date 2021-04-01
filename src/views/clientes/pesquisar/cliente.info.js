import React from "react";

import { Modal, Button } from "react-bootstrap";

const ClienteInfo = props => {
  function modalHandle() {
    console.log("Change para os inputs");
  }
  return (
    <>
      <Modal show={props.open} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>{props.cliente.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group col-12">
            <label htmlFor="inputEmail">Email</label>
            <input
              onChange={modalHandle}
              value={props.cliente.email || ""}
              className="form-control form-control-sm"
              id="inputEmail"
              placeholder="Email"
            />

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ClienteInfo;
