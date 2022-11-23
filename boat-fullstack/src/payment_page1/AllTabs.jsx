import { Tabs, TabList, TabPanels, Tab, TabPanel, Box, Text, Grid, GridItem, Image } from '@chakra-ui/react'
import { AddressPage } from './Address'
import "../payment_page1/Mystyle.css"
import { MobilePage } from './Mobile_box'
import { Paymentpage } from './Payment_page'
import { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'

export const Alltabs=()=>{
  const [userAdress,setUserAdress]=useState([]);
  let userId = localStorage.getItem("userId")

  const getAdress = async()=>{
    let res1=await  fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/adress`)
    let res2=await res1.json();
    setUserAdress(res2);
    console.log(res2)
  }

  useEffect(() =>{
    getAdress();
  })

    return (
      <Box width='80%'margin='auto'   >
        <Box textAlign='center' ><Text  marginBottom='30px' fontSize='25px' className='hover-underline-animation'>Your Shipping Adresses </Text></Box>  
        <Grid gridTemplateColumns="repeat(1,1fr)">
              {userAdress.map((elem)=>(
                <GridItem borderRadius="10px" key={elem.id} p={3} fontSize="18px" border='1px solid #c7c7c7' >
                  <Stack>
                    <Text>{elem.street}</Text>
                    <Text>Post Office : {elem.Post_Office}</Text>
                    <Text> PinCode : {elem.pin} </Text>
                    <Text>City : {elem.city} </Text>
                    <Text>State : {elem.state} ({elem.country})</Text>
                  </Stack>
                </GridItem>
              ))}
        </Grid>
      </Box>
    )
}