import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { useEffect, useState } from "react";
import "./login.css"
import { useDispatch } from "react-redux";
import { decreaseLoading, increaseLoading } from "../../store/actions/loadingActions";
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";
import { fetchUser } from "../../store/actions/userActions";
import { useMutation } from "react-query";

export default function Login() {

    const user = useSelector((state: RootState) => state.user.user);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const dispatch = useDispatch<any>();

    const loginQuery = useMutation({
        mutationFn: async () => {
            return await axiosInstance.post("/auth/login", {
                email,
                password
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                window.localStorage.setItem("token", resp.data.token);
                dispatch(fetchUser());
                toast.success(resp.data.message);
            }else{
                toast.error(resp.data.message);
            }
        },
        onError: (err: any) => {
            toast.error("Something went wrong!");
        }
    })
    
    useEffect(() => {
        if(user !== null) window.location.href = '/'
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginQuery.mutate();
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            {user===null && <div className="bg-light mt-5 py-4 px-5 shadow">
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center login-form">
                    <h1>Login</h1>
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" required />
                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" required />
                    <Button variant="contained" disabled={loginQuery.isLoading} type="submit">{loginQuery.isLoading ? "Loading..." : "Login"}</Button>
                    <a href="/register">Create Account</a>
                </form>
            </div>}
        </div>
    )
}