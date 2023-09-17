import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import api from "../clients/client"

type Form = {
    name: string;
    username: string;
    password: string;
    photo: File[];
};

function RegisterForm() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Form>({mode: "onChange"});
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("username", data.username);
        formData.append("password", data.password);
        formData.append("photo", data.photo[0]);

        fetch(api + "/auth/register", {
            method: "POST",
            mode: "cors",
            body:formData, 
            credentials: "include"
        }).then((res: any) => {
            navigate("/login")
            window.location.reload();
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
                                {...register("photo", { required: true })}
                                placeholder="Choose image"
                                type="file"
                                accept=".jpg, .jpeg, .png"
                                className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
                            />
                            {errors.photo && <p className="text-left text-xs text-red-400">{errors.photo.message}</p>}
                        </div>
                        <Link to="/login" className="text-right text-sm text-gray-600 block"> Already have an account? </Link>
                        <div>
                            <button type="submit" className="w-full p-2 bg-blue-700 hover:text-gray-900 hover:bg-blue-900 text-white font-bold py-2 rounded">Submit</button>
                        </div>
                    </form>
                </div>
        </div>
    );
}

export default RegisterForm;