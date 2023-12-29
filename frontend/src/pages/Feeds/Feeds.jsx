import { useEffect, useState, useRef } from "react";
import "./feeds.css";
import {v4} from "uuid";
import { handleLike, handleComment, handlePostComment } from "./postOperations";
import {
  faHeart,
  faComment,
  faRetweet,
  faShare,
  faEllipsisV,
  faBookmark,
  faTrash,
  faCopy,
  faWarning,
  faPaperPlane,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../axiosInstance";
import Icon from "../../components/Icon/Icon";
import { Link, useParams } from "react-router-dom";
import { useProfile } from "../../hooks/UserContext";
import Alert from "../../components/Alert/Alert";
import Profile from "../Profile/Profile";
import Spinner from "../../components/Spinner/Spinner";
import UserPicture from "../../components/UserPicture/UserPicture";
import Button from "../../components/Button/Button";
const Feeds = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [dropdownState, setDropdownState] = useState({});
  const [commentState, setCommentState] = useState({});
  const { currentUser } = useProfile();
  const [err, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [liked, setLiked] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [postDeleted, setPostDeleted] = useState(true);
  const [isCopied, setIsCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState();
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  const dropRef = useRef();

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
  const handleCopyPost = (texttoCopy) => {
    // console.log(texttoCopy)

    if (navigator) {
      //New way
      navigator.clipboard
        .writeText(texttoCopy)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log("Error");
        });
    } else {
      //follow legacy way
      const txt_area = document.createElement("input");
      txt_area.value = texttoCopy;
      document.body.appendChild(txt_area);
      txt_area.select();
      document.execCommand("copy");
      document.body.removeChild(txt_area);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    }
  };
  //handle outside click func

  const handleDeletePost = async (postId, currentUserId) => {
    try {
      console.log(postId, currentUserId);
      const response = await axiosInstance.put("/post/delete", {
        postId: postId,
        currentUserId: currentUserId,
      });
      setPostDeleted((prev) => !prev);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    setError(false);
    setErrMsg("");
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get("/post");
        setPosts(response.data.response.reverse());
        setLoaded((prev) => !prev);
        setLoading(false);

        // console.log(response.data.response);
      } catch (error) {
        setLoading(false);
        setError(true);
        setErrMsg(error.message);
      }
    };
    fetchPosts();

    // setInterval(fetchPosts,10000);
  }, [liked, postDeleted]);

  const handleDropDown = (postId) => {
    setDropdownState((prevState) => ({
      [postId]: !prevState[postId],
    }));
  };
  const checkIslikedByYou = (post) => {
    const isLike = post.likes.includes(currentUser.id);
    return isLike;
  };
  // if(loading){
  //   return <Spinner />
  // }

  if (id) {
    return (
      <>
        <Profile user_Id={id} />
      </>
    );
  } else {
    return (
        <div className="feed-wrapper">
          {posts &&
            posts.length > 0 &&
            posts.map((post) => {
              const isLikedByYou = checkIslikedByYou(post);
              return (
                <div className="post-wrapper" key={post._id}>
                  <div id={post._id} className="feed-container" key={post._id}>
                    <div className="feed-profile-header">
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
                            to={`/${post.postedBy._id}`}
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
                    <div className="feed-fooder">
                      <div className="feed-fooder-icons">
                        <div className="fooder-items">
                          <Icon
                            className={
                              isLikedByYou ? "color-like" : "uncolor-like"
                            }
                            icon={faHeart}
                            onClick={() => {
                              handleLike(post._id, currentUser.id, setLiked);
                            }}
                          />
                          <div>{post.likeCount}</div>
                        </div>
                        <div className="fooder-items">
                          <Icon
                            onClick={() => {
                              handleComment(
                                post._id,
                                setCommentState,
                                setComments
                              );
                            }}
                            icon={faComment}
                          />
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
                    {dropdownState[post._id] && (
                      <div
                        ref={dropRef}
                        className={`feed-drop-down`}
                        id={`dropdown-${post._id}`}
                      >
                        <ul>
                          {post.postedBy._id == currentUser.id && (
                            <li
                              onClick={() => {
                                handleDeletePost(post._id, currentUser.id);
                              }}
                              className="delete-post"
                            >
                              <Icon icon={faTrash} />
                              <label>Delete</label>
                            </li>
                          )}
                          <li
                            onClick={() => {
                              handleCopyPost(post.content);
                            }}
                            className="copy-post"
                          >
                            <Icon icon={faCopy} />
                            <label>Copy</label>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  {commentState[post._id] && (
                    <div className="comment-section-container">
                      <div className="comment-header">
                        <div className="comment-user-profile">
                          <UserPicture />
                        </div>
                        <div className="comment-input">
                          <input
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Type Comment here..."
                            className="comment-input"
                            type="text"
                          />
                        </div>
                        <div
                          className={`comment-btn ${
                            !comment && "blur-comment-btn"
                          }`}
                        >
                          <Icon
                            visibility={false}
                            icon={faPaperPlane}
                            onClick={() => {
                              comment &&
                                handlePostComment(
                                  post._id,
                                  comment,
                                  currentUser.id
                                );
                            }}
                          />
                        </div>
                      </div>
                      <div className="comment-body">
                        {comments.map((comment)=>{
                          console.log(comment)
                        return comment.postId&&post._id&&<div key={comment._id}>
                                 <div className="comment-inner-header">
                                    <div className="commentedby-profile">
                                     <div> <img src={comment.commentedBy.userProfile} width="50px"  alt="" /></div>
                                      <div>{comment.commentedBy.username}</div>
                                    </div>
                                    <div>{calculateTimeDifference(new Date(),comment.createdAt)}</div>
                                    <Icon icon={faEllipsisVertical}/>
                                 </div>
                              </div>
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          {err && (
            <>
              {" "}
              <Alert className="err-alert" varient="danger">
                <Icon icon={faWarning} />
                Error occured {errMsg}.Please check your connection
              </Alert>
              <button
                className="err-alert-btn"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Try Again
              </button>
            </>
          )}

          {isCopied && (
            <Alert className="copied-alert" varient="success">
              Post Copied Successfully.
            </Alert>
          )}
        </div>
    );
  }
};

export default Feeds;
