import React, { useEffect, useState } from "react"
import axios from "axios"
import { useCookies } from "react-cookie"
import { Navigate } from "react-router-dom"
import NavbarUser from "../components/NavbarUser"

function Dashboard() {
    const [cookies, setCookie] = useCookies();

    if (cookies.get("token") === undefined) {
        return <Navigate to="/login" />
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <NavbarUser/>
            <div className="max-w-md w-full mx-auto">
                <div>
                    <h1 className="text-center font-bold">{cookies.get("name")}</h1>
                </div>
                <div>
                    <h3 className="text-muted text-center">{cookies.get("email")}</h3>
                </div>
                <div>
                    <h3 className="text-muted text-md text-center">{cookies.get("balance")}</h3>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;