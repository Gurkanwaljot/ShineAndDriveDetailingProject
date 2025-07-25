import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

import logo from "/assets/img/icon/logo.png";

import navitemlist from "../../dataJson/navitemlist.json";

export default function NavMenu() {
  const [navBar, setNavbar] = useState("");
  const [navlist, setNavList] = useState("");

  const navBarShow = () => {
    if (navBar === "") {
      setNavbar("ak-toggle_active");
    } else {
      setNavbar("");
    }

    if (navlist === "") {
      setNavList("ak-show-moblie-nav-list");
    } else {
      setNavList("");
    }
  };

  const closeMobileMenu = () => {
    setNavbar("");
    setNavList("");
  };

  return (
    <div className="ak-main_header">
      <div className="container">
        <div className="ak-main_header_in">
          <div className="ak-main-header-left">
            <Link className="ak-site_branding site-logo" to="/">
              <img src={logo} alt="..." />
            </Link>
          </div>
          <div className="ak-main-header-center">
            <div className="ak-nav ak-medium">
              <ul id="ak-nav_list" className={`ak-nav_list ${navlist}`}>
                {navitemlist?.map((item, i) => {
                  return <MenuItem props={item} key={i} onClick={closeMobileMenu} />;
                })}
              </ul>
              <span
                onClick={navBarShow}
                id="navBar"
                className={`ak-munu_toggle ${navBar}`}
              >
                <span></span>
              </span>
            </div>
          </div>
          <div className="ak-main-header-right"></div>
        </div>
      </div>
    </div>
  );
}