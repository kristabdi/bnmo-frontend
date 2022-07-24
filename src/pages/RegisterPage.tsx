import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

type FormData = {
    name: string;
    username: string;
    password: string;
    idcard: File;
};

function RegisterForm() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({mode: "onChange"});
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        fetch("http://localhost:3001/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name: data.name,
                username: data.username,
                password: data.password,
                idcard: data.idcard
            }),
            credentials: "include"
        }).then((res: any) => {
            setSuccess(true);
            return navigate("/login")
        }).catch(error => {
            alert(error);
        })
    })

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
                <div className="text-3xl text-center font-bold text-3xl text-gray-900 mt-2">Sign Up</div>
            </div>
                <div className="max-w-md w-full mx-auto mt-4 bg-white p-8 shadow-sm rounded-md">
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div>
                        <label className="text-left text-sm font-bold text-gray-600 block">Name</label>
                            <input
                                {...register("name", { required: true})}
                                placeholder="Name"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.name && <p className="text-left text-xs text-red-400">{errors.name.message}</p>}
                        </div>
                        <div>
                        <label className="text-left text-sm font-bold text-gray-600 block">Username</label>
                            <input
                                {...register("username", { required: true, pattern: /^[a-zA-Z0-9]+([a-zA-Z0-9](_|-| )[a-zA-Z0-9])*[a-zA-Z0-9]+$/ })}
                                placeholder="Username"
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.username && <p className="text-left text-xs text-red-400">{errors.username.message}</p>}
                        </div>
                        <div>
                            <label className="text-left text-sm font-bold text-gray-600 block">Password</label>
                            <input
                                {...register("password", { required: true, minLength: 6 })}
                                placeholder="Password"
                                type="password"
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.password && <p className="text-left text-xs text-red-400">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label className="text-left text-sm font-bold text-gray-600 block">ID Card / KTP</label>
                            <input
                                {...register("idcard", { required: true })}
                                placeholder="Choose image"
                                type="file"
                                onChange={(e) => {
                                    if (e.target?.files && (e.target.files[0].type !== "image/png" && e.target.files[0].type !== "image/jpg" && e.target.files[0].type !== "image/jpeg")) {
                                        setError('idcard', {
                                            type: 'manual',
                                            message: 'Please upload a valid image file (png/jpeg/jpg).'
                                        });
                                    }
                                }}
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.idcard && <p className="text-left text-xs text-red-400">{errors.idcard.message}</p>}
                        </div>
                        <Link to="/login" className="text-right text-sm text-gray-600 block"> Already have an account? </Link>
                        <div>
                            <button type="submit" className="w-full p-2 bg-blue-700 hover:text-gray-900 hover:bg-blue-900 text-white font-bold py-2 rounded">Submit</button>
                        </div>
                        {!success && <p className='text-warning'>{errMsg}</p>}
                    </form>
                </div>
        </div>
    );
}

export default RegisterForm;