import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function LogoutButton() {
    const [cookies, setCookie] = useCookies();
    const onLogout = async () => {
        await axios.post('/api/logout/', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${cookies.get("token")}`
            },
        }).then((res: any) => {
            alert(JSON.stringify(`Logout success!`));
            cookies.remove("token");
            cookies.remove("name");
            cookies.remove("email");
            cookies.remove("balance");
            return <Navigate to="/login" />
        }).catch(error => {
            alert(JSON.stringify(`Logout failed!`));
        })
    }

    return (
        <>
            <button className="mx-4 text-white bg-blue-700 hover:text-gray-300 hover:bg-blue-900 font-bold px-2 py-2 rounded" onClick={onLogout}>Logout</button>        
        </>
    )
}

export default LogoutButton;