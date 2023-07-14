import { Logout, ShoppingCart } from "@mui/icons-material"
import { Avatar, Badge, Menu, MenuItem, Tooltip } from "@mui/material"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchUser } from "../../store/actions/userActions";
import React, { useState } from "react";
import { Link } from "react-router-dom";


export const Navbar = () => {
    const cart = useSelector((state: any) => state.cartItems.count);
    const user = useSelector((state: any) => state.user.user);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const dispatch = useDispatch<any>();
    return (
        <div className="p-5 d-flex justify-content-between align-items-center py-4">
            <Link style={{textDecoration: "none", color: "black"}} to="/"><h3>Weblight</h3></Link>
            <div className="d-flex justify-content-between align-items-center">
                <Tooltip title="cart"><Badge className="me-4" color="secondary" badgeContent={cart.toString()}><Link style={{textDecoration: "none", color: "black"}} to="/cart"><ShoppingCart /></Link></Badge></Tooltip>
                <Tooltip className="{me-4" title={user.email}>
                 <Avatar 
                     sx={{ cursor: 'pointer'}} 
                     id="basic-button"   
                     aria-controls={open ? 'basic-menu' : undefined}
                     aria-haspopup="true"
                     aria-expanded={open ? 'true' : undefined}
                     onClick={handleClick}
                    >
                        {user.name.charAt(0)}
                    </Avatar>
                </Tooltip>
                <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>{user.email}</MenuItem>
                <MenuItem><Link style={{textDecoration: "none", color: "black"}} to="/orders">Past Orders</Link></MenuItem>
                <MenuItem onClick={() => {window.localStorage.removeItem("token"); dispatch(fetchUser()) }}>Logout</MenuItem>
            </Menu>
            </div>
        </div>
    )
}