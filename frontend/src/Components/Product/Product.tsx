import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axiosInstance from "../../config/axios";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";
import ProductCard from "./ProductCard";
import { SentimentDissatisfied } from "@mui/icons-material";

export default function Product(){

    const [category, setCategory] = useState<string>('');
    const [minPrice, setMinPrice] = useState<Number>(0);
    const [maxPrice, setMaxPrice] = useState<Number>(100000000);
    const [products, setProducts] = useState<any>([]);
    const [categories, setCategories] = useState<[]>([]);
    const user = useSelector((state: any) => state.user.user)

    const categoryQuery = useQuery({
        queryKey: "categories",
        queryFn: async () => {
            return await axiosInstance.get("/categories", {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                setCategories(resp.data.data);
            }else{
                toast.error("Unable to fetch Categories")
            }
        },
        onError: (err :any) => {
            toast.error("Unable to fetch Categories")
        }
    })

    const productsQuery = useQuery({
        queryKey: "products",
        queryFn: async () => {
            return await axiosInstance.get(`/products?${category!=="" ? "category="+category : ""}&minPrice=${minPrice}&maxPrice=${maxPrice}`, {
                headers: {
                    Authorization: `Bearer ${user.token}`
                },
            })
        },
        onSuccess: (resp: any) => {
            if(resp.data.success){
                setProducts(resp.data.data);
            }else{
                toast.error("Unable to fetch Products")
            }
        },
        onError: (err :any) => {
            toast.error("Unable to fetch Products")
        }
    })

    const handleFilter = () => {
        productsQuery.refetch();
    }

    return (
        <div className="w-100">
            <div className="d-flex justify-content-center align-items-center"><h1 className="mx-auto mb-3">Prducts</h1></div>
            <Accordion className="bg-light mx-4">
                <AccordionSummary><h4>Filters</h4></AccordionSummary>
                <AccordionDetails className="d-flex flex-column align-items-center">
                    <div className="d-flex align-items-center mt-3">
                        <h5 className="me-3">Category: </h5> 
                        <TextField 
                            select
                            SelectProps={{
                                native: true,
                            }}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            variant="outlined"
                        >
                            <option value={''}>All</option>
                            {categories.map((category: any) => (
                                
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </TextField>
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <h5 className="me-3">Min Price: </h5> 
                        <TextField 
                            type="number"
                            value={minPrice}
                            onChange={(e) => setMinPrice(parseFloat(e.target.value))}
                            variant="outlined"
                        />
                    </div>

                    <div className="d-flex align-items-center mt-3">
                        <h5 className="me-3">Max Price: </h5> 
                        <TextField 
                            type="number"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(parseFloat(e.target.value))}
                            variant="outlined"
                        />
                    </div>
                    <Button variant="contained" className="mt-3" onClick={handleFilter}>Apply</Button>
                </AccordionDetails>
            </Accordion>
            
            {(productsQuery.isLoading || productsQuery.isFetching) && <div className="d-flex justify-content-center align-items-center mt-5 mb-3"><PulseLoader color='#36d7b7' /></div>}

            {products.length > 0 && <div className="d-flex flex-wrap">
                {products.map((product: any) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </div>}

            {(products.length === 0 && !productsQuery.isLoading) && <div className="d-flex justify-content-center align-items-center mt-5"><h3>No Products <SentimentDissatisfied /></h3></div>}
            
        </div>
    )
}