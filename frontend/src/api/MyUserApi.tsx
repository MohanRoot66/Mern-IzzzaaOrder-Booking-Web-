import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { useMutation } from "react-query";

const domain = import.meta.env.VITE_BASE_URL;

type CreateUserRequest = {
    auth0Id : string,
    email : string
}

export const useCreateMyUser = () =>{

    const {getAccessTokenSilently} = useAuth0();


    const createMyUserRequest = async (user:CreateUserRequest) =>{
        const acessToken = await getAccessTokenSilently();
        axios.post(`${domain}/api/my/user`,{
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