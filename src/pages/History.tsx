import axios from "axios";
import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';
import NavbarUser from "../components/NavbarUser";
import { currencyOptions } from "../components/CurrencyOptions";

type FormData = {
    amount: number;
    currency: string;
    isAdd: boolean;
};

function History() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({mode: "onChange"});
    const onSubmit = handleSubmit(async (data) => {
        console.log(JSON.stringify(data));
    })

    return (
        <>
        <NavbarUser/>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl text-center font-bold text-3xl text-gray-900 mt-2">History</div>
            </div>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 shadow-sm rounded-md">
                </div>
        </div>
        </>
    );
}

export default History;