import { useEffect } from "react";
import Register from "../Components/Register/Register";
import { useSelector } from "react-redux";

export default function RegisterPage() {

    const user = useSelector((state: any) => state.user.user);

    useEffect(() => {
        if(user === null) window.location.href = '/login'
    }, [user])

    return (
        <Register />
    )
}