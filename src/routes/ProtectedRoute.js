import { useEffect } from "react";
import { Loading } from "../components/Loading";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
export const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    const {isLoading, isAuthenticated} = useUser();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            console.log('Not authenticated');
            navigate("/login");
        }
    }, [isAuthenticated, isLoading, navigate]);
    if (isLoading) return <Loading/>
    
    if (isAuthenticated) return children
}
