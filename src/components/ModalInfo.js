import React, { useState } from "react";
import { Button } from "react-bootstrap";
import gliderGif from "../img/glider.gif";
import Modal from "react-bootstrap/Modal";
const ModalInfo = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Rules
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Game Rules</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span style={{ fontWeight: "bold" }}>1.</span> Any live cell with two
          or three live neighbours survives.
          <br />
          <span style={{ fontWeight: "bold" }}>2.</span> Any dead cell with
          three live neighbours becomes a live cell.
          <br />
          <span style={{ fontWeight: "bold" }}>3.</span> All other live cells
          die in the next generation. Similarly, all other dead cells stay dead.
          <br />
          <br />
          <img src={gliderGif}></img>
          <br />
          <br />
          For more info{" "}
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginRight: "5px" }}
          >
            Wikipedia.
          </a>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="success" onClick={handleClose}>
            Got It!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalInfo;
