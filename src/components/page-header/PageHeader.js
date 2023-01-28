import React from 'react';

//--- Import Style & Image
import "./page-header.scss";
import bg from "../../assets/footer-bg.jpg";

const pageHeader = ({children}) => {
  return (
    <div className='page-header mb-2' style={{backgroundImage: `url(${bg})`}}>
      <h2>{children}</h2>
    </div>
  );
}

export default pageHeader;
