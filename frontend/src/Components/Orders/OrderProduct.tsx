import { Button, Card, CardMedia, TextField } from "@mui/material"
import Carousel from "react-material-ui-carousel"
import { DEV_STATIC_URL } from "../../config/url"
import { useState } from "react";
import { useMutation } from "react-query";
import axiosInstance from "../../config/axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { fetchCartItems } from "../../store/actions/cartItemsActions";
import { decreaseLoading, increaseLoading } from "../../store/actions/loadingActions";
import { useSelector } from "react-redux";

const OrderedProductCard = ({ orderedProduct }: any) => {

    const [quantity, setQuantity] = useState<number>(orderedProduct.quantity);

    let getDate = () => {
        let date = new Date(orderedProduct.createdAt);
        return date.toLocaleDateString();
    }

    return (
        <Card className="m-4 py-3" sx={{ maxWidth: 345, minWidth: 345, height: 500 }}>
            <Carousel
                navButtonsAlwaysVisible
            >
                {orderedProduct.productId.images.map((item: any, i: number) => (
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
                <h4 className="mx-auto mt-2">{orderedProduct.productId.name}</h4>
                <div className="d-flex align-items-center">
                    <span><b>Price:</b> </span>
                    <h6 className="ms-2" style={{ color: "gray", margin: 0 }}>{orderedProduct.productId.price * orderedProduct.quantity} Rs</h6>
                </div>

                <p className="mt-3" style={{ height: "50px", maxWidth: "300px", WebkitBoxOrient: "vertical", display: "-webkit-box", WebkitLineClamp: 2, overflow: "hidden", textOverflow: "ellipsis" }}>{orderedProduct.productId.description}</p>
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
                <div className="d-flex align-items-center mt-3">
                    <span><b>Date:</b> </span>
                    <span className="ms-2">{getDate()}</span>
                </div>
            </div>
        </Card>
    )
}

export default OrderedProductCard