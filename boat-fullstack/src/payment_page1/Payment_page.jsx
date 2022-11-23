import {Box,DirectionStack,TextField,Input} from "@chakra-ui/react"
import { CommonButton } from "./CommonButton"
import "../payment_page1/Mystyle.css"
const input_box_style={
    backgroundColor:"#E6E6FA",margin:"  2px 2px 10px",
    height:"60px"
}
export const Paymentpage=()=>{

    // return <>
    
    // {/* {/* <Box style={{fontSize:"10px"}}>
    //     <p>
    //         Please Select any payment method to complete the order
    //     </p>
    //     <h4>Extra ₹15 discount applied</h4>
    // </Box> */}
    // <Box style={{display:"flex"}}>
    // <DirectionStack/>
    // </Box>
    // {/* input boxes for address payment */}
    // <Box>

    //  <TextField id="" label="Enter full name" variant="filled" fullWidth style={input_box_style} />
    //  <TextField id="" label="Card Number" variant="filled" fullWidth style={input_box_style}  />
    //  <Box display={"flex"} gap={5} marginBottom={2}>
    //  <TextField id="" label="Valid Through (MM/YY)" variant="filled" style={input_box_style}  />
    //  <TextField id="" label="Enter CVV" variant="filled"  style={input_box_style}  />
    //  </Box>
    // </Box>
    // <CommonButton /> 
    // </>

     return <>
     <h3>Enter Card details</h3>
     <Box >
        <Input placeholder="Enter Full Name" style={input_box_style}/>
        <Input placeholder="Enter Card Number" style={input_box_style}/>
        
        <Box display="flex" gap="5px">
        <Input placeholder="Valid Through (MM/YY)" style={input_box_style}/>
        <Input placeholder="Enter CVV" style={input_box_style}/>
        </Box>

     </Box>
     <CommonButton />
     </>
}