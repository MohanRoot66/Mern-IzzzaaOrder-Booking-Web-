import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const domain = import.meta.env.VITE_BASE_URL;

type CreateUserRequest = {
    auth0Id : string,
    email : string
}
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getCurrentUser = async () => {
    try {
      const accessToken = await getAccessTokenSilently();
      const response = await axios.get(`${domain}/api/my/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      return response.data; // Ensure the user data is returned
    } catch (err) {
      throw new Error("Errror occured");
    }
  };

  const { data: currentUser, isLoading, error } = useQuery("fetchCurrentUser", getCurrentUser);

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};
export const useCreateMyUser = () =>{

    const {getAccessTokenSilently} = useAuth0();

    const createMyUserRequest = async (user:CreateUserRequest) =>{
        const acessToken = await getAccessTokenSilently();
        await axios.post(`${domain}/api/my/user`,{
            email : user.email,
            auth0Id : user.auth0Id
        },{
            headers:{
                Authorization:`Bearer ${acessToken}`,
                "Content-Type":"application/json"
            }
        })
        .then(response=>console.log(response.data))
        .catch(()=>{throw new Error("failed to register")});
    }

    const {mutateAsync:createUser,isLoading,isError,isSuccess} = useMutation(createMyUserRequest);
    
    return {
        createUser,isLoading,isError,isSuccess
    }
}

type updateMyUserRequest = {
    name:string,
    address :string,
    city:string,
    country :string
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData:updateMyUserRequest) => {
    try {
      const accessToken = await getAccessTokenSilently();
      
      const response = await fetch(`${domain}/api/my/user`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Log additional information about the error response
        const errorData = await response.json();
        console.error('Error response data:', errorData);
        throw new Error(`Failed to update user: ${response.statusText}`);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error : any) {
      console.error('Update user error:', error);
      throw new Error(`Failed to update user: ${error.message}`);
    }
  };

  const { mutateAsync: updateUser, isLoading, isSuccess, error, reset } = useMutation(updateMyUserRequest);

  if(isSuccess){
    toast.success("User profile updated! ")
  }

  if(error){
    toast.error(error.toString());
    reset();
  }

  return {
    updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  };
};

