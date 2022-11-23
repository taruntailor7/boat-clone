import { Button } from '@chakra-ui/react'
import {ArrowForwardIcon} from "@chakra-ui/icons"
import "../payment_page1/Mystyle.css"
export const CommonButton=()=>{
    return <>
    <Button  bg="#999999" colorScheme="#999999" w={{lg:"180px",md:"100%",sm:"100%",base:"100%"}} height="60px" marginTop="10px" color="white" align={{sm:"center",md:"center ",base:"center"}} ml={{lg:"140px",md:"50px",sm:"5px",base:"5px"}}>Continue <ArrowForwardIcon/></Button>
    </>
}