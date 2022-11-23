import { Box, Button, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiFillThunderbolt } from 'react-icons/ai'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
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
import { NavLink } from 'react-bootstrap'

export const HomeBestOfBoat = () => {
  const [bestOfBoat, setBestOfBoat] = useState([]);
  const { loading  }=useSelector((state)=>state)
  const dispatch = useDispatch();
  const [cartProduct, setCartProduct] = useState([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const getData = ()=>{
    dispatch(get_loading());
    fetch(`https://boat-lifestyle.herokuapp.com/bestOfBoat`)
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
    return prod.id === 105 || prod.id === 106 || prod.id === 107 || prod.id === 108 || prod.id === 109;
  })
  const second = bestOfBoat.filter((prod)=>{
    return prod.id === 110 || prod.id === 111 || prod.id === 112 || prod.id === 113 || prod.id === 114;
  })
  const third = bestOfBoat.filter((prod)=>{
    return prod.id === 115 || prod.id === 116 || prod.id === 117 || prod.id === 118 || prod.id === 119;
  })
  const fourth = bestOfBoat.filter((prod)=>{
    return prod.id === 120 || prod.id === 121 || prod.id === 122 || prod.id === 123 || prod.id === 124;
  })
  const fifth = bestOfBoat.filter((prod)=>{
    return prod.id === 125 || prod.id === 126 || prod.id === 127 || prod.id === 128 || prod.id === 129;
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
      //  dispatch(get_loading());
       fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/cart`,{
         method: 'POST',
         body: JSON.stringify(prod),
         headers : {
             'content-type': 'application/json'
         }
       })
      //  dispatch(get_suceess())
 
     }
   }
 

  // eslint-disable-next-line no-unused-vars
  let price = 0;

  return (
    <Box width="100%" margin="auto" marginTop={{base:"50px",sm:"20px",md:"30px",lg:"50px"}}>
      <Text fontSize={{base:"25px",sm:"20px",md:"25px",lg:"25px"}} fontWeight="500">BEST OF boAt</Text>
      <Tabs colorScheme="red" isFitted="true"  mt={6}>
        <TabList overflowX='auto'>
          <Tab fontSize={{base:"22px",sm:"12px",md:"12px",lg:"22px"}} fontWeight="500" color="#979696">Best Sellers</Tab>
          <Tab fontSize={{base:"22px",sm:"12px",md:"12px",lg:"22px"}} fontWeight="500" color="#979696">Top Earbuds</Tab>
          <Tab fontSize={{base:"22px",sm:"12px",md:"12px",lg:"22px"}} fontWeight="500" color="#979696">Smart Watches</Tab>
          <Tab fontSize={{base:"22px",sm:"12px",md:"12px",lg:"22px"}} fontWeight="500" color="#979696">Trending Wireless</Tab>
          <Tab fontSize={{base:"22px",sm:"12px",md:"12px",lg:"22px"}} fontWeight="500" color="#979696">Trending ANC</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Grid width="100%" margin="auto" overflowX={{base:"auto",sm:"auto",md:"auto"}} 
             gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }}
             templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}} 
             gap={6} marginTop={{base:"50px",sm:"25px",md:"30px",lg:"50px"}}>
              {first.map((data)=>(
                <GridItem data-aos="fade-up" position='relative' key={data.id} grid-auto-flow="column" grid-auto-columns="72vw" w='100%' bg='#e3e3e3' borderRadius="10px" p={2} >
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
              <Grid width="100%" margin="auto"
                gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
                templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}} 
               gap={6} marginTop={{base:"50px",sm:"25px",md:"30px",lg:"50px"}}>
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
              <Grid width="100%" margin="auto"gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
                templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}}  gap={6}
               marginTop={{base:"50px",sm:"25px",md:"30px",lg:"50px"}}>
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
              <Grid width="100%" margin="auto" gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
                templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}} 
                 gap={6} marginTop={{base:"50px",sm:"25px",md:"30px",lg:"50px"}}>
                {fourth.map((data)=>(
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
              <Grid width="100%" margin="auto" gridAutoColumns= "minmax(270px,1fr)" gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} overflowX='auto'
                templateColumns={{base:"repeat(auto-fill,minmax(270px,1fr))",   sm:"repeat(auto-fill,minmax(270px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}} gap={6} marginTop={{base:"50px",sm:"25px",md:"30px",lg:"50px"}}>
                {fifth.map((data)=>(
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
        </TabPanels>
      </Tabs>
    </Box>
  )
}
