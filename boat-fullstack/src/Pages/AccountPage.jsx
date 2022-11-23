import { Box , Drawer,Button, DrawerBody,Input,
DrawerFooter,useDisclosure,useToast, DrawerHeader, DrawerOverlay, DrawerContent,  DrawerCloseButton, Select, Text, Grid, GridItem, InputGroup, InputRightElement, Stack, Image} from '@chakra-ui/react';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { get_error, get_loading, get_suceess } from '../Redux App/action';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';
let initState={
    country:"",
    state:"",
    city:"",
    pin:"",
    Post_Office:"",
    street:"",
}
let userId=localStorage.getItem("userId");

export default function AccountPage() {

   const toast = useToast()
   const dispatch=useDispatch();
   const { loading }=useSelector((state)=>state)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const [country,setCountry]=useState([]);
    const [state,setState]=useState([]);
    const [city,setCity]=useState([]);
    const [status,setStatus]=useState(false);
    const [PostOffice,setPost]=useState([]);
    const [adress,setAdress]=useState(initState);
    const [userAdress,setUserAdress]=useState([]);

    useEffect(()=>{
       getData();
       getAdress();
    },[adress])

    let isAuth = localStorage.getItem('isAuth') || false;

    const getAdress=async()=>{
        let res1=await  fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/adress`)
        let res2=await res1.json();
        setUserAdress(res2);
        console.log(res2)
    }

    const getData=async()=>{
       let res1= await fetch("https://countriesnow.space/api/v0.1/countries")
       let res2=await res1.json();
       setCountry(res2.data)
    }

    const handleState=async(e)=>{
        const {name,value}=e.target;
        setAdress({...adress,[name]:value})
        console.log(e.target.value);
       let res1= await fetch(`https://www.universal-tutorial.com/api/states/${e.target.value}`,{
        headers:{
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzaGFrdGlwcmFzYWRiZWh1cmE3N0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJWeVZIVUZ2MmtyY0JJWGs2aXNMSGljTm1KTXB2MW90VmtGN043YWw5M0Z0cGRBMkE4cGlzaWs2Rkp3ZXFxdjBHRXNVIn0sImV4cCI6MTY2NjE2NDU2NX0.RzTYmsoGy3eP64mippo356IBbJg-wRbXQErU5RQ_SD8",
          "Accept":"application/json"
        }
     })
       let res2=await res1.json();
       console.log(res2)
        setState(res2)
    }

    
    const handleCities=async(e)=>{
        const {name,value}=e.target;
        setAdress({...adress,[name]:value})
        console.log(e.target.value);
       let res1= await fetch(`https://www.universal-tutorial.com/api/cities/${e.target.value}`,{
        headers:{
          "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJzaGFrdGlwcmFzYWRiZWh1cmE3N0BnbWFpbC5jb20iLCJhcGlfdG9rZW4iOiJWeVZIVUZ2MmtyY0JJWGs2aXNMSGljTm1KTXB2MW90VmtGN043YWw5M0Z0cGRBMkE4cGlzaWs2Rkp3ZXFxdjBHRXNVIn0sImV4cCI6MTY2NjE2NDU2NX0.RzTYmsoGy3eP64mippo356IBbJg-wRbXQErU5RQ_SD8",
          "Accept":"application/json"
        }
     })
       let res2=await res1.json();
        setCity(res2)
    }

   const handleSelect=(e)=>{
    const {name,value}=e.target;
    setAdress({...adress,[name]:value})
  }

  const handlePin=async()=>{
    dispatch( get_loading() );
    let res1=await fetch (`https://api.postalpincode.in/pincode/${adress.pin}`)
    let res2=await res1.json();
    console.log(res2);
    if(res2[0].Status!=="Success"){
       setStatus(false);
        dispatch(get_error());
        toast({
            title: 'Invalid Pin',
            description: "Invalid Pin Entered",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position:'top'
        })
    }else{
        setStatus(true)
        setPost(res2[0].PostOffice);
        dispatch( get_suceess() );
    }
  }
  const handlePinchange=(e)=>{
    const {name,value}=e.target;
    setAdress({...adress,[name]:value})
  }

  const handlePostChange=(e)=>{
    const {name,value}=e.target;
    setAdress({...adress,[name]:value})
  }

  const handleSubmit=async(e)=>{
    dispatch( get_loading() );
    e.preventDefault();
    if(!status){
        toast({
            title: 'Invalid Pin',
            description: "Invalid Pin Entered",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position:'top'
        })
        setAdress(initState);
    }else{
       await  fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}/adress`,{
            method:'POST',
            body: JSON.stringify(adress),
            headers : {
           'content-type': 'application/json'
         }
        })
        toast({
            title: 'New Adress',
            description: "Successfully Adress Added",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:'top'
        })
        dispatch(get_suceess(false));
    }
    setAdress(initState);
    onClose();
  }

  const handleDelete=async(id)=>{
    await  fetch(`https://boat-lifestyle.herokuapp.com/adress/${id} `,{
        method:"DELETE"
    })
    getAdress();
    toast({
        title: 'Address Deleted',
        description: "Successfully Adress Deleted",
        status: 'success',
        duration: 4000,
        isClosable: true,
        position:'top'
    })
  }
  
  if(isAuth==="false"){
    return <Navigate to="/login"/>
  }

  return (
    <Box marginTop={{base:"30px",lg:'120px'}} marginBottom='120px' >
    <Box width='80%'margin='auto'   >
        <Box textAlign='center' ><Text marginBottom='30px' fontSize={{base:'25px',md:"30px",lg:"40px"}} className='hover-underline-animation'> Adresses </Text></Box>  
        <Grid  gridTemplateColumns={{ base:"repeat(1,1fr)", sm:"repeat(1,1fr)" ,md:"repeat(3,1fr)",lg:"repeat(3,1fr)" }} gap={2}>
            {userAdress.map((elem)=>(
              <GridItem key={elem.id} p={3} borderRadius="10px" border='1px solid #c7c7c7' >
               <Stack >
                    <Text>{elem.street}</Text>
                    <Text>Post Office : {elem.Post_Office}</Text>
                    <Text> PinCode : {elem.pin} </Text>
                    <Text>City : {elem.city} </Text>
                    <Text>State : {elem.state} ({elem.country})</Text>
                <Button colorScheme='red'  onClick={()=>handleDelete(elem.id)} >Delete</Button>
               </Stack>
              </GridItem>
            ))}
        
        <Box  as='button' borderRadius="10px" backgroundColor='#c7c7c7' ref={btnRef} onClick={onOpen}>
            <Image  width='20%' margin='auto' src="https://media1.giphy.com/media/RJsMEFRyzHIwiIFiIu/giphy.gif?cid=ecf05e47sz9kt73n2knxoqtl1yzuocyxle3m4404w3h9nxik&rid=giphy.gif&ct=s" alt="" />
        Add New Adress
        <Box width='15%' margin="auto">
          <AiOutlinePlus ml={10} textAlign="center" fontSize="50px" />
        </Box>
        </Box>
    </Grid>
    </Box>
    <>
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="red" color="white" p={2}  >Add Adress</DrawerHeader>

          <form onSubmit={handleSubmit} >
          <DrawerBody  >
             <Stack>
             <Select  name='country' onChange={handleState} required >
             <option>select Coutry</option>
                    {country.map((elem)=>(
                        <option  value={elem.country}>{elem.country}</option>
                    )) }  
                </Select>
                <Select name="state" id="" onChange={handleCities} required >
                <option>select state</option>
                    {state.map((elem)=>(
                        <option  value={elem.state_name}>{elem.state_name}</option>
                    )) }  
                </Select>
                <Select name="city" id="" onChange={handleSelect} required >
                <option>select city</option>
                    {city.map((elem)=>(
                        <option  value={elem.city_name}>{elem.city_name}</option>
                    )) }  
                </Select>
                <Input onChange={handleSelect } placeholder='Enter Complete Adress' name='street' value={adress.street} required  /> 
                <InputGroup  >
                <Input  type="number" onChange={handlePinchange} name='pin' value={adress.pin} placeholder='Enter Pin' maxLength={6} required />
                 <InputRightElement  width={20} >
                 <Button isLoading={loading}  onClick={handlePin} >Check</Button>
                 </InputRightElement>
                </InputGroup>
                {status? <>
                    <Select onChange={handlePostChange} name="Post_Office" >
                <option>select Post</option>
                    {PostOffice.map((elem)=>(
                        <option  value={elem.Name}>{elem.Name}</option>
                    ))  }  
                </Select>
                </>:<></>  }
                </Stack>
          </DrawerBody>
          <DrawerFooter position='absolute' bottom='0' width='100%'  margin='auto'  >
            <Button isLoading={loading} colorScheme='red' type='submit' width='100%' >Save</Button>
          </DrawerFooter>
          </form>
        </DrawerContent>
    </Drawer>
    
    </>
    </Box>
  )
}
