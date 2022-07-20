import axios from "axios";
import React, { useState }  from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

type FormData = {
    email: string;
    password: string;
};

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({mode: "onChange"});
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [cookies, setCookie] = useCookies();

    const onSubmit = handleSubmit(async (data) => {
        await axios.post('/api/login/', {
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }).then((res: any) => {
            setSuccess(true);
            alert(JSON.stringify(`Login success!`));
            cookies.set("token", res.access_token);
            cookies.set("email", res.data.email);
            cookies.set("name", res.data.name);
            cookies.set("balance", res.data.balance);
            // redirect to user or admin dashboard
        }).catch(error => {
            setErrMsg("Login Failed!");
        })
    })

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl text-center font-bold text-3xl text-gray-900 mt-2">Login</div>
            </div>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 shadow-sm rounded-md">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                        <label className="text-left text-sm font-bold text-gray-600 block">Email</label>
                            <input
                                {...register("email", { required: true, pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i })}
                                placeholder="Email"
                                type="email"
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.email && <p className="text-left text-xs text-red-400">Email is invalid</p>}
                        </div>
                        <div>
                            <label className="text-left text-sm font-bold text-gray-600 block">Password</label>
                            <input
                                {...register("password", { required: true, minLength: 6 })}
                                placeholder="Password"
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.password && <p className="text-left text-xs text-red-400">Password is invalid</p>}
                        </div>
                        <Link to="/register" className="text-right text-sm text-gray-600 block"> Sign Up </Link>
                        <div>
                            <button type="submit" className="w-full p-2 bg-blue-700 hover:text-gray-900 hover:bg-blue-900 text-white font-bold py-2 rounded">Submit</button>
                        </div>
                        {!success && <p className='text-warning'>{errMsg}</p>}
                    </form>
                </div>
        </div>
    );
}

export default LoginForm;