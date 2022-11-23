import React from "react";
import {
   FaFacebookF,
   FaTwitter,
   FaInstagram,
   FaYoutube,
   FaLinkedinIn,
} from "react-icons/fa";
import { Box,Button,Grid,GridItem,Image,Img,Input,Stack,Tab,TabList,TabPanel,TabPanels,Tabs,Text } from "@chakra-ui/react";
import emailjs from 'emailjs-com'
import { useState } from "react";
import { useToast } from '@chakra-ui/react'
const initState={
   user_email:""
}

const Footer = () => {
   const [email,setMail]=useState(initState);
   const toast = useToast()

   const handleChange=(e)=>{
      const {name,value}=e.target;
      setMail({...email,[name]:value})
    }

    const handleSubmit=(e)=>{
      e.preventDefault();
      console.log("hello")
      emailjs.sendForm('service_0jdojop','template_wvp7w7x',e.target,'y3zcxMjtk2g0bGO0a').then((res)=>{console.log(res)
         toast({
            title: 'Email Sent',
            description: "Thank You For Suscribing us",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:'top'
          })
      }).catch((res)=>{
         toast({
            title: 'Enter Valid Email',
            status: 'error',
            duration: 4000,
            isClosable: true,
            position:'top'
          })
         console.log(res)})
    }

    console.log(email);

   return (
      <Box>
         <Box bg='rgb(0,0,0)'  >
            <Text w={{sm:'95%',md:'70%',lg:'70%' }} margin='auto' fontSize='15px' color='white' padding={2} >
            India's fastest growing audio & wearables brand. The most incredible range of wireless earphones, earbuds, headphones, smart watches, and home audio. From workouts to adventures, boAt will get you sailing!
            </Text>
         </Box>
         <Box p={{ base:'4',sm:'4',md:'10',lg:'10' }} display={ { base:'block',sm:'block',md:'block',lg:'flex' } }gap={10} width='100%' >
            <Box width={{ base:'100%', sm:'100%', md:'50%' ,lg:"30%" }} >
                  <Image width='40%' src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Asset_2_288x-8_5.png?v=1661838672" ></Image>
                  <Text mt={4} fontSize='14px' textAlign='left' >Subscribe to email alerts. We promise not to spam your inbox.</Text>
                  <Box mt={4} position='relative' >
                    <form onSubmit={handleSubmit} >
                    <Input   focusBorderColor="none" name="user_email" value={email.user_email} outlineColor='red' variant='unstyled' p={3} placeholder="Email Adress" onChange={handleChange} required/>
                     <Button type='submit' bg='red' colorScheme="red" color='white' position='absolute'  top='1' right='0' >SUSCRIBE</Button>
                    </form>
                  </Box>
            </Box>
            <Grid mt={4} display={{base:'none',sm:'none' , md:'grid', lg:'grid' }} templateColumns={{base:'repeat(1, 1fr)',sm:'repeat(2, 1fr)' , md:'repeat(5, 1fr)',lg:'repeat(5, 1fr)'}} gap={6}>
               <GridItem >
                  <Text textAlign='left'  fontWeight='bold'  >SHOP</Text>
                  <Box mt={4} borderRight='1px solid 'borderColor='lightgrey' textAlign='left' >
                     <Stack>
                     <Text>True Wireless Earbuds</Text>   
                     <Text>Wired HeadTexthones</Text>            
                     <Text>Home Audio</Text>
                     <Text>Smart Watches</Text>
                     <Text>Misfit</Text>
                     <Text>Rock in India</Text>
                     </Stack>
                  </Box>
               </GridItem>
               <GridItem >
                  <Box mt={10} borderRight='1px solid ' borderColor='lightgrey' textAlign='left' >
                     <Stack>
                    <Text>Wired HeadTexthones</Text>
                    <Text>Wireless STexteakers</Text>
                     <Text>Mobile Accessories</Text>
                     <Text>TRebel</Text>
                     <Text>Gift Card</Text>
                     <Text>Earb Rs 100</Text>
                     </Stack>
                  </Box>
               </GridItem>
               <GridItem textAlign='left' >
               <Text textAlign='left'  fontWeight='bold'  >HELP</Text>
                  <Box mt={4} borderRight='1px solid ' borderColor='lightgrey' textAlign='left' >
                   <Stack> 
                  <Text>Track Your Order</Text>
                  <Text>Return Textolicy</Text>   
                  <Text>Bulk Orders</Text>  
                  <Text>Why Buy Direct</Text>
                  <Text>Rock In India</Text>
                  </Stack>  
                  </Box>
               </GridItem>
               <GridItem textAlign='left' >
                  <Box  mt={10} p={2}  borderColor='lightgrey'>
                   <Stack>
                     <Text>Warranty & SuTextTextort</Text>
                     <Text>Service Centers</Text>
                     <Text>FAQs</Text>
                  </Stack>
                  </Box>
               </GridItem>
               <GridItem textAlign='left' >
               <Text textAlign='left' fontWeight='bold' >COMPANY</Text>
                  <Box paddingLeft={4} mt={4} borderLeft='1px solid' borderColor='lightgrey' >
                  <Stack>
                  <Text>About boAt</Text>
                  <Text>News</Text>
                  <Text>Read Our Blog</Text>
                  <Text>Careers</Text>
                  <Text>Security</Text>
                  <Text>Terms of Service</Text>
                  <Text>Textrivacy Textolicy</Text>
                  <Text>Investor Relations</Text>
                  <Text></Text>
                  </Stack>
                  </Box>
               </GridItem>
            </Grid>
            {/* for tabs only mobile screens */}
            <Tabs  >
            <TabList width='100%' marginTop='4' display={{base:'flex',sm:'flex' , md:'none', lg:'none' }} justifyContent='space-evenly' >
               <Tab>SHOP</Tab>
               <Tab>HELP</Tab>
               <Tab>COMPANY</Tab>
            </TabList>
            <TabPanels  display={{base:'block',sm:'block' , md:'none', lg:'none' }} >
               <TabPanel justifyContent='space-evenly' display='flex' >
               <Box mt={4}  textAlign='left' >
                     <Stack>
                     <Text>True Wireless Earbuds</Text>   
                     <Text>Wired HeadTexthones</Text>            
                     <Text>Home Audio</Text>
                     <Text>Smart Watches</Text>
                     <Text>Misfit</Text>
                     <Text>Rock in India</Text>
                     </Stack>
                  </Box>
                  <Box   textAlign='left' >
                     <Stack>
                    <Text>Wired HeadTexthones</Text>
                    <Text>Wireless STexteakers</Text>
                     <Text>Mobile Accessories</Text>
                     <Text>TRebel</Text>
                     <Text>Gift Card</Text>
                     <Text>Earb Rs 100</Text>
                     </Stack>
                  </Box>
               </TabPanel>
               <TabPanel justifyContent='space-evenly'   gap={4} display='flex' >
               <Box  textAlign='left' >
                   <Stack> 
                  <Text>Track Your Order</Text>
                  <Text>Return Textolicy</Text>   
                  <Text>Bulk Orders</Text>  
                  <Text>Why Buy Direct</Text>
                  <Text>Rock In India</Text>
                  </Stack>  
               </Box>
               <Box  textAlign='left'>
                   <Stack>
                     <Text>Warranty & SuTextTextort</Text>
                     <Text>Service Centers</Text>
                     <Text>FAQs</Text>
                  </Stack>
               </Box>
               </TabPanel>
               <TabPanel justifyContent='space-evenly'  display='flex' gap={4}>
               <Box textAlign='left' >
                  <Stack>
                  <Text>About boAt</Text>
                  <Text>News</Text>
                  <Text>Read Our Blog</Text>
                  <Text>Careers</Text>
                  <Text>Security</Text>
                  <Text>Terms of Service</Text>
                  <Text>Textrivacy Textolicy</Text>
                  <Text>Investor Relations</Text>
                  </Stack>
               </Box>
               <Box  textAlign='left' >
                  <Stack>
                  <Text>Security</Text>
                  <Text>Terms of Service</Text>
                  <Text>Textrivacy Textolicy</Text>
                  <Text>Investor Relations</Text>
                  </Stack>
               </Box>
               </TabPanel>
             </TabPanels>
            </Tabs>
         </Box>
         <Box width='100%'   display='flex' border='1px solid lightgrey' >
           <Text padding={3}  className="hover-2"  > <FaFacebookF fontSize='30px' />  </Text> 
           <Text padding={3}  className="hover-2" ><FaTwitter fontSize='30px'  /> </Text> 
           <Text padding={3}  className="hover-1" > <FaInstagram fontSize='30px'  /> </Text>
           <Text padding={3}  className="hover-1" >< FaYoutube fontSize='30px'  /> </Text> 
           <Text padding={3}  className="hover-2" > <FaLinkedinIn fontSize='30px'  /></Text> 
         </Box>
         <Box p={2} display={{ base:'block' , sm:'block', md:'flex' ,lg:'flex'  }} justifyContent='space-between' borderBottom='1px solid lightgrey' width='100%' >
            <Box width={{ base:'100%' , sm:'100%' ,md:'40%', lg:'30%' }} >
               <Text  textAlign='left'>Download The App</Text>
               <Box display='flex' >
                 <Img src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/google-play.png?v=1608620293" alt="" />
                  <Img  src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/app-store.png?v=1608620293"/>
               </Box>
            </Box>
            <Box width={{ base:'100%' , sm:'100%' ,md:'40%', lg:'30%' }}>
               <Img  width='100%'  src="https://www.launchtip.com/wp-content/webpc-passthru.php?src=https://www.launchtip.com/wp-content/uploads/2021/04/Screenshot-2021-05-01-at-18.06.24.png&nocache=1" />
            </Box>
         </Box>
         <Box  >
            <Text p={4} textAlign='left' >© 2022 Imagine Marketing Limited. All Rights Reserved.</Text>
         </Box>
      </Box>
   );
};

export {Footer};