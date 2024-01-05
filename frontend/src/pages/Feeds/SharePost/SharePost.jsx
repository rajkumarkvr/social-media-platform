import React, { useRef, useState } from "react";
import "./sharepost.css";
import Icon from "../../../components/Icon/Icon";
import { faClipboard, faClose } from "@fortawesome/free-solid-svg-icons";


import TextBox from "../../../components/TextBox/TextBox";
const SharePost = ({ postId ,setShowShare}) => {
  const handleShowShare = (postId) => {
    setShowShare((prevState) => ({ [postId]: !prevState[postId] }));
  };
  const [copyStatus,setCopyStatus]=useState("Copy")
  const linkTextBox=useRef();
  const handleCopyPostLink=(linktext)=>{

    if (navigator) {
        //New way
        linkTextBox.current.select();
        navigator.clipboard
          .writeText(linktext)
          .then(() => {
            setCopyStatus("Copied...")
            
            setTimeout(() => {
                setCopyStatus("Copy")
            },300);
          })
          .catch((err) => {
            console.log("Error");
          });
      } else {
        //follow legacy way
        const txt_area = document.createElement("input");
        txt_area.value = linktext;
        document.body.appendChild(txt_area);
        txt_area.select();
        document.execCommand("copy");
        document.body.removeChild(txt_area);
        setCopyStatus("Copied...")
        setTimeout(() => {
            setCopyStatus("Copy")
        }, 300);
      }}
  return (
    <div className="sharepost-holder">
      <div className="post-share-header">
        <p className="share-title">Share</p>
        <Icon icon={faClose} className="btn-post-share-close" onClick={()=>handleShowShare(postId)}/>
      </div>
      <div className="post-share-body">
        <input
          type="text"
          ref={linkTextBox}
          value={`http://localhost:5173/post/${postId}`}
          className="post-share-link"
        />
        <Icon icon={faClipboard} className="btn-post-share-copy" onClick={()=>{ let text=`http://localhost:5173/post/${postId}`; handleCopyPostLink(text)}} />
        <p className="post-share-title">{copyStatus}</p>
      </div>
    </div>
  );
};

export default SharePost;
