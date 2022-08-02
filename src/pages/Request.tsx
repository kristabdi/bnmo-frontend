import { useForm } from "react-hook-form";
import NavbarUser from "../components/NavbarUser";
import { currencyOptions } from "../components/CurrencyOptions";
import Cookies from 'js-cookie';

type Form = {
    amount: number;
    currency: string;
    is_add: string;
};

function RequestForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Form>();

    const onSubmit = handleSubmit((data) => {
        let uri = "";
        let is_add = (data.is_add === "true") ? true : false;
        if (!is_add) {
            uri = "http://localhost:3001/customer/withdraw";
        } else {
            uri = "http://localhost:3001/customer/deposit";
        }
        fetch(uri, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("access_token")}`
            },
            body:JSON.stringify({
                amount: parseInt((data.amount).toString()),
                currency: data.currency,
                is_add: is_add,
                is_approved: false
            }),
            credentials: "include"
        }).then((response :any) => {
            if (response.ok) {
                alert("Request success!");
                window.location.reload();
            }
        })
        .catch(error => {
            alert(error);
        })
    })

    return (
        <>
        <NavbarUser/>
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl text-center font-bold text-3xl text-gray-900 mt-2">Request</div>
            </div>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 shadow-sm rounded-md">
                    <div>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div>
                                <label className="text-left text-sm font-bold text-gray-600 block">Method</label>
                                <select 
                                    className="border border-gray-300 rounded w-full p-1"
                                    {...register("is_add", { required: 'Method is required'})}
                                >
                                    <option value="">not selected</option>
                                    <option value="false">Withdraw</option>
                                    <option value="true">Deposit</option>
                                </select>
                                {errors.is_add && <p className="text-left text-xs text-red-400">{errors.is_add.message}</p>}
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

export default RequestForm;