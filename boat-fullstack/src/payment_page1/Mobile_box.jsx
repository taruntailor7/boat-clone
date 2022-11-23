import {Box,Input,Text} from "@chakra-ui/react"
import { CommonButton } from "./CommonButton"
import "../payment_page1/Mystyle.css"

const style1={fontSize:"29px",fontWeight:"bolder",marginTop:"40px",textAlign:"center",marginLeft:"-70px"}
const style2={width:"70%",margin:"40px 58px",marginTop:"20px",color:"#050038",fontSize:"17px",fontWeight:"10"}

export const MobilePage=()=>{
    return <div style={{fontFamily:"metropolisregular",color:"#050038"}}>
    <Text style={style1}>Enter Mobile Number</Text>
    <Box style={style2}>
      <Input placeholder="Enter Number" height="50px"/>
      <input type="checkbox"  checked style={{marginTop:"15px",marginBottom:"8px"}} />
              <label>Notify me for orders,updates & offers</label>

    </Box>
    <CommonButton/>
    </div>
}