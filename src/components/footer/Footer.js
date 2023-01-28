import React from 'react';

//--- Import Style File
import "./footer.scss";

//--- Import Image
import bg from "../../assets/footer-bg.jpg";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='footer' style={{backgroundImage: `url(${bg})`}}>
      <div className='footer__content container mb-3'>
        <div className='footer__content__logo mb-3'>
          <img src={logo} alt='Logo'/>
            <Link to="/">TBMovies</Link>
        </div>
        <div className='footer__content__menus'>
          <div className='footer__content__menus__menu'>
            <Link to="">Home</Link>
            <Link to="">Contact us</Link>
            <Link to="">Term of services</Link>
            <Link to="">About us</Link>
          </div>
          <div className='footer__content__menus__menu'>
            <Link to="">Live</Link>
            <Link to="">FAQ</Link>
            <Link to="">Premium</Link>
            <Link to="">Privary policy</Link>
          </div>
          <div className='footer__content__menus__menu'>
            <Link to="">You must watch</Link>
            <Link to="">Recent releasse</Link>
            <Link to="">Top IMDB</Link>
          </div>
        </div>
      </div>
      <div className='copyright'>
        Designed by <strong>Ham47mani</strong> 2023
      </div>
    </footer>
  );
}

export default Footer;
