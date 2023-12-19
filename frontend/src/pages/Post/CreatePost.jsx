import { useState } from "react";
import Button from "../../components/Button/Button";
import "./createpost.css";
import axiosInstance from "../../axiosInstance";
import TextPost from "./TextPost";
import ImagePost from "./ImagePost";
import { useProfile } from "../../hooks/UserContext";
import {useNavigate} from "react-router-dom";

const post_catagory = { TEXT: "text", IMAGE: "image" };

const CreatePost = () => {
  const navigate=useNavigate();
  const {currentUser}=useProfile();
  const [currentPost, setCurrentPost] = useState("text");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const handleTextValue = (e) => {
    setContent(e.target.value);
  };
  const hanldeTextPost = async () => {
    if (content.trim()) {
      setError("");
      try {
        const post={content:content,postedBy:currentUser.id}
        const response=await axiosInstance.post("/post/new",post);
        setContent("");
        navigate("/")
      } catch (error) {
        console.log(error.message);
      }
    } else {
      setError("Post content should not be empty!");
    }
  };
  return (
    <>
      {currentPost == post_catagory.TEXT && (
        <TextPost
        content={content}
          handleTextValue={handleTextValue}
          hanldeTextPost={hanldeTextPost}
          error={error}
        />
      )}
      {currentPost == post_catagory.IMAGE && <ImagePost />}
      <div className="post-wrapper">
        <div className="post-options">
          <Button onClick={() => setCurrentPost(post_catagory.TEXT)}>
            Text
          </Button>
          <Button onClick={() => setCurrentPost(post_catagory.IMAGE)}>
            Image with Text
          </Button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
