import { Box, Button, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiFillThunderbolt } from 'react-icons/ai'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux';
import { get_loading, get_suceess } from '../Redux App/action';
import { Navigate } from 'react-router-dom'
import { AddToCart } from './AddToCart'
import { 
  AlertDialog, 
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { NavLink } from 'react-bootstrap';

export const HomeCatchMeAll = () => {
    const [bestOfBoat, setBestOfBoat] = useState([]);
    const { loading  }=useSelector((state)=>state)
    const dispatch = useDispatch();
    const [cartProduct, setCartProduct] = useState([])
    const { isOpen, onOpen, onClose } = useDisclosure()

    const getData = ()=>{
        dispatch(get_loading());  
        fetch(`https://boat-lifestyle.onrender.com/catchMeAll`)
        .then((res)=>res.json())
        .then((res)=>{
          setBestOfBoat(res)
          dispatch(get_suceess())
        })
        .catch((err)=>console.log(err))
    }

    let userId = localStorage.getItem("userId");
    const getProducts = ()=>{
        fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/cart`)
        .then(res=>res.json())
        .then(res=>{
            setCartProduct(res)
        })
        .catch(err=>console.log(err))
    }

    const first = bestOfBoat.filter((prod)=>{
        return prod.id === 130 || prod.id === 131 || prod.id === 132 || prod.id === 133 || prod.id === 134;
    })
    const second = bestOfBoat.filter((prod)=>{
        return prod.id === 135 || prod.id === 136 || prod.id === 137 || prod.id === 138 || prod.id === 139;
    })
    const third = bestOfBoat.filter((prod)=>{
        return prod.id === 140 || prod.id === 141 || prod.id === 142 || prod.id === 143 || prod.id === 144;
    })

    useEffect(() =>{
        getData();
    },[])
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

    // eslint-disable-next-line no-unused-vars
    let price = 0;

    return (
      <Box width="100%" margin="auto" marginTop="40px" mb={10}>
        <Text fontSize={{base:"25px",sm:"20px",md:"25px",lg:"25px"}} fontWeight="500">CATCH'EM ALL</Text>
        <Tabs colorScheme="red" isFitted="true" variant="line"  mt={6}>
          <TabList>
            <Tab fontSize={{base:"15px",sm:"15px",md:"18px",lg:"22px"}} fontWeight="500" color="#979696">New Launches</Tab>
            <Tab fontSize={{base:"15px",sm:"15px",md:"18px",lg:"22px"}} fontWeight="500" color="#979696">Marvel products</Tab>
            <Tab fontSize={{base:"15px",sm:"15px",md:"18px",lg:"22px"}} fontWeight="500" color="#979696">DC products</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Grid width="100%" margin="auto" 
               gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
               templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}} gap={6} 
               marginTop={{base:"20px",sm:"25px",md:"30px",lg:"50px"}}>
                {first.map((data)=>(
                  <GridItem data-aos="fade-up" position='relative' key={data.id} w='100%' bg='#e3e3e3' borderRadius="10px" p={2} >
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
            </TabPanel>
            <TabPanel>
                <Grid width="100%" margin="auto"  gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
                templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}}
                 gap={6} marginTop={{base:"20px",sm:"25px",md:"30px",lg:"50px"}}>
                  {second.map((data)=>(
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
              </TabPanel>
            <TabPanel>
                <Grid width="100%" margin="auto"  gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
                templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}} gap={6} marginTop={{base:"20px",sm:"25px",md:"30px",lg:"50px"}}>
                  {third.map((data)=>(
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
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    )
}
