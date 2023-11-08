import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuth = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    console.log(user);
    if (user) {
        navigate('/');
        return null;
    }
    
}

export default useAuth;