import React from "react";
import { useProfile } from "../../hooks/UserContext";
import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faUser,
  faBell,
  faGear,
  faMessage,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import "./home.css";
import { NavLink } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import ConfirmModel from "../../components/ConfirmModel/ConfirmModel";
import { v4 as uuidv4, v4 } from "uuid";
const Home = () => {
  const { currentUser } = useProfile();

  return (
    <div className="home-container">
      <div className="navbar">
        <p className="company-logo">
          <NavLink to="/">Social Media Platform</NavLink>
        </p>
        <div className="profile-info">
          <Link to="/profile"><img
            className="user-profile"
            src={currentUser.profilePic}
            alt="User Profile"
          /></Link>
          
          <NavLink to="/profile" className="home-username">
            {currentUser?.username}
          </NavLink>
        </div>
      </div>
      <div className="side-bar">
        <div className="app-lists" key={uuidv4()}>
          <NavLink className="component" to="/">
            <Icon icon={faHouse} />
            <p>Home</p>
          </NavLink>

          <NavLink className="component" to="/chat">
            <Icon icon={faMessage} />
            <p>Chat</p>
          </NavLink>
          <NavLink className="component" to="/post">
            <Icon icon={faUpload} />
            <p>Post</p>
          </NavLink>

          <NavLink className="component" to="/profile">
            <Icon icon={faUser} />
            <p>Profile</p>
          </NavLink>

          <NavLink className="component" to="/notification">
            <Icon icon={faBell} />
            <p>Notification</p>
          </NavLink>

          <NavLink className="component" to="/settings">
            <Icon icon={faGear} />
            <p>Settings</p>
          </NavLink>
        </div>
      </div>

      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
