import React, { useState } from "react";
import "./index.scss";
import LinkItem from "../menuNav/linkItem";
import Logo from "../../misc/logo";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
export default function Burger() {
  let history = useHistory();
  const [checked, setChecked] = useState(false);
  const handleChecked = () => {
    setChecked(!checked);
  };
  function handleClick(link: string) {
    history.push(link);
  }

  return (
    <div className="menu-wrap">
      <div className="logo_burger">
        <Logo width="100" height="100" />
        <span className="mt-1">Checkinify.be</span>
      </div>
      <input
        onChange={handleChecked}
        type="checkbox"
        id="toggle"
        style={{
          display: "none",
        }}
      />
      <label className={checked ? "toggle-btn btn-toggle-btn" : "toggle-btn"} htmlFor="toggle">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </label>

      <nav className={checked ? "active-nav" : ""}>
        <ul className="d-flex flex-column justify-content-around">
          <LinkItem text="Home" offset="100" href="/" />
          <LinkItem text="Mogelijkheden" offset="100" href="#features" />
          <LinkItem text="Oplossingen" offset="100" href="#solutions" />
          <LinkItem text="Deelnemers" offset="100" href="#participants" />
          <LinkItem text="Contact" offset="100" href="#contact" />
          <li>
            <Link to={"/login"}>Login</Link>
          </li>
          <li>
            <Link to={"/register"}>Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
