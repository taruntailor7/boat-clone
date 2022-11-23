import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { AddIcon, MinusIcon } from "@chakra-ui/icons";

import PaymetDrawer from "./PaymetDrawer";
import ProductsStars from "./ProductsStars";
import { AddToCart } from "../Pages/AddToCart";
import { Navigate } from "react-router-dom";

const ProdName = ({ colors, setImge,obj }) => {
  console.log(colors,'color');
  const [CountProd, setCountProd] = React.useState(1);
  // console.log(imgesData.img);
  console.log(setImge, "setImge");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [cartProduct, setCartProduct] = useState([])


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



  return (
    <Box ml={6} mt={{base:"0px",md:"-100px",lg:"40px"}}>
      
        <Text
          fontSize="40px "
          fontWeight="700"
          justifyContent="flex-start"
          textAlign="left"
          w="full"
          ml={[36, 10, 15, 0]} 
        >
          {obj.name}
        </Text>
        <Box>
          <Text fontSize="15px" textAlign="left" textColor="gray">
            {obj.category}
          </Text>
        </Box>
        <Box>
          
            {/* <ProductsStars 
              size={["28px", "24px", "20px", "16px"]}
              mtt={[8, 6, 2, 2]}
              review={Math.floor(obj.reviews)}
            /> */}
            <Text
              fontSize={["28px", "24px", "20px", "16px"]}
              color="gray"
              mt={[8, 6, 2, 2]}
              ml={3}
            >
           Rating:   {obj.rating} | {obj.reviews} Reviews
            </Text>
          
        </Box>
        <Box
          w="full"
          mt={6}
          h="full"
        >
          {/* <VStack w={["full", "full", "full", 377]} align="left"> */}
            {/* <Box display="flex">
              <Text color="gray" textSize="16px" mt={1}>
                Colors :
              </Text>
            </Box>
            <Box
              // display="flex"
              direction="row"
              // spacing={["35px", "30px", "20px", "10px"]}
            >    {colors.map((elem)=>(
                  <Text color='black' >{elem}</Text>
                ))} */}
           
              {/* <Box  
                h={["100px", "150px", "120px", "90px"]}
                w={["100px", "150px", "120px", "90px"]}
                border="1px"
                borderColor="gray.200"
                cursor="pointer"
                onClick={() => setImge(colors[0])}
                ml={["50px", "100px", "100px", "0"]}
                mr={[8, 6, 4, 2]}
              >
                <Image boxSize="full" borderRadius="4" src={colors[0]}></Image>
              </Box>
              <Box
                h={["100px", "150px", "120px", "90px"]}
                w={["100px", "150px", "120px", "90px"]}
                border="1px"
                borderColor="gray.200"
                cursor="pointer"
                onClick={() => setImge(colors[1])}
                mr={[8, 6, 4, 2]}
              >
                <Image boxSize="full" borderRadius="4" src={colors[1]}></Image>
              </Box>
              <Box
                h={["100px", "150px", "120px", "90px"]}
                w={["100px", "150px", "120px", "90px"]}
                border="1px"
                borderColor="gray.200"
                cursor="pointer"
                onClick={() => setImge(colors[2])}
                mr={[8, 6, 4, 2]}
              >
                <Image boxSize="full" borderRadius="4" src={colors[2]}></Image>
              </Box>
              <Box
                h={["100px", "150px", "120px", "90px"]}
                w={["100px", "150px", "120px", "90px"]}
                border="1px"
                borderColor="gray.200"
                cursor="pointer"
                onClick={() => setImge(colors[3])}
                mr={[8, 6, 4, 2]}
              >
                <Image boxSize="full" borderRadius="4" src={colors[3]}></Image>
              </Box> */}
            {/* </Box>
            <br />
            <hr /> */}
          {/* </VStack> */}

          <Box
            h={["full", "full", "full"]}
            w={["90%", "90%", "90%", '50%']}
            ml={["20px", "20px", "30px", 0]}
            p='4'
            border="1px"
            borderColor="gray.300"
            borderRadius="20"
            style={{ backgroundColor: "#EFEFEF" }}
          >
            <HStack pl={2}>
              <Text fontSize="4xl" pl={4} mt={2} fontWeight="700" color="red">
                ₹{obj.price}
              </Text>
              <Text as="del" fontSize="2xl" pt={3}>
                ₹{obj.original_price}
              </Text>
            </HStack>
            <HStack pl={2} mt={1}>
              <Text fontSize="sm" fontWeight="700" color="green">
                You Save: ₹ {Math.ceil(obj.original_price*(obj.discount/100)) } ({obj.discount}%)
              </Text>
              <Text fontSize="xs">Inclusive of all taxes</Text>
            </HStack>
            {/* <HStack pl={2} p={2} mt={3} style={{ backgroundColor: "#DCDCDC" }}>
              <Text fontSize="sm" fontWeight="700" color="green">
                IN STOCK
              </Text>
              <Text fontSize="xs" textAlign={"right"} pl={20}>
                Current in 72 Carts
              </Text>
            </HStack> */}
            {/* <Box border="1px" w={20} h={30} mt={5} ml={3} display="flex">
              <MinusIcon
                w={3}
                h={3}
                ml={2}
                mt={2}
                _disabled={CountProd === 1}
                onClick={() => {
                  if (CountProd > 1) {
                    setCountProd(CountProd - 1);
                  }
                }}
              />
              <Text ml={3} color="red" fontWeight="800">
                {CountProd}
              </Text>
              <AddIcon
                w={3}
                h={3}
                mt={2}
                ml={4}
                onClick={() => {
                  setCountProd(CountProd + 1);
                }}
              />
            </Box> */}
            <Box w="100%" mt={2} ml={-2} p={3} py={2}>
              <Button
              
                colorScheme="red"
                w="full"
                mt={2}
                m={2}
                mr={2}
                height='50px'
                onClick={()=>addToCart(obj,obj.id)}
              >
                <AddToCart/>
              </Button>
              {/* <Button
                w="full"
                mt={2}
                m={2}
                mr={2}
                border="2px"
                borderColor="red.500"
                color="red"
              >
                BUY NOW
              </Button> */}
            </Box>
          </Box>
        </Box>
    
    </Box>
  );
};

export default ProdName;
