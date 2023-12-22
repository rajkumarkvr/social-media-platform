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
export const handleComment=(postId,setCommentState)=>{
  console.log(postId)
  setCommentState((prevComment)=>({...prevComment,[postId]:!prevComment[postId]}))
}
//To post user comment
export const handlePostComment=(postId,comment,userid)=>{
  console.log(postId,comment,userid)
};