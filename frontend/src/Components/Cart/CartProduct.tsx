import { Button, Card, CardMedia, TextField } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { DEV_STATIC_URL } from "../../config/url"
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../../config/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCartItems } from "../../store/actions/cartItemsActions";
import { decreaseLoading, increaseLoading } from "../../store/actions/loadingActions";
import { useSelector } from "react-redux";

const CartProductCard = ({ cartProduct }: any) => {

    const [quantity, setQuantity] = useState<number>(cartProduct.quantity);
    const user = useSelector((state: any) => state.user.user);
    const queryClient = useQueryClient();
    const dispatch = useDispatch<any>();

    const cartMutation = useMutation({
        mutationFn: async () => {
            dispatch(increaseLoading())
            return await axiosInstance.post("/cart", {
                productId: cartProduct.productId._id,
                quantity
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                toast.success(resp.data.message);
                dispatch(fetchCartItems());
            }else{
                toast.error(resp.data.message);
            }
            dispatch(decreaseLoading())
        },
        onError: (err: any) => {
            toast.error("Something went wrong!");
            dispatch(decreaseLoading())
        }
    })

    const orderMutation = useMutation({
        mutationFn: async () => {
            dispatch(increaseLoading())
            return await axiosInstance.post("/orders", {
                cartId: cartProduct._id,
            }, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                toast.success(resp.data.message);
                dispatch(fetchCartItems());
                queryClient.refetchQueries("cart");
            }else{
                toast.error(resp.data.message);
            }
            dispatch(decreaseLoading())
        },
        onError: (err: any) => {
            toast.error("Something went wrong!");
            dispatch(decreaseLoading())
        } 
    })

    return (
        <Card className="m-4 py-3" sx={{ maxWidth: 345, minWidth: 345, height: 500 }}>
            <Carousel
                navButtonsAlwaysVisible
            >
                {cartProduct.productId.images.map((item: any, i: number) => (
                    <CardMedia
                        key={i}
                        className="mx-auto"
                        component="img"
                        height={140}
                        sx={{ maxHeight: 140, width: "auto" }}
                        image={`${DEV_STATIC_URL}/static/uploads/${item.fileName}`}
                        alt="green iguana"
                    />
                ))
                }
            </Carousel>
            <div className="d-flex flex-column px-4">
                <h4 className="mx-auto mt-2">{cartProduct.productId.name}</h4>
                <div className="d-flex align-items-center">
                    <span><b>Price:</b> </span>
                    <h6 className="ms-2" style={{ color: "gray", margin: 0 }}>{cartProduct.productId.price} Rs</h6>
                </div>

                <p className="mt-3" style={{ height: "50px", maxWidth: "300px", WebkitBoxOrient: "vertical", display: "-webkit-box", WebkitLineClamp: 2, overflow: "hidden", textOverflow: "ellipsis" }}>{cartProduct.productId.description}</p>
                <div className="d-flex align-items-center mt-3">
                    <span><b>Quantity:</b> </span>
                    <TextField
                        size="small"
                        className="ms-2"
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        variant="outlined"
                    />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                    <Button variant="contained" color="primary" onClick={() => cartMutation.mutate()}>Update Cart</Button>
                    <Button variant="contained" className="mt-2" color="warning" onClick={() => orderMutation.mutate()}>Purchase this Cart</Button>
                </div>
            </div>
        </Card>
    )
}

export default CartProductCard