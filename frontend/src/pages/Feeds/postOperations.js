import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
export const handleLike = async (postId, currentUserId,setLiked) => {
  try {
    const response = await axiosInstance.put("/post/like", {
      postId: postId,
      currentUserId: currentUserId,
    });
    setLiked(prev=>!prev);
    // console.log(response.data.likeCount);
    // return response.data.likeCount;
  } catch (error) {}
};
//To show comment section


export const handleComment=async(postId,setCommentState,setComments,setCommented)=>{
  setCommentState((prevComment)=>({[postId]:!prevComment[postId]}))
    try {
      const response=await axiosInstance.post("/post/comments",{postId:postId});
     response.data&&setComments(response.data.reverse())
    //  console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    
}
//To post user comment

export const handlePostComment=async (postId,comment,userId)=>{
  console.log(postId,comment,userId)
  try {
    const response=await axiosInstance.post("/post/comment",{postId:postId,comment:comment,userId:userId});
    // console.log(response.data);
  } catch (error) {
    console.log(error)
  }
  
};

//Handle update comment

export const handleUpdateComment=async()=>{

  try {
    const response = await axiosInstance.post("post/ccount");
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.log(error.message)
  }
}