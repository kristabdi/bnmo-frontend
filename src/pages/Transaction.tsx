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
    id_to: number;
};

function TransactionForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({mode: "onChange"});
    const onSubmit = handleSubmit(async (data) => {
        // await axios.post('/api/request/', {
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // }).then((res: any) => {
        //     alert(JSON.stringify(`Login success!`));
        //     // redirect to user or admin dashboard
        // }).catch(error => {
        //     alert(JSON.stringify(`Login failed!`));
        // })
        console.log(data);
    })

    return (
        <>
        <NavbarUser/>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl text-center font-bold text-3xl text-gray-900 mt-2">Transaction</div>
            </div>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 shadow-sm rounded-md">
                    <div>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label className="text-left text-sm font-bold text-gray-600 block">Destination Account Number</label>
                                <input
                                    {...register("id_to", { required: 'Amount is required'})}
                                    placeholder="Input only number"
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                                />
                                {errors.id_to && <p className="text-left text-xs text-red-400">{errors.id_to.message}</p>}
                            </div>
                            <div>
                                <label className="text-left text-sm font-bold text-gray-600 block">Currency</label>
                                <select 
                                    className="border border-gray-300 rounded w-full p-1"
                                    {...register("currency", { required: 'Currency is required'})}
                                >
                                    {currencyOptions.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                                {errors.currency && <p className="text-left text-xs text-red-400">{errors.currency.message}</p>}
                            </div>
                            <div>
                                <label className="text-left text-sm font-bold text-gray-600 block">Amount</label>
                                <input
                                    {...register("amount", { required: 'Amount is required'})}
                                    placeholder="Input only number"
                                    type="number"
                                    className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                                />
                                {errors.amount && <p className="text-left text-xs text-red-400">{errors.amount.message}</p>}
                            </div>
                            <div>
                                <button type="submit" className="w-full p-2 bg-blue-700 hover:text-gray-900 hover:bg-blue-900 text-white font-bold py-2 rounded">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
        </>
    );
}

export default TransactionForm;