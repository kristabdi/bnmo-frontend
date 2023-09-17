import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import NavbarUser from "../components/NavbarUser"
import api from "../clients/client"

function Dashboard() {
    const [data,  setData] = useState<any>();

    const fetchData = () => {
        fetch(api + "/customer/info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("access_token")}`
            },
            credentials: "include"
        }).then(response => response.json())
        .then((body:any) =>{
            setData(body);
        }).catch(error => {
            alert(error);
        })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
        <NavbarUser/>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto justify-start">
                {
                    data ? 
                (
                <>
                <div>
                    <h1 className="text-center text-4xl font-bold">Hi, {data.name}</h1>
                </div>
                <div>
                    <h3 className="text-muted py-2 text-2xl text-center">Username : {data.username}</h3>
                </div>
                <div>
                    <h3 className="text-muted text-2xl text-center">Balance : {data.balance}</h3>
                </div>
                </>
                )
                :
                <p> User data empty </p>
                }
            </div>
        </div>
        </>
    )
}

export default Dashboard;