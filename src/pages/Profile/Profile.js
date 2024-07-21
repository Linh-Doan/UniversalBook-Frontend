import { useParams } from "react-router-dom";
import { PersonalProfile } from "./PersonalProfile";
import { PublicProfile } from "./PublicProfile";

export const Profile = () => {
	const { id } = useParams()
	console.log(id)
	const isUser = true;
	if (isUser) return <PersonalProfile/>
	else return <PublicProfile/>
}
