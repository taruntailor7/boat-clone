import React from "react"
import { Input,Box,Text } from "@chakra-ui/react"
import { CommonButton } from "./CommonButton"
import "../payment_page1/Mystyle.css"
const input_box_style={
    height:"50px",
    borderRadius:"7px",
    backgroundColor:"#E6E6FA"
}
export const AddressPage=()=>{
    return <>
    <Box >

<Box style={{display:"flex",justifyContent:"space-between",width:"99%",marginBottom:"20px"}}>
<Box style={{fontSize:"15px"}}><p>Add new address</p></Box>

<Box style={{fontSize:"10px"}}><p><Text as='sup'>*</Text>Mandatory Fields</p></Box>
</Box>
<hr/>
<Box style={{overflowY:"scroll",height:"160px",marginBottom:"60px"}}>
    <label>Pincode</label>
    <Input type="text" placeholder="*Pincode" className="Input_boxes"style={input_box_style}/>
    <Box className="input_box">
        <Box className="baby_input">
            <label>City</label>
            <Input placeholder="*City"style={input_box_style}/>
        </Box>

        <Box  className="baby_input">
        <label>State</label>
            <Input placeholder="*State" style={input_box_style}/>
        </Box>
       
    </Box>
    <Box >
    <label>Name</label>
    <Input placeholder="*Enter name" className="Input_boxes" style={input_box_style}/>
    </Box>
    <Box >
    <label>Email</label>
        <Input placeholder="*Enter Email Address"  className="Input_boxes" style={input_box_style}/>
        </Box>
</Box>
<CommonButton />

</Box></>
}