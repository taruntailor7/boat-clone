import { Box, Button, Stack, Text ,useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,Input
} from '@chakra-ui/react'
import { MDBInput } from 'mdb-react-ui-kit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { get_error, get_loading, get_suceess } from '../Redux App/action';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';
import { Navigate } from 'react-router-dom';
import { useRef } from 'react';

export default function ForgotPassword() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const [values,setValues]=useState({phone_number:""});
    const { loading }=useSelector((state)=>state)
    const toast = useToast();
    const [refresh,setRefresh]=useState(false);
    const [otp,setOtp]=useState("");
    const [code,setRes]=useState(""); 
    const [id,seId]=useState("");

    const [nav,setNav]=useState(false);

    const dispatch=useDispatch();
    const handleChange=(e)=>{
        const {name,value}=e.target;
        setValues({...values,[name]:value})
    }
 

    const handleChangeotp=(e)=>{
      setOtp(e.target.value);
    }

    const handleSubmit=async(e)=>{
            dispatch( get_loading() );
            let res3=await fetch('https://boat-lifestyle.herokuapp.com/users')
            let res4=await res3.json();
            let flag=false;
            res4.map((elem)=>{
             if(elem.phone_number===values.phone_number){
               flag=true;
               seId(elem.id);
             }
            })
            if(flag){
                let recaptcha=new RecaptchaVerifier('recaptcha-container', {}, auth);
                recaptcha.render();
                let number=`+91${values.phone_number}`
                toast({                                // for sucess
                    title: 'OTP SENT',
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                  })
              let res= await signInWithPhoneNumber(auth,number,recaptcha);
              setRes(res);
              onOpen();
            }else{
                dispatch(get_error());
                toast({
                    title: "Alert !!",               //for wrong otp
                    description: "Please Enter Valid Registered Phone Number",
                    status: 'error',
                    duration: 4000,
                    isClosable: true,
                  })
               }
          }
        const verify=(id)=>{
            if(code==null) return;
            code.confirm(otp).then(function(res){
              console.log(res.user,'user'); 
                localStorage.setItem("id",id);
                dispatch(get_suceess(false));   
                setNav(true);       
            }).catch((err)=>{
              dispatch(get_error())
              console.log(err)
               toast({
                title: "WRONG OTP",               //for wrong otp
                description: "Try Again",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
              setRefresh(true);
              return;
             })
             localStorage.removeItem
             ("id",id);
        }

        const handleVerify=()=>{
          onClose();
          verify(id);
        }

    if(nav){
        return <Navigate to='/change_password' ></Navigate>
    }
    if(refresh){
      return <Navigate to='/forgot_password' />
    }

  return (
    <>
    <Box width={ {base:"90%", sm:"90%" , md:"60%",lg:"30%"} } margin='auto' marginTop="100px" mb={10}>
        <Stack gap='1px'>
        <Text textAlign="center" fontSize={ {base:"25px", sm:"30px" , md:'35px',lg:"4xl"} } > Recover Password </Text>
        <Text textAlign="center" marginTop='15px' marginBottom='10px' >Please Enter Your Phone Number</Text>
        <MDBInput 
          label="Phone Number"
          value={values.phone}
          name='phone_number'
          size='lg'
          id='typeNumber' type='Number'
          onChange={handleChange}
          required
         />
         <Box id='recaptcha-container' ></Box>
         <Button width='100%' onClick={handleSubmit} isLoading={loading}
         height='50px' style={{ backgroundColor:"red", padding:"20px", textAlign:"center" }}
        variant="contained" color='#ffff' >RECOVER</Button>
        </Stack>
    </Box>
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             Enter OTP
            </AlertDialogHeader>

            <AlertDialogBody>
             <Input placeholder='OTP' onChange={ handleChangeotp } ></Input>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme='red' onClick={handleVerify} ml={3}>
                verify
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}
