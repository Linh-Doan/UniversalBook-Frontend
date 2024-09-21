import { useParams } from "react-router-dom";
import { PersonalProfile } from "./PersonalProfile";
import { PublicProfile } from "./PublicProfile";
import { useUser } from "../../hooks/useUser";

export const Profile = () => {
	const { id } = useParams()
	console.log(id)
    const { user, userId, isAuthenticated } = useUser();
	const isUser = id == userId;
    if (isAuthenticated) {
        if (isUser) return <PersonalProfile id={userId}/>
	    else return <PublicProfile id={userId}/>
    }
	
}
