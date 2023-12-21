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
