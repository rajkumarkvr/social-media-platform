import React from "react";
import { useProfile } from "../../hooks/UserContext";
import { Outlet } from "react-router-dom";
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
import { v4 as uuidv4 } from "uuid";
const Home = () => {
  const { currentUser } = useProfile();

  return (
    <div className="home-container">
      <div className="navbar">
        <p className="company-logo">
          <NavLink to="/">Social Media Platform</NavLink>
        </p>
        <div className="profile-info">
          <img
            className="user-profile"
            src={currentUser.profilePic}
            alt="User Profile"
          />
          <NavLink to="/profile" className="home-username">
            {currentUser?.username}
          </NavLink>
        </div>
      </div>
      <div className="side-bar">
        <div className="app-lists" key={uuidv4()}>
          <div className="component">
            <Icon icon={faHouse} />
            <NavLink to="/">Home</NavLink>
          </div>
          <div className="component">
            <Icon icon={faMessage} />
            <NavLink to="/chat">Chat</NavLink>
          </div>
          <div className="component">
            <Icon icon={faUpload} />
            <NavLink to="/post">Post</NavLink>
          </div>
          <div className="component">
            <Icon icon={faUser} />
            <NavLink to="/profile">Profile</NavLink>
          </div>
          <div className="component">
            <Icon icon={faBell} />
            <NavLink to="/notification">Notification</NavLink>
          </div>
          <div className="component">
            <Icon icon={faGear} />
            <NavLink to="/settings">Settings</NavLink>
          </div>
        </div>
      </div>

      <div className="body">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
