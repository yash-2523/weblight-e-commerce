
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import { SentimentDissatisfied } from "@mui/icons-material";
import OrderedProductCard from "./OrderProduct";

export default function Orders(){

    const [orders, setOrders] = useState<any>([]);
    const user = useSelector((state: any) => state.user.user)

    const orderQuery = useQuery({
        queryKey: "orders",
        queryFn: async () => {
            return await axiosInstance.get(`/orders`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                setOrders(resp.data.data);
            }else{
                toast.error("Unable to fetch Cart")
            }
        },
        onError: (err :any) => {
            toast.error("Unable to fetch Cart")
        }
    })

    return (
        <div className="w-100">
            
            {(orderQuery.isLoading || orderQuery.isFetching) && <div className="d-flex justify-content-center align-items-center mt-5 mb-3"><PulseLoader color='#36d7b7' /></div>}

            {orders.length > 0 && <div className="d-flex flex-wrap">
                {orders.map((orderedProduct: any) => (
                    <OrderedProductCard key={orderedProduct._id} orderedProduct={orderedProduct} />
                ))}
            </div>}

            {(orders.length === 0 && !orderQuery.isLoading && !orderQuery.isFetching) && <div className="d-flex justify-content-center align-items-center mt-5"><h3>No Orders found <SentimentDissatisfied /></h3></div>}
            
        </div>
    )
}