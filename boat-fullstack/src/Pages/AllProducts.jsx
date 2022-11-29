import { Box, Button, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import Axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiFillStar, AiFillThunderbolt } from 'react-icons/ai';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Filter } from './Filter';
import { Sorting } from './Sorting';
import { AddToCart } from './AddToCart'
import { useDispatch, useSelector } from 'react-redux';
import { get_loading, get_suceess } from '../Redux App/action';
import { Navigate } from 'react-router-dom'
import { 
    AlertDialog, 
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
  } from '@chakra-ui/react';

export const AllProducts = () => {
    const [products, setProducts] = useState([])
    const [searchParam, setSearchParam] = useSearchParams();

    const [sortByPrice, setSortByPrice] = useState(searchParam.get("sortByPrice"))
    const [sortByPriceName, setSortByPriceName] = useState(searchParam.get("sortByPriceName"))

    const [minValue, setMinValue] = useState(searchParam.get("minValue"))
    const [maxValue, setMaxValue] = useState(searchParam.get("maxValue"))

    const { loading  }=useSelector((state)=>state)
    const dispatch = useDispatch();
    const [cartProduct, setCartProduct] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getData = ({_sort, _order, price_gte, price_lte  }) => {
        dispatch(get_loading());
        Axios.get(`https://boat-lifestyle.herokuapp.com/mainProducts`, {
            params: { _sort, _order, price_gte, price_lte}
        })
        .then((res) =>{
            setProducts(res.data)
            dispatch(get_suceess())
        });
    };

    let userId = localStorage.getItem("userId");
    const getProducts = ()=>{
        fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/cart`)
        .then(res=>res.json())
        .then(res=>{
            setCartProduct(res)
        })
        .catch(err=>console.log(err))
    }

    let isAuth = localStorage.getItem('isAuth') || false;
    userId = localStorage.getItem("userId") || false;

    const addToCart = (product,id)=>{
        getProducts();
        for(let i=0;i<cartProduct.length;i++){
          if(cartProduct[i].cartId === id){
            console.log(id,"id");
            console.log(cartProduct[i].cartId,"Cartid");
            onOpen()
            // alert("Already added in cart!")
            // getProducts();
            return;
          }
        }
        let prod = {
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
             ]
           }
         if(isAuth==="false"){
           // alert("please login")
           return <Navigate to='/login'/>
         }
         else{
        //    dispatch(get_loading());
           fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/cart`,{
             method: 'POST',
             body: JSON.stringify(prod),
             headers : {
                 'content-type': 'application/json'
             }
           })
        //    dispatch(get_suceess())
     
         }
       }

       const handleChangeForPrice= (e) => {
           setSortByPrice(e.target.value)
           setSortByPriceName(e.target.name)
       }
   
       const handleFilter = (sliderValue)=>{
           setMinValue(sliderValue[0]);
           setMaxValue(sliderValue[1]);
           console.log(sliderValue);
       }

       useEffect(()=>{
        if(minValue!=="" && maxValue!=="" && sortByPrice !== "" ){
           getData({
               _sort : sortByPriceName,
               _order : sortByPrice,
               price_gte:minValue,
               price_lte:maxValue
           });
        }
        else if(sortByPrice !== ""){
            getData({
             __sort : sortByPriceName,
             _order : sortByPrice,
             price_gte:399,
             price_lte:10000
            });
        }
        else if(minValue!=="" && maxValue!=="" ){
            getData({
                _sort:"",
                _order:"",
                price_gte:minValue,
                price_lte:maxValue
            });
        }
        else{
            getData({
                _sort:"",
                _order:"",
                price_gte:399,
                price_lte:10000
            });
        }
        setSearchParam({sortByPrice, sortByPriceName,minValue,maxValue})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[products,sortByPrice,sortByPriceName,minValue,maxValue])



    return (
        <Box mb={10}>
            <Box width="95%" margin="auto" marginTop={{base:"25px",sm:"35px",md:"40px",lg:"120px"}}>
                <Text fontWeight="500" fontSize={{base:"30px",sm:"35px",md:"45px",lg:"55px"}}>Products</Text>

                <Box mt={8} display="flex" justifyContent="space-between" >
                    <Filter handleFilter={handleFilter} /> 
                    <Sorting handleChangeForPrice={handleChangeForPrice} />
                </Box>

                <Grid width="100%" margin="auto" templateColumns={{base:"repeat(1, 1fr)", sm:"repeat(2, 1fr)", md:"repeat(3, 1fr)", lg:"repeat(4, 1fr)"}} gap={6} marginTop="30px">
                    {products.map((data)=>(
                        <GridItem data-aos="fade-up" key={data.id} w='100%' bg='#e3e3e3' borderRadius="10px" p={2} >
                        {data.isSuperSaver?<Button bg="#F7C20A" colorScheme="#F7C20A" color="black" position="absolute" px={1}> <AiFillThunderbolt /> Super Saver</Button>:""}
                        <NavLink color="black" to={`/collections/products/${data.id}/${data.name}`} key={data.id}>
                            <Box width="100%" p={5}> 
                            <Image width="100%" src={data.image[0]} alt="image" />
                            </Box>
                        </NavLink>
                        <Box w="100%" bg='white' p={3} borderRadius="10px">
                        <Text fontSize="18px" fontWeight="500">{data.name.length>19 ? data.name.slice(0, 19-1)+'...' : data.name}</Text>
                        <Text display="flex" alignItems="center" my={2}><AiFillStar color="#ff0000" margin="10px"/> {data.rating} | {data.reviews} reviews</Text>
                        <hr />
                        <Box display="flex" >
                            <Text color="#ff0000" fontWeight='500'> ₹ { data.price }</Text>
                            <Text as="s" ml={2}> ₹ {data.original_price}</Text>
                        </Box>
                        <Text my={2}>You Save: ₹ {Math.ceil(data.original_price*(data.discount/100)) } ({data.discount}%)</Text>
                        <Button w="100%" onClick={()=>addToCart(data,data.id)} colorScheme={data.isSuperSaver?"#F7C20A":"#ff0000"} bg={data.isSuperSaver?"#F7C20A":"#ff0000"} size='md'>
                            <AddToCart />
                        </Button>
                        </Box>
                    </GridItem>
                    ))}
                </Grid>
                <AlertDialog
                    isOpen={isOpen}
                    // leastDestructiveRef={cancelRef}
                    onClose={onClose}
                    >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        ALert!!!
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Text>Product already added in the cart you can increase the quantity.</Text>
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button colorScheme='red' onClick={()=>onClose()} ml={3}>
                            Okay
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Box>
        </Box>
    )
}
