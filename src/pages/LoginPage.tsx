import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import api from "../clients/client"

type FormData = {
    username: string;
    password: string;
};

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({mode: "onChange"});
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        fetch(api + "/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                username: data.username,
                password: data.password
            }),
            credentials: "include"
        }).then(response => response.json())
        .then((data:any) =>{
            const token = document.cookie
                .split("; ")
                .filter((row:any) => row.startsWith('access_token=')).map((c:any)=>c.split('=')[1])[0] || "";
            Cookies.set("access_token", token, { path: "/" });
            Cookies.set("is_admin", data.is_admin);
            Cookies.set("username", data.username);
            if (data.is_admin) {
                window.location.href = "/userverif";
                navigate("/userverif")
                window.location.reload();
            } else {
                window.location.href = "/dashboard";
                navigate("/dashboard")
                window.location.reload();
            }
        }).catch(error => {
            alert(error);
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
                        <label className="text-left text-sm font-bold text-gray-600 block">Username</label>
                            <input
                                {...register("username", { required: true, pattern: /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/ })}
                                placeholder="Username"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.username && <p className="text-left text-xs text-red-400">Username is invalid</p>}
                        </div>
                        <div>
                            <label className="text-left text-sm font-bold text-gray-600 block">Password</label>
                            <input
                                {...register("password", { required: true, minLength: 5 })}
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
                    </form>
                </div>
        </div>
    );
}

export default LoginForm;