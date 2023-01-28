import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

//--- Import Style File
import "./modal.scss";

// ------------------------------------- Start Modal -------------------------------------
const Modal = props => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(props.active);
  }, [props.active]);

  //--- Close Handler
  const closeHandler = (e) => {
    if (e.target.classList.contains("modal")) {
      setActive(false);
      e.target.classList.remove("active");
      props.onClose();
    }
  }

  return (
    <div id={props.id} className={`modal ${active ? "active" : ""}`} onClick={closeHandler}>
      {props.children}
    </div>
  )
}

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string
}
// ------------------------------------- End Modal -------------------------------------

// ------------------------------------- Start Modal Content -------------------------------------
export const ModalContent = props => {
  const contentRef = useRef(null);
  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active");
    if (props.onClose) props.onClose();
  }

  return (
    <div className='modal__content' ref={contentRef}>
      {props.children}
      <div className='modal__content__close' onClick={closeModal}>
        <i className='bx bx-x'></i>
      </div>
    </div>
  );
}

ModalContent.propTypes = {
  onClose: PropTypes.func
}
// ------------------------------------- End Modal Content -------------------------------------

export default Modal;