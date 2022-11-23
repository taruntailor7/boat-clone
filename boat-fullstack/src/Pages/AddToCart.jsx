import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { MainModal } from '../payment_page1/Main_Modal';
import { CartProduct } from './CartProduct';


export const AddToCart = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [navigate,setNavigate] = useState(0)
    const [cartProduct, setCartProduct] = useState([])
    const [cartItems, setCartItems] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    let userId = localStorage.getItem("userId");
    const getProducts = ()=>{
        fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/cart`)
        .then(res=>res.json())
        .then(res=>{
            setCartProduct(res)
            setCartItems(res.length)
        })
        .catch(err=>console.log(err))
    }

    const getCartTotal = ()=>{
        let val=0;
        for(let i=0;i<cartProduct.length;i++){
            val+=cartProduct[i].price;
        }
        setCartTotal(val)
        // console.log(val,"inside val")
    }


    useEffect(() =>{
        getProducts();
        getCartTotal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[cartProduct,cartTotal])


    let isAuth = localStorage.getItem('isAuth') || false;
   
    const handleClick = () => {
        if(isAuth==="false"){
            setNavigate(1)
        }
        else{
            onOpen()
        }
    }

    const handleDelete = (id)=>{
        console.log(id,"delete id")
        console.log("delete called")
        fetch(`https://boat-lifestyle.herokuapp.com/cart/${id}`,{
            method: 'DELETE'
        })
        // getProducts();
    }

    const handleIncrease = (id,cartId,ProductPrice,count) => {
        let OrgPrice = 0;
        let obj = {
            price:0,
            count:1,
        }
        fetch(`https://boat-lifestyle.herokuapp.com/mainProducts/${cartId}`)
        .then(res=>res.json())
        .then(res=>{
            OrgPrice = res.price;
            console.log(res.price,"rrr")
            obj = {
                price:ProductPrice+OrgPrice,
                count:count+1
            }
        })
       .then (()=>fetch(`https://boat-lifestyle.herokuapp.com/cart/${id}`,{
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers : {
                'Content-Type': 'application/json'
            }
        }))
    }
    const handleDecrease = (id,cartId,ProductPrice,count) => {
        if(count===1){
            handleDelete(id);
            return
        }
        let OrgPrice = 0;
        let obj = {
            price:0,
            count:1,
        }
        fetch(`https://boat-lifestyle.herokuapp.com/mainProducts/${cartId}`)
        .then(res=>res.json())
        .then(res=>{
            OrgPrice = res.price;
            console.log(res.price,"rrr")
            obj = {
                price:ProductPrice-OrgPrice,
                count:count-1
            }
        })
       .then (()=>fetch(`https://boat-lifestyle.herokuapp.com/cart/${id}`,{
            method: 'PATCH',
            body: JSON.stringify(obj),
            headers : {
                'Content-Type': 'application/json'
            }
        }))
    }

    const handleOrders = ()=>{
        fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/cart`)
        .then(res=>res.json())
        .then((res)=>{
           res.map( (product)=>{
                let obj = {
                    cartId: product.id,
                    count:1,
                    name: product.name,
                    category: product.category,
                    rating: product.rating,
                    reviews: product.reviews,
                    price: product.price,
                    original_price: product.original_price,
                    discount: product.discount,
                    isAvailable: product.isAvailable,
                    image: [
                    product.image[0],
                    product.image[1],
                    product.image[2]
                    ],
                    color: [
                    product.color[0],
                    product.color[1],
                    product.color[2]
                    ],
                    "userId": userId,
                }
                 fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/orders`,{
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers : {
                        'Content-Type': 'application/json'
                    }
                })
                .then(()=>handleDelete(product.id))
                .catch(err=>console.log(err))
                
           })
        })
        .catch(err=>console.log(err))
        
    }

    if(navigate===1){
        return <Navigate to='/login'/>
    }


    return (

        <>
        <Text onClick={() => handleClick()}>
            ADD TO CART
        </Text>

        <Drawer onClose={onClose}  isOpen={isOpen} size="sm" border="1px solid black">
            <DrawerOverlay />
            <DrawerContent>
            <DrawerCloseButton color="white" _hover={{ bg: "red" }} _active={{ bg: "red" }}fontSize="14px" />
            <DrawerHeader bg="red" color="white" p={2}>Your Cart ({cartItems} items)</DrawerHeader>
            <Text bg="black" p={2} color="white" fontSize="15px">Free Shipping sitewide | Cash On Delivery available for order value upto ₹3000</Text>
            { isAuth==="true" ? 
            cartItems!==0 ?
                <>
                <DrawerBody  bg="#ececec" p={0} scrollbar-width="thin">
                    <CartProduct  handleDecrease={handleDecrease} handleIncrease={handleIncrease}  cartProduct={cartProduct} handleDelete={handleDelete}/>
                </DrawerBody>
                <Box height="235px"p={5}>
                    <Box display="flex" justifyContent="space-between">
                        <Text fontSize="22px" fontWeight="500" mt={5}>Shipping:</Text>
                        <Text fontSize="22px" fontWeight="500" mt={5}>FREE</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                        <Text fontSize="22px" fontWeight="500" mt={5}>Total:</Text>
                        <Text fontSize="22px" fontWeight="500" mt={5}>Rs. {cartTotal}</Text>
                    </Box>
                    <MainModal handleOrders={handleOrders} cartProduct={cartProduct} cartTotal={cartTotal}/>
                    {/* <Button mt={10} width="100%" height="50px" fontSize="20px" bg="red" color="white" colorScheme="red">Place Order</Button> */}
                </Box>
            </> : <Box width="100%" textAlign="center" marginTop="300px">
                    <Text fontSize="20px">Your cart is empty</Text>
                    <NavLink  to="/collections/products" >
                        <Button onClick={()=>onClose()} bg="red" colorScheme="red" color="white" fontSize="20px" _hover={{color: "black"}} px={10} py={8} mt={10}>Start Shopping</Button>
                    </NavLink>
                </Box>
             : 
             <Box width="100%" textAlign="center" marginTop="300px">
                <Text fontSize="20px">Your cart is empty</Text>
                <NavLink  to="/collections/products" >
                    <Button onClick={()=>onClose()} bg="red" colorScheme="red" color="white" fontSize="20px" _hover={{color: "black"}} px={10} py={8} mt={10}>Start Shopping</Button>
                </NavLink>
            </Box>
            }
            </DrawerContent>
        </Drawer>
        </>
    )
}
