import { useProfile } from "../../hooks/UserContext";
const UserPicture = ({className,onClick,width,height,rounded}) => {
    const {currentUser} = useProfile();
  return <img style={{borderRadius:rounded?"50%":"0px"}} width={width} height={height} className={className} onClick={onClick} src={currentUser.profilePic} alt="user image"  />
}
UserPicture.defaultProps={
    rounded:false
}
export default UserPicture