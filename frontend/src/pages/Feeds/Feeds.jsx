import { useEffect, useState } from "react";
import "./feeds.css";
import { handleLike } from "./postOperations";
import {
  faHeart,
  faComment,
  faRetweet,
  faShare,
  faEllipsisV,
  faBookmark,
  faTrash,
  faCopy
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../axiosInstance";
import Icon from "../../components/Icon/Icon";
import { Link } from "react-router-dom";
import { useProfile } from "../../hooks/UserContext";
import Alert from "../../components/Alert/Alert";
const Feeds = () => {
  const [posts, setPosts] = useState([]);
  const [dropdownState, setDropdownState] = useState({});
  const {currentUser}=useProfile();
  const [liked,setLiked] = useState(false);
  const [isCopied,setIsCopied] = useState(false);
  function calculateTimeDifference(currentDate, previousDate) {
    const currentDateObj = new Date(currentDate);
    const previousDateObj = new Date(previousDate);

    const difference = currentDateObj.getTime() - previousDateObj.getTime();
    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return years === 1 ? "1 year ago" : `${years} years ago`;
    } else if (months > 0) {
      return months === 1 ? "1 month ago" : `${months} months ago`;
    } else if (days > 0) {
      return days === 1 ? "1 day ago" : `${days} days ago`;
    } else if (hours > 0) {
      return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    } else if (minutes > 0) {
      return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    } else {
      return "just now";
    }
  }

  //To handle copy the text post
  const handleCopyPost=(texttoCopy)=>{
    // console.log(texttoCopy)

    if(navigator){
      //New way
      navigator.clipboard.writeText(texttoCopy).then(()=>{
          
        setIsCopied(true);
        setTimeout(()=>{
          setIsCopied(false)
        },1500);
      }
       
      ).catch((err)=>{
        console.log("Error")
      })
     
    }
    else{
      //follow legacy way
      const txt_area=document.createElement("input")
      txt_area.value=texttoCopy;
      document.body.appendChild(txt_area);
      txt_area.select();
      document.execCommand("copy");
      document.body.removeChild(txt_area);
      setIsCopied(true);
      setTimeout(()=>{
        setIsCopied(false)
      },1500);
    }
  }
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/post");
        setPosts(response.data.response);
        console.log(response.data.response);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
    // setInterval(fetchPosts,10000);
  }, [liked]);

 
  const handleDropDown = (postId) => {
  
    setDropdownState((prevState) => ({
   
      [postId]: !prevState[postId] 

    }));
 
  };
  const checkIslikedByYou=(post)=>{
    const  isLike=post.likes.includes(currentUser.id);
    return isLike
  }
  return (
    <div className="feed-wrapper">
      {posts.map((post) => {
        const isLikedByYou=checkIslikedByYou(post);
        return (
          <>
          
            <div  id={post._id} className="feed-container" key={post._id}>
              <div className="feed-profile-header" >
                <div className="feed-user-icon">
                  <img
                    width="50px"
                    src={post.postedBy.userProfile}
                    alt="user"
                  />
                </div>
                <div className="feed-username">
                  {`${post.postedBy.name} `}
                  {
                    <Link
                      id={post.postedBy._id}
                      to="/profile"
                      className="user-nickname"
                    >{`@${post.postedBy.username}`}</Link>
                  }
                </div>
                <div className="feed-posted-time">
                  {calculateTimeDifference(new Date(), post.createdAt)}
                </div>
                <Icon
                  className="vertical-icon"
                  id={post.postedBy.id}
                  icon={faEllipsisV}
                  onClick={() => handleDropDown(post._id)}
                />
              </div>
              <div className="feed-body-content">{post.content}</div>
              <div className="feed-fooder" >
                <div className="feed-fooder-icons">
                  <div className="fooder-items">
                    <Icon 
                   className={isLikedByYou?"color-like":"uncolor-like"}
                    icon={faHeart} onClick={()=>{
                      handleLike(post._id,currentUser.id)
                      setLiked(prev=>!prev)
                    }
                    }/>
                    <div >{post.likeCount}</div>
                  </div>
                  <div className="fooder-items">
                    <Icon icon={faComment} />

                    <div>20</div>
                  </div>
                  <div className="fooder-items">
                    <Icon icon={faRetweet} />

                    <div>5</div>
                  </div>
                  <div className="fooder-items">
                    <Icon icon={faShare} />

                    <div>20</div>
                  </div>
                </div>
                <div className="post-save-btn">
                  <Icon className="light" icon={faBookmark} />
                </div>
              </div>
              {dropdownState[post._id]&&(<div className="feed-drop-down" id={`dropdown-${post._id}`}>
              <ul >
                <li  className="delete-post"><Icon icon={faTrash} /><label>Delete</label></li>
                <li onClick={()=>{handleCopyPost(post.content)}} className="copy-post"><Icon  icon={faCopy} /><label>Copy</label></li>
              </ul>
            </div>)}
            </div>
           
          </>
        );
      })}
      {isCopied&& <Alert className="copied-alert" varient="success">Post Copied Successfully.</Alert>}
    </div>
  );
};

export default Feeds;
