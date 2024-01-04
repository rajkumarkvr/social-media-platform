import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/Login/Login";
import RequiredAuth from "./components/RequiredAuth/RequiredAuth";
import Settings from "./pages/Settings/Settings";
import CreatePost from "./pages/Post/CreatePost";
import Feeds from "./pages/Feeds/Feeds";
import Profile from "./pages/Profile/Profile";
import Chat from "./pages/Chat/Chat";
const App = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        >
          <Route index path="/" element={<Feeds />}></Route>
          <Route index path="/:id" element={<Feeds />}></Route>
          <Route path="chat" element={<Chat />}></Route>
          <Route path="post" element={<CreatePost />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        
          <Route path="notification" element={<h1>Notification</h1>}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>

        <Route
          path="/register"
          element={
            <RequiredAuth>
              <Register />
            </RequiredAuth>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <RequiredAuth>
              <Login />
            </RequiredAuth>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
