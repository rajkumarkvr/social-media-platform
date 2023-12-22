import Button from "../../components/Button/Button";
import P from "../../components/Paragraph/P";
import UserPicture from "../../components/UserPicture/UserPicture";
import { useProfile } from "../../hooks/UserContext";

const TextPost = ({ handleTextValue, hanldeTextPost, error,content}) => {
  const {currentUser}=useProfile();
  return (
    <div className="post-wrapper">
      <div className="text-post-wrapper">
        <div className="text-header">
          <UserPicture rounded={true} width="40px" height="40px" />
          <label>{currentUser.name}</label>
          <label className="meta-q">What's on your mind?</label>
        </div>
        <textarea
          spellCheck="false"
          placeholder="Write something on your mind."
          value={content}
          onChange={handleTextValue}
          className="post-conatiner"
        ></textarea>
        {error && <P varient="danger">{error}</P>}
      </div>
      <div>
        <Button className="btn-post-txt" onClick={hanldeTextPost}>Post</Button>
      </div>
    </div>
  );
};

export default TextPost;
