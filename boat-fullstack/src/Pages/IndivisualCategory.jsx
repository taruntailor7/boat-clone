/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Grid, GridItem, Heading, Image, Select, Text } from '@chakra-ui/react';
import Axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { AiFillStar, AiFillThunderbolt } from 'react-icons/ai';
import { NavLink, useParams, useSearchParams } from 'react-router-dom';
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

export const IndivisualCategory = () => {
    const [bannerImg, setBannerImg] = useState("")
    const [heading, setHeading] = useState("")
    const [products, setProducts] = useState([])
    const [searchParam, setSearchParam] = useSearchParams();

    const [sortByAlpha, setSortByAlpha] = useState("")
    const [sortByAlphaName, setSortByAlphaName] = useState("")

    const [sortByPrice, setSortByPrice] = useState(searchParam.get("sortByPrice"))
    const [sortByPriceName, setSortByPriceName] = useState(searchParam.get("sortByPriceName"))

    const [minValue, setMinValue] = useState(searchParam.get("minValue"))
    const [maxValue, setMaxValue] = useState(searchParam.get("maxValue"))

    const { loading  }=useSelector((state)=>state)
    const dispatch = useDispatch();

    const {url} = useParams();
    const {id} = useParams();

    const [cartProduct, setCartProduct] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    let fetchUrl = "https://boat-lifestyle.herokuapp.com/shopByCategory"
    if(url==="true-wireless-earbuds"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/airdopesTrueWireless"
    }
    else if(url==="bluetooth-wireless-headphones"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/rockerzWireless"
    }
    else if(url==="smart-watches"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/smartWatches"
    }
    else if(url==="wired-headphones"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/rockerzWireless"
    }
    else if(url==="bluetooth-speakers"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/stoneSpeakers"
    }
    else if(url==="home-audio"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/aavante"
    }
    else if(url==="mobile-accessories"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/mobileAccessories"
    }
    else if(url==="trebel-for-women"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/tRebel"
    }
    else if(url==="limited-edition"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/limitedEdition"
    }
    else if(url==="misfit-by-boat"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/misfitTrimmers"
    }
    else if(url==="immortal-gaming"){
        fetchUrl = "https://boat-lifestyle.herokuapp.com/immortalGaming"
    }
    // else if(url===""){
    //     fetchUrl = "http://localhost:3001/shopByCategory"
    // }

    // http://localhost:3001/allProducts?original_price_gte=3000&original_price_lte=5000

    const getData = ({_sort, _order, price_gte, price_lte  }) => {
        dispatch(get_loading());
        Axios.get(fetchUrl, {
            params: { _sort, _order, price_gte, price_lte}
        })
        .then((res) =>{
            setProducts(res.data)
            setBannerImg(res.data[0].bannerImge)
            setHeading(res.data[1].heading)
            dispatch(get_suceess())
        });
    };
    const updatedProducts = products.filter((elem)=>{
        return elem.id !==1001 && elem.id !==1002;
    })
    
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
        // dispatch(get_loading());
        fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/cart`,{
          method: 'POST',
          body: JSON.stringify(prod),
          headers : {
              'content-type': 'application/json'
          }
        })
        // dispatch(get_suceess())
  
      }
    }

    const handleChangeForAlpha = (e) => {
        setSortByAlpha(e.target.value)
        setSortByAlphaName(e.target.name)
    }
    const handleChangeForPrice= (e) => {
        setSortByPrice(e.target.value)
        setSortByPriceName(e.target.name)
    }

    const handleFilter = (sliderValue)=>{
        setMinValue(sliderValue[0]);
        setMaxValue(sliderValue[1]);
        // console.log(sliderValue);
    }
 
 
    // const getData = ()=>{
    //     fetch(fetchUrl)
    //     .then(res=>res.json())
    //     .then((res)=>{
    //         setProducts(res)
    //         setBannerImg(res[0].bannerImge)
    //         setHeading(res[1].heading)
    //     })
    //     .catch(err=>console.log(err))
    // }

    useEffect(()=>{
        if(minValue!=="" && maxValue!=="" && sortByPrice !== "" ){
           getData({
               _sort : sortByPriceName,
               _order : sortByPrice,
               price_gte:minValue,
               price_lte:maxValue
           });
        }
        // else if(sortByAlpha !== ""){
        //     getData({
        //      _sort : sortByAlphaName,
        //      _order : sortByAlpha
        //     });
        //  }
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
    },[products,sortByPrice,sortByPriceName,minValue,maxValue])

   
    let price = 0;
    
    return (
        <Box mb={10}>
            <Box marginTop={{base:"-85px",sm:"-85px",md:"-85px",lg:"90px"}}>
                <Image marginTop="90px" src={bannerImg}  /> 
            </Box>
            <Box width="95%" margin="auto" marginTop={{base:"10px",sm:"10px",md:"10px",lg:"30px"}}>
                <Text fontWeight="500" fontSize={{base:"30px",sm:"35px",md:"45px",lg:"55px"}}>{heading}</Text>
                <Box width='100%' mt={8} display={{ base:'block' ,sm:'block' ,md:'flex' ,lg:'flex' }} justifyContent="space-between" >
                    <Filter  handleFilter={handleFilter} /> 
                    <Sorting handleChangeForAlpha={handleChangeForAlpha} handleChangeForPrice={handleChangeForPrice} />
                    {/* <Box  display="flex" justifyContent="space-between" width="14%">
                            <Text fontSize="17px" display="flex" alignItems="center" width="30%">Sort by</Text>
                            <Select variant='unstyled' placeholder='Featured' width="55%" mt={6}>
                                <option value='option1'>Option 1</option>
                                <option value='option2'>Option 2</option>
                                <option value='option3'>Option 3</option>
                            </Select>
                        </Box> */}
                    </Box>
                <Grid width="100%" margin="auto"  gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
                templateColumns={{base:"repeat(auto-fill,minmax(300px,1fr))",   sm:"repeat(auto-fill,minmax(300px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(4, 1fr)"}} gap={6} marginTop={{base:"50px",sm:"25px",md:"30px",lg:"50px"}}>
                    {updatedProducts.map((data)=>(
                        <GridItem position='relative' key={data.id} w='100%' bg='#e3e3e3' borderRadius="10px" p={2} >
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
                        <Button  w="100%" onClick={()=>addToCart(data,data.id)} colorScheme={data.isSuperSaver?"#F7C20A":"#ff0000"} bg={data.isSuperSaver?"#F7C20A":"#ff0000"} size='md'>
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
