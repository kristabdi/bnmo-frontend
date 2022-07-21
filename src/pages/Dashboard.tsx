import React, { useEffect, useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom"
import NavbarUser from "../components/NavbarUser"

function Dashboard() {
    const [cookies, setCookie] = useCookies();
    const [data,  setData] = useState([]);

    // if (cookies.get("token") === undefined) {
    //     return <Navigate to="/login" />
    // }

    // useEffect(() => {
    //     axios.get(`/customer/info/`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${cookies.get("token")}`
    //         }
    //     })
    //     .then(res => {
    //         const data = res.data;
    //         setData(data);
    //     })
    //     .catch(error => {
    //         alert(JSON.stringify(error));
    //     })
    // });

    return (
        <>
        <NavbarUser/>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            
            <div className="max-w-md w-full mx-auto justify-start">
                <div>
                    <h1 className="text-center text-4xl font-bold">Hi, </h1>
                </div>
                <div>
                    <h3 className="text-muted py-2 text-2xl text-center">Username : </h3>
                </div>
                <div>
                    <h3 className="text-muted text-2xl text-center">Balance : </h3>
                </div>
            </div>
        </div>
        </>
    )
}

export default Dashboard;