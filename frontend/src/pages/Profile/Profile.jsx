import { Link } from "react-router-dom";
import Icon from "../../components/Icon/Icon";
import { useProfile } from "../../hooks/UserContext";
import "./profile.css";
import { faUser, faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axiosInstance from "../../axiosInstance";

import Loader from "../../components/Loader/Loader";
import Feeds from "../Feeds/Feeds";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
const Profile = ({ user_Id }) => {
  const { currentUser, setCurrentUser } = useProfile();
  const currUser = JSON.parse(localStorage.getItem("_user")).id;
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const [error,setErr]=useState("");
const handleBack=()=>{
  window.history.back();
}

  //Fetch userprofile from express
  useEffect(() => {
    setErr("");
    const fetchProfile = async () => {
      setLoading(true);
      setProfile({});
      try {
        let id =  user_Id ? user_Id : currUser;
        const response = await axiosInstance.post("user/profile", {
          id: id,
        });
        if (response.data.response) {
          setProfile(response.data.response);
        }
        // console.log(profile)
        //For handling local user
        if (response.data && !user_Id) {
          const userData = {
            id: response.data.response._id,
            name: response.data.response.name,
            username: response.data.response.username,
            gender: response.data.response.gender,
            profilePic: response.data.response.userProfile,
            posts: response.data.response.posts,
          };
          localStorage.setItem("_user", JSON.stringify(userData));
          setCurrentUser(JSON.parse(localStorage.getItem("_user")));
        }
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setErr(err.response.data.error);
      }
    };
    fetchProfile();
  }, []);
  if(error){return <Alert varient="danger">{error}</Alert>}
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="profile-container">
          <div className="username-holder">
            <Icon icon={faUser} />
            <Link>{profile.username}</Link>
          </div>
          <div className="profile-header">
            <div className="profile-pic-holder">
              <img
                width="50px"
                height="50px"
                src={profile.userProfile}
                alt="ddd"
              />
              <div className="current-username">{profile.name}</div>
            </div>
            <div className="post-count-holder">
              <div>{profile?.posts?.length ? profile.posts.length : "0"}</div>
              <div>posts</div>
            </div>
            <div className="followers-count-holder">
              <div>10</div>
              <div>Followers</div>
            </div>
            <div className="following-count-holder">
              <div>20</div>
              <div>Following</div>
            </div>
          </div>
         {user_Id&&<Icon onClick={handleBack} className="profile-back-btn" icon={faChevronCircleLeft} />}
        </div>
      )}
    </>
  );
};

export default Profile;
