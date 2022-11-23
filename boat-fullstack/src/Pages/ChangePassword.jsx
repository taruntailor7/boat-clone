import React, { useState } from 'react'
import { MDBInput } from 'mdb-react-ui-kit';
import { Box ,Stack , Text ,Button,useToast} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { get_error, get_loading, get_suceess } from '../Redux App/action';
import { Navigate } from 'react-router-dom';


export default function ChangePassword() {
  const toast = useToast();
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const id=localStorage.getItem("id");
  const { loading , error , token  }=useSelector((state)=>state)
  const [nav,setNav]=useState(false);
  const dispatch=useDispatch();
  const [show, setShow] = useState(false)
  const showClick= () => setShow(!show)

  const handleChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleChangePasswordConfirm=(e)=>{
    setConfirmPassword(e.target.value);
  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
     dispatch(get_loading());
    if(password==confirmPassword){
      const initState={
        password:confirmPassword
      }
        try{
          fetch(`https://boat-lifestyle.herokuapp.com/users/${id}`,{
            method:'PATCH',
            body: JSON.stringify(initState),
            headers : {
                'content-type': 'application/json'
            }
          })
          toast({                                // for sucess
            title: 'Password Changed',
            description: "We've changed your account password",
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
          dispatch(get_suceess(false));
          setNav(true);
        }catch(err){
          dispatch(get_error());
          alert("Something went wrong !!")
        }
    }else{
      dispatch(get_error());
      toast({
        title: "Alert",               //for wrong otp
        description: "Password and Confirm Password Should be Same",
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
    localStorage.removeItem(id);
    setConfirmPassword("");
    setPassword("");
  }

  if(nav){
    return <Navigate to='/login' />
  }

  return (
    <Box width={ {base:"90%", sm:"90%" , md:"60%",lg:"30%"} } margin='auto' my={10}>
    <Text fontSize={ {base:"25px", sm:"30px" , md:'35px',lg:"4xl"}}> Change Password </Text>
    <Text marginTop='15px' marginBottom='10px' >Please Enter New Password</Text>
    <form onSubmit={handleSubmit} >
    <Stack gap='15px'>
    <MDBInput 
      label="Password"
      value={password}
      name='password'
      size='lg'
       type='Text'
      onChange={handleChangePassword}
       required
     />
  <Box width='100%' position='relative' >
    <MDBInput 
      label="Confirm Password"
      value={confirmPassword}
      name='password'
      size='lg'
      type={show ? 'text' : 'password'}
      onChange={handleChangePasswordConfirm}
      required
     />
     <Button h='1.75rem' size='sm' right='2' top='2' position='absolute' onClick={showClick}>
            {show ? 'Hide' : 'Show'}
            </Button>
    </Box>
     <Button width='100%'  isLoading={loading}
      type='submit' height='50px' style={{ backgroundColor:"red", padding:"20px", textAlign:"center" }}
    variant="contained" color='#ffff' >CONFIRM</Button>
    </Stack>
    </form>
</Box>
  )
}
