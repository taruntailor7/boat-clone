import { Box, Button, Center, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { AiFillStar, AiFillThunderbolt } from 'react-icons/ai'
import {Navigate, NavLink} from "react-router-dom"


export const Orders = () => {
  const [orders, setOrders] = useState([])
  const [len, setlen] = useState(0);
  let userId = localStorage.getItem("userId");
  let isAuth = localStorage.getItem('isAuth') || false;

  const getData = async ()=>{
    let res = await fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/orders`)
    let res2 = await res.json()
    setOrders(res2)
    setlen(res2.length)
    console.log(orders,"orders array");
  }

  useEffect(() =>{
    getData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[len])

  if(isAuth==="false"){
    return <Navigate to="/login"/>
  }

  return (
    <>
      <Text fontSize="40px" textAlign="center" marginTop={{base:"30px",md:"50px",lg:"100px"}}>Orders</Text>
      { 
        len===0 ? 
        <Box>
          <Text textAlign="center">You have not placed any orders yet.</Text> 
          <Center>
            <NavLink to="/collections/products">
              <Button  bg="red" colorScheme="red" color="white" fontSize="15px" _hover={{color: "black"}} px={10} py={6} my={10}>Start Shopping</Button>
            </NavLink>
          </Center>
        </Box>
        : 
        <Box width="80%" margin="auto" my={10}>
          <Grid width="100%"  overflowX='auto' gridAutoColumns= "minmax(300px,1fr) " gridAutoFlow={{ base:'column',sm:'column',md:'row',lg:'row' }} margin="auto" templateColumns={{base:"repeat(auto-fill,minmax(300px,1fr))", sm:"repeat(auto-fill,minmax(300px,1fr))", md:"repeat(3, 1fr)", lg:"repeat(4, 1fr)"}} gap={6} marginTop="60px">
          {orders.map((data)=>(
            <GridItem  key={data.id} w='100%' bg='#e3e3e3' borderRadius="10px" p={2} >
              {data.isSuperSaver?<Button bg="#F7C20A" colorScheme="#F7C20A" color="black" position="absolute" px={1}> <AiFillThunderbolt /> Super Saver</Button>:""}
              <Box width="100%" p={5}> 
                <Image width="100%" src={data.image[0]} alt="image" />
              </Box>
              <Box w="100%" bg='white' p={3} borderRadius="10px">
                <Text fontSize="18px" fontWeight="500">{data.name.length>19 ? data.name.slice(0, 19-1)+'...' : data.name}</Text>
                <Text display="flex" alignItems="center" my={2}><AiFillStar color="#ff0000" margin="10px"/> {data.rating} | {data.reviews} reviews</Text>
                <hr />
                <Text my={2} fontWeight='500'>Quantity: {data.count}</Text>
                <Box display="flex" >
                  <Text color="#ff0000" fontWeight='500'> ₹ { data.price }</Text>
                  <Text as="s" ml={2}> ₹ {data.original_price}</Text>
                </Box>
                <Text my={2}>You Save: ₹ {Math.ceil(data.original_price*(data.discount/100)) } ({data.discount}%)</Text>
                
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>
      }
    </>
  )
}
