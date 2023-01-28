import React from 'react';
import PropTypes from 'prop-types';

import "./button.scss";

// ------------------------------------- Start Button -------------------------------------
const Button = props => {
  return (
    <button 
      className={`btn ${props.className}`} 
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </button>
  )
}
Button.propTypes = {
  onClick: PropTypes.func
}
// ------------------------------------- End Button -------------------------------------

// ------------------------------------- Start Outline Button -------------------------------------
export const OutlineButton = props => {
  return (
    <Button 
      className={`btn btn-outline ${props.className}`} 
      onClick={props.onClick ? () => props.onClick() : null}
    >
      {props.children}
    </Button>
  )
}
// ------------------------------------- End Outline Button -------------------------------------

export default Button