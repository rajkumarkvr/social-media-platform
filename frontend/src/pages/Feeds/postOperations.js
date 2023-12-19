import axiosInstance from "../../axiosInstance";
export const handleLike = async (postId, currentUserId) => {
  try {
    const response = await axiosInstance.put("/post/like", {
      postId: postId,
      currentUserId: currentUserId,
    });
    console.log(response.data.likeCount);
    return response.data.likeCount;
  } catch (error) {}
};
