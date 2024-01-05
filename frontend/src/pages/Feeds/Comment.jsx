import React, { useEffect, useState } from "react";
import UserPicture from "../../components/UserPicture/UserPicture";
import Icon from "../../components/Icon/Icon";
import {
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import LoadComment from "./LoadComment";

const Comment = ({
  commentState,
  post,
  setComment,
  comment,
  handlePostComment,
  calculateTimeDifference,
  comments,
  currentUser,
}) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = () => {
    // Update key to force re-mount
    setRefreshKey(prevKey => prevKey + 1);
  };
  return (
    <>
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
            <div className={`comment-btn ${!comment && "blur-comment-btn"}`}>
              <Icon
                visibility={false}
                icon={faPaperPlane}
                onClick={async () => {
                  comment &&
                   await handlePostComment(post._id, comment, currentUser.id);
                  // setCommented((prev) => !prev);
                  // handleUpdateComment(post._id);
                  refresh()
                }}
              />
            </div>
          </div>
          {comments.length == 0 && (
            <div className="no-comments-alert">No comments Yet.</div>
          )}
          <div className="comment-body"  key={refreshKey}>
            <LoadComment comments={comments} calculateTimeDifference={calculateTimeDifference} post={post}/>
          </div>
        </div>
      )}
    </>
  );
};

export default Comment;
