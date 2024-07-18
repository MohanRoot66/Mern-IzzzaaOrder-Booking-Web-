import UserProfileForm from "../../forms/user-profile-form/UserProfileForm"
import { useGetMyUser, useUpdateMyUser } from "../api/MyUserApi";

const UserProfilePage = () => {

  const {updateUser,isLoading} = useUpdateMyUser();

  const {currentUser,isLoading:isGetLoading} = useGetMyUser();

  if(isGetLoading){
    return <span>Loading.....</span>
  }

  return(
    <UserProfileForm currentUser={currentUser} onSave={updateUser} isLoading={isLoading}/>
  )
}

export default UserProfilePage;