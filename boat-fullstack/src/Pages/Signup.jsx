import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase';
import { Box, Input, Button ,Text,useToast,
    Stack,
    AlertDialog, 
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
} from '@chakra-ui/react';

import { useRef, useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Navigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_error, get_loading, get_suceess } from '../Redux App/action';

const InitState={
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    phone_number:""
}
const SignUpPage=()=>{
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef()
   const { loading }=useSelector((state)=>state)
    const dispatch=useDispatch();
     const [values,setValues]=useState(InitState);
     const toast = useToast();
     const handleChange=(e)=>{
        const {name,value}=e.target;
        setValues({...values,[name]:value})
     }
    const [nav,setNav]=useState(false);
        
    const [show, setShow] = useState(false)
    const [otp,setOtp]=useState("");
    const showClick= () => setShow(!show)
    const [code,setRes]=useState(""); 
    //  const [refresh,setRefresh]=useState(false);

    if(nav){
     return  <Navigate to='/login' />
    }

    // if(refresh){
    //   return <Navigate to='/signup' />
    // }

    const handleChangeotp=(e)=>{
      setOtp(e.target.value);
    }

     const handleClick=async(e)=>{
      
        e.preventDefault();
        dispatch( get_loading() );
        let res1=await fetch(' https://boat-lifestyle.herokuapp.com/users')
        let res2=await res1.json();
        let flag=false;

        res2.forEach((elem)=>{
          if(elem.email===values.email || elem.phone_number===values.phone_number ){
            flag=true;
          }
        })

        // res2.map((elem)=>{
        //   if(elem.email===values.email || elem.phone_number===values.phone_number ){
        //     flag=true;
        //   }
        // })

        if(flag===false){
          let recaptcha=new RecaptchaVerifier('recaptcha-container', {}, auth);
          recaptcha.render();
          let number=`+91${values.phone_number}`
           let res= await signInWithPhoneNumber(auth,number,recaptcha);
             setRes(res);
             onOpen();
          // }).catch((err)=>{
          //   dispatch(get_error())
          //  console.log(err)
          //   toast({
          //    title: "Server Error",            // for server error
          //    description: "Something went wrong",
          //    status: 'error',
          //    duration: 4000,
          //    isClosable: true,
          //  })
          //  return;
          // })
         console.log(values);
          }else{
           alert("user Already Exists !!")
           dispatch(get_error());
          }
        //  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
      }

      const verify=()=>{
        if(code==null) return;
        code.confirm(otp).then(function(res){
          console.log(res.user,'user');        
            fetch('https://boat-lifestyle.herokuapp.com/users',{
              method:'POST',
              body: JSON.stringify(values),
              headers : {
                  'content-type': 'application/json'
              }
            })
            dispatch(get_suceess(false));
            setNav(true);          //for navigation
            toast({                                // for sucess
              title: 'Account Created.',
              description: "We've created your account for you.",
              status: 'success',
              duration: 4000,
              isClosable: true,
              position:"top"
            })
        }).catch((err)=>{
          dispatch(get_error())
          console.log(err)
           toast({
            title: "WRONG OTP",               //for wrong otp
            description: "Try Again",
            status: 'error',
            duration: 4000,
            isClosable: true,
            position:"top"
          })
          // setRefresh(true);
          setValues(InitState);
          return;
         })
         setValues(InitState);
      }

      const handleVerify=()=>{
        onClose();
        verify();
      }
      // if(loading){
      //   return <h1>...loading...</h1>
      // }

      // if(error){
      //   return <h1>...error..</h1>
      // }

    return (
<>
    <Box width={ {base:"90%", sm:"90%" , md:"60%",lg:"30%"} } margin='auto' marginTop="100px" mb={10}>
    <Stack marginBottom='30px' >
       <Text textAlign="center" fontSize='5xl'>Register</Text>
       <Text textAlign="center" fontSize='xl'>Please fill in the fields </Text>
    </Stack>

         <form onSubmit={handleClick} >
            <Stack spacing="10px"  >
      <MDBInput
          label="First Name"
          size='lg'
          name='first_name'
          value={values.first_name}
          onChange={handleChange}
          required
        /> 
         <MDBInput
          label="Last Name"
          size='lg'
          name='last_name'
          value={values.last_name}
         onChange={handleChange}
         required  
        />
         <MDBInput
          label="Email"
          value={values.email}
          name='email'
         size='lg'
         id='typeEmail' type='email'
         onChange={handleChange}
         required
         
        />
        <MDBInput 
          label="Phone Number"
          value={values.phone_number}
         size='lg'
         name='phone_number'
         id='typeNumber' type='number'
         onChange={handleChange}
         required
         
        />
             <Box width='100%' position='relative' >
                <MDBInput 
                width='100%'               
                 label="Password"
                id='typePassword'
                size='lg'
                name='password'
                type={show ? 'text' : 'password'}
                value={values.password}
                onChange={handleChange}
                maxLength='8'
                /> 
            <Button h='1.75rem' size='sm' right='2' top='2' position='absolute' onClick={showClick}>
            {show ? 'Hide' : 'Show'}
            </Button>
            </Box>
        <Box width='100%' id='recaptcha-container' ></Box>
        <Button width='100%' isLoading={loading}
          type='submit' height='50px' style={{ backgroundColor:"red", padding:"20px", textAlign:"center" }}
        variant="contained" color='#ffff' >CREATE ACCOUNT</Button>
       <Text textAlign="center" fontSize='lg'>Already have an account <NavLink style={{ color:'red'}} className='hover-underline-animation' to='/login' >Login</NavLink> </Text>
        </Stack>
      </form>
    </Box>
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
             OTP
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
export default SignUpPage
