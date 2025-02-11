import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateMyUser } from "../api/MyUserApi";

const AuthcallBackProvide = () => {
    const {user} = useAuth0();

    const navigate = useNavigate();

    const {createUser} = useCreateMyUser();

    const hasCreatedUser = useRef(false);

    useEffect(() => {
        if(user?.sub && user?.email && !hasCreatedUser.current){
            createUser({
                auth0Id : user.sub,
                email:user.email
            });
            hasCreatedUser.current=true;
        }
        navigate("/");
    }, [createUser, navigate,user]);

    return <>L</>
}

export default AuthcallBackProvide;