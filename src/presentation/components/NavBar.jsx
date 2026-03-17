import { NavLink } from "react-router-dom";
import logo from "/Netflix_logo_letters.svg";

import classes from "./NavBar.module.css";

export default function NavBar() {
  return (
    <>
      <NavLink to="/">
        <img className={classes.logo} src={logo} alt="Netflix logo" />
      </NavLink>

      <nav className={classes.navigation}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/shows"
          className={({ isActive }) =>
            isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
          }
        >
          TV Shows
        </NavLink>
        <NavLink
          to="/mylist"
          className={({ isActive }) =>
            isActive ? `${classes.navLink} ${classes.active}` : classes.navLink
          }
        >
          My List
        </NavLink>
      </nav>
    </>
  );
}
