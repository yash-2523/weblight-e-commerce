import { Button, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import { useEffect, useState } from "react";
import "./register.css"
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";
import { useMutation } from "react-query";

export default function Register() {

    const user = useSelector((state: RootState) => state.user.user);
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [postalCode, setPostalCode] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const registerMutation = useMutation({
        mutationFn: async () => {
            return await axiosInstance.post("/auth/register", {
                email,
                password,
                name,
                address,
                city,
                state,
                postalCode,
                country
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                window.location.href = '/login';
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
        registerMutation.mutate();
    }

    return (
        <div className="d-flex justify-content-center align-items-center">
            {user===null && <div className="bg-light w-25 mt-5 py-4 px-5 shadow">
                <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center login-form">
                    <h1>Register</h1>
                    <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" required />
                    <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" required />
                    <TextField label="Address" value={address} onChange={(e) => setAddress(e.target.value)} variant="outlined" />
                    <TextField label="City" value={city} onChange={(e) => setCity(e.target.value)} variant="outlined" />
                    <TextField label="State" value={state} onChange={(e) => setState(e.target.value)} variant="outlined" />
                    <TextField label="Postal Code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} variant="outlined" />
                    <TextField label="Country" value={country} onChange={(e) => setCountry(e.target.value)} variant="outlined" />
                    <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" required />
                    <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required variant="outlined" />
                    <Button variant="contained" type="submit" disabled={password==="" || password!==confirmPassword || registerMutation.isLoading}>{registerMutation.isLoading ? "Loading..." : "Register"}</Button>
                    <p>Already Account? <a href="/login">Login</a></p>
                </form>
            </div>}
        </div>
    )
}