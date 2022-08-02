import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function LogoutButton() {
    const navigate = useNavigate();

    const onLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("is_admin");
        Cookies.remove("username");
        return navigate("/login");
    }

    return (
        <>
            <button className="mx-4 text-white bg-blue-700 hover:text-gray-300 hover:bg-blue-900 font-bold px-2 py-2 rounded" onClick={onLogout}>Logout</button>        
        </>
    )
}

export default LogoutButton;