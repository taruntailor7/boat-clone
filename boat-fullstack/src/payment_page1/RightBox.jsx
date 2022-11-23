import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Flex,
    useDisclosure,
    useToast
  } from '@chakra-ui/react'
  import {GiTicket} from "react-icons/gi"
  import "../payment_page1/Mystyle.css"
  import {AiOutlineShoppingCart} from "react-icons/ai"
import { Image } from 'react-bootstrap'
import { useEffect, useState } from 'react'
  export const MyAccordion =({handleOrders,cartProduct,cartTotal})=>{
    const {onClose } = useDisclosure()
    const toast = useToast()
    

    const pay = ()=>{
      onClose()
      toast({
        title: 'Your order has been placed.',
        description: "Keep Sailing!",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position:"top"
      })
      handleOrders()
    }


    return (
    <Box>
    <Accordion isFocusable="true" isDisabled="true" defaultIndex={[0]}   allowMultiple>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left' display="flex" gap='5' h={{sm:"40px",md:"40px"}}>
              <AiOutlineShoppingCart/>
              <h3>Order Summary</h3>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <Box style={{overflowY:"scroll",height:"100px"}}>
            {cartProduct.map((elem)=>(
                  <Box style={{display:"flex",gap:"40px",height:"90px",fontSize:"15px",fontWeight:"400 ",color:"#050038"}}>
                    <Image alt="" style={{width:"70px",height:"70px"}} src={elem.image[0]}/>
                    <Box className="order_summary_detail">
                      <Box>{elem.name}</Box>
                      <Box>Quantity : {elem.count}</Box>
                      <Box>Price : {elem.price}</Box>
                    </Box>
                  </Box>
              ))}
          </Box>   
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
    <Box mt={10} >
      <Box mt={4}>
          <Box mt={2} display="flex" justifyContent="space-between" className="order_data">
              <Box>Subtotal</Box>
              <Box>₹{cartTotal}</Box>
          </Box>
          <Box  mt={2} display="flex" justifyContent="space-between" className="order_data">
              <Box>Shipping</Box>
              <Box>Free</Box>
          </Box>
      </Box>
      <hr/>
      <Box  mt={2} style={{display:"flex",justifyContent:"space-between",fontWeight:"500" ,fontSize:"20px",color:"#050038"}}>
          <Box >To Pay</Box>
          <h3>₹{cartTotal}</h3>
      </Box> 
      <Box>
        <Button onClick={()=>pay()} w="100%"  bg="red" mt={7} colorScheme="red">PAY</Button>
      </Box>
    </Box>
      {/* <Flex className="discount_parent" style={{justifyContent:"space-between",boxShadow:" rgba(0, 0, 0, 0.24) 0px 3px 8px",width:"90%",margin:"20px",height:"70px  ",alignItems:"center",}} display={{sm:"none",md:"flex",base:"none",lg:"flex"}}>
          <GiTicket style={{marginTop:"10px",marginLeft:"30px",width:"100px",height:"30px"}}/>
          <input className="discount_box" style={{marginTop:"10px",marginLeft:"10px",width:"190px",height:"40px",textAlign:"center",margin:"auto" }} placeholder="Discount"/>
      </Flex>*/}
    </Box> 
  )
}