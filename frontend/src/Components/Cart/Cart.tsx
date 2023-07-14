
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { SentimentDissatisfied } from "@mui/icons-material";
import CartProductCard from "./CartProduct";

export default function Cart(){

    const [cart, setCart] = useState<any>([]);
    const user = useSelector((state: any) => state.user.user)

    const cartQuery = useQuery({
        queryKey: "cart",
        queryFn: async () => {
            return await axiosInstance.get(`/cart`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                setCart(resp.data.data);
            }else{
                toast.error("Unable to fetch Cart")
            }
        },
        onError: (err :any) => {
            toast.error("Unable to fetch Cart")
        }
    })

    const refetch = () => {
        cartQuery.refetch();
    }

    return (
        <div className="w-100">
            
            {(cartQuery.isLoading || cartQuery.isFetching) && <div className="d-flex justify-content-center align-items-center mt-5 mb-3"><PulseLoader color='#36d7b7' /></div>}

            {cart.length > 0 && <div className="d-flex flex-wrap">
                {cart.map((cartProduct: any) => (
                    <CartProductCard key={cartProduct._id} cartProduct={cartProduct} />
                ))}
            </div>}

            {(cart.length === 0 && !cartQuery.isLoading && !cartQuery.isFetching) && <div className="d-flex justify-content-center align-items-center mt-5"><h3>No Products in Cart <SentimentDissatisfied /></h3></div>}
            
        </div>
    )
}