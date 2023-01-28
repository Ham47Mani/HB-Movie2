import React, { useEffect, useRef } from 'react';

//--- Import Header Style
import "./header.scss";

//--- Import Logo
import logo from "../../assets/logo.png";
import { Link, useLocation } from 'react-router-dom';

//--- Header Navbar
const headerNav = [
  {
    display: "Home",
    path: "/"
  },
  {
    display: "Movies",
    path: "/movie"
  },
  {
    display: "TV Series",
    path: "/tv"
  }
];

const Header = () => {
  const {pathname} = useLocation();
  const headerRef = useRef(null);
  const active = headerNav.findIndex(e => e.path === pathname);
  
  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    }
    window.addEventListener("scroll", shrinkHeader);
    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  return (
    <header ref={headerRef} className="header">
      <div className='header__wrap container'>
        <div className='logo'>
          <img src={logo} alt='Logo'/>
          <Link to="/">TBMovies</Link>
        </div>
        <ul className='header__nav'>
          {
            headerNav.map((e, i) => (
              <li key={i} className={`${i === active ? "active" : ""}`}>
                <Link to={e.path}>{e.display}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </header>
  );
}

export default Header;
