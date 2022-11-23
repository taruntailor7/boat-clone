/* eslint-disable no-lone-blocks */
//import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import { Box,Button ,Text,useToast,   Stack, Img
} from '@chakra-ui/react';

import { useState } from 'react';
import { MDBInput } from 'mdb-react-ui-kit';
import { Navigate, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { get_error, get_loading, get_suceess } from '../Redux App/action';

// let isAuth = localStorage.getItem('isAuth')


const InitState={
    email:"",
    password:"",
}
const LoginPage=()=>{
    const [show, setShow] = useState(false)
    const showClick= () => setShow(!show)
     const [values,setValues]=useState(InitState);
     const toast = useToast();
     const handleChange=(e)=>{
        const {name,value}=e.target;
        setValues({...values,[name]:value})
     }
     const { loading    }=useSelector((state)=>state)
     const dispatch=useDispatch();
     const [nav,setNav]=useState(false);

        const login = useGoogleLogin({
      onSuccess: async tokenResponse =>{
                  try{
                    const res=  await fetch ("https://www.googleapis.com/oauth2/v3/userinfo",{
                      method:'GET',
                      headers:{
                       "Authorization" : `Bearer ${tokenResponse.access_token}`
                      }
                   })
                   let res2=await res.json();
                   console.log(res2);
                  dispatch( get_loading() );
                  let res3=await fetch('https://boat-lifestyle.herokuapp.com/users')
                  let res4=await res3.json();
                  let flag=false;
                  res4.map((elem)=>{
                   if(elem.email===res2.email){
                     localStorage.setItem('userId',elem.id)
                     localStorage.setItem('name',elem.name)
                     flag=true;
                   }
                  })

                  if(flag===false){
                  await fetch('https://boat-lifestyle.herokuapp.com/users',{
                     method:'POST',
                     body: JSON.stringify(res2),
                     headers : {
                         'content-type': 'application/json'
                     }
                   })
                   dispatch( get_loading() );
                  let getRes=await fetch('https://boat-lifestyle.herokuapp.com/users')
                  let users=await getRes.json();
                  users.map((elem)=>{
                    if(elem.email===res2.email){
                      localStorage.setItem("name",elem.name)
                      localStorage.setItem('userId',elem.id)
                    }
                   })
                  
                   dispatch(get_suceess(true));
                   setNav(true);
                   localStorage.setItem("isAuth",true);
                  //  localStorage.setItem("name",res2.name)
                  //  localStorage.setItem('userId',res2.id)
                   toast({
                    title: 'Logged in Sucessfully!',
                    description: "Keep Sailing ",
                    status: 'success',
                    duration: 4000,
                    isClosable: true,
                    position:"top"
                  })
                  }
                  else{
                    setNav(true);
                    dispatch(get_suceess(true));
                    localStorage.setItem("isAuth",true);
                    // localStorage.setItem("name",res2.name)
                    // localStorage.setItem('userId',res2.id)
                    toast({
                      title: 'Logged in Sucessfully!',
                      description: "Keep sailing ",
                      status: 'success',
                      duration: 4000,
                      isClosable: true,
                      position:"top"
                    })
                  }
                }catch(err){
                  console.log(err)
                }
      }
    });

     const handleClick=async(e)=>{
        e.preventDefault();
        console.log(values)
        dispatch( get_loading() );
        let res3=await fetch('https://boat-lifestyle.herokuapp.com/users')
        let res4=await res3.json();
        let flag=false;
        res4.map((elem)=>{
         if(elem.email===values.email && elem.password===values.password ){
           flag=true;
           localStorage.setItem("name",elem.first_name+" "+elem.last_name)
           localStorage.setItem('userId',elem.id)
         }
        })
        if(flag){
           dispatch(get_suceess(true));
           setNav(true);
           localStorage.setItem("isAuth",true);
           toast({
            title: 'Logged in Sucessfully!',
            description: "Keep sailing ",
            status: 'success',
            duration: 4000,
            isClosable: true,
            position:"top"
          })
          }else{
            dispatch(get_error());
            toast({
              title: 'Invalid credential ',
              description: "Have entered wrong crendentials",
              status: 'error',
              duration: 4000,
              isClosable: true,
              position:"top"
            })
          }
       }

      //  if(isAuth==="true"){
      //   return <Navigate to='/'/>
      //   }
       
       if(nav){
        return <Navigate to='/' />
      }

    return (

    <Box width={ {base:"90%", sm:"90%" , md:"60%",lg:"30%"} } margin='auto' marginTop="100px" mb={10}>
    <Stack marginBottom='30px' >
       <Text fontSize='5xl' textAlign='center' fontWeight='100'>Login</Text>
       <Text textAlign='center'>Please enter your e-mail and password:</Text>
    </Stack>
         <form onSubmit={handleClick} >
            <Stack spacing="10px" marginTop="50px">
            <Img onClick={login} width={{ base:"15%",sm:"15%",md:"07%",lg:"10%" }} margin='auto'
             src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABZVBMVEX////qQzU0qFNChfT7vAUxffTQ4PI4gPSdu/ixyPr7ugDqQDH7uAD/vQDqPzDpOioaokMrpk3pNiUopUv86ejpMB3pMR7pLBdDg/zU6tkRoT/4xsP97+773tzpOCf1raj8wgDB4ciXzqTd7+EzqkWj06761tTyl5LrTD/zo57tYVf++PfsWU7+89r914X/9+hdtnPy+fRsvH/yk43taV/wiIHsVUnoJgz2ubX+7cjpNzf//fX+6sD80W/i7PZCh+1OsWcWp1d/q+60271RsmnvenLucmr4zMn1s6/+57L3pAD7wi3uZDryhDT8yEj3pCjsVjzwdTn1lTD5ryPyhzX93JT1ly78zmRcl+250fBRkuj81n3924/94aeRs/OWuuzo2ZeWsTpdrE3UuSeytTZ/sEfnuxtYrE/V4/XLuC1wou2otDyGxpU/i9s8lLk4now+kMk6mp82onQ7l6s3oIA9k745nJJuvr5FAAAK4UlEQVR4nO2baXvbxhGAIYiyYoEHCIhESUqkSQriJSckJcpKndi0qctVz7Ru7BzumTR12ab37y8OHiCJXcwusIulyvdDrueJgNczmJk9JEkbNmzYsGHDhg3R0Dk4Ll3cVloNh1arclEqHR904n6tKOgcllpXJ82ykdcsyhmHctn653zeyDTbg9bFYdzvSM3BTeWqaeS0clpRtvxR0pmyljPOB7drp9kpnZ5r+XIGpbYkmtFymbPWcdxvDeaw1TbyQLk56XI+d317EPfLB3N8upUrpwntZpZari225PGpkiMO3rKkcXYhaJHtVJph9WaRvBLwm9wfaFoUei4Z4/w2bqNFjq+NTGR6DoqWa4jzRZbaOdragqOcH4jhWDrPs/CzyRgCON6c5KL7/Hwc8414C+vhmcHSz6acb8XndzAwWOWnF615E5NgRYu4fqJQjOs4PsfDkzwfP5uMUeEu2OKSoHPyJ/tc/fabGlc/i7TBs+LcMu0QKPJtXl9j5zoXg59FOl/iIniocCqhPhinHARvmfd4HNoJ80wdxJShU9IZtkvHTpt7DV1GMViuHPe34vsE5+QGzASPqbeYIkUxWDX/mydx1pgZSpqVYMmI281BybASvBVEkFkEK4II3vsIMhO8EERwU2RouXkSt5sDuwjuxz6pOSgaK8EO8giXK+wiKJ2IMaox+walq3LccjYMI1iJeT3owjCCx0L0CYaCnUgOdafvmXYu09h/SRP9WIYpKp1FsuJV0vatmUz7anDaaLUap6eDq5OMe9MG9L+zi6BUCb9xb9+VaV63SqtXguzbUk0j+OyDZQQPw1aZdNnYOi3hdsf2L67y+Ls37Bq9RTPcR5gx2hXI290MFPQpMssISo0w05qilRvwy2o3qJsOLL9B6TBEo0jnzi/InnbQKPvcVmEqGGJaS+fOKE5tO5X0ctKwFaSuo0quTbstXcksjIhsBQ9oP0KtGeaA6NRzM4etoDSg6/WhzzH329PcUcpMBSnLjBbBWfStG0ambcKiTVNmlCeRHETvn2uMG71FiWaayTSjuq3dMNJsv0FJOqeYZvLX0T2/lGcsWKLoFEaD7TtFS5P8K2R6bhk5r37UJPRTcnFdPaPjLpH48Q+JBPMC3svG8HEykXj0EwJFJbdmv/Ly072EpfgzuKGxXhGUHlshtBWTPweG0eBzUyk6Pt1LuDz6BUhxvaqoxdOpoKX4a4CitlZ90ObrZGKu+MvATM2cxf3CxNzNY2gTkKnKlqC/o4TmcXJBMPHoM6zikzUroxYfLobQztQm2nH9PkJJSiwb4jI1fRL365LzcXJVMPHoVwhFZhfMGPKlTwidTL0vOSr5+Tn4jOLKVtxvS8FyJcVmam7dpjWb10hDaxRfytR1LDOTZQVKcWkUX7NFr8tTdAgdR++iMd2O+21p+ARvaI3iax7C1YFmRXE2iivncb8sFXdBhonZgKMRng+KwVOA4HTRqMX9slT4jmz+mZrh8QtI0YPphsuZaqzZ7tqEzyFZ6oTxs/WsM74rJwSvqR/y7AFbnmGeHdDvvSQfUxs+3GHLG8yz0WP3CnvUgtLD3W2m7GKe/QpsuPepuIY7mDT9CvwZJl8JbPgW/WxwKU0kPxLXcPcD9LMhM5ubpAl6QfaG79HPhkYwsfe5wIbbz5GPBk2lbpLSd0MOhjvIR38ELqXJT4Q2RBZT2NztGNL3ex6GD1CPDlrgewxDCLI33EW2C3jDD1NKORj+BvXor6GGe3diG74LbximWXAwRDZE8Po3zFTKw/AL1KPBY+nel0Ibols+3PDDjeHaG34ltuF2eEPBY4g0hNdSwQ2RWXpfusX/s+F9mWm2kR0fPHmLPpciDeGrpxC7pTxiiJxLCdaHT0U2RE/e8C1vsdf46NUT/NhC7H0a9Ar4vuy17T5EPht8uCb2filmWx93XWjRUOQ9b8xe2/ySfnCaCnxugTt8en0vzp4we9735PwQc25BcgYc4kNkbog75uZzjs/6dO0l5uHwuxjJ34priG6H8EPgVOp3Q3rDnV0qoIa4U27oCjGV+P0LtU5r+OADKl5CFXE3FYDna6k/yLKs12gNKXm7AzXsYX4KaDJN/eWFbCtyc3N5B40hpllIkLsKqcQ3jqCsVjmpTXgOFMSWUsAd4dS38pQhF7Epz6BJij4fdQha5qf++GJmqBY4yTm8BRea77A/B78InmWoQ7bLSc7hDVAQe63NBreAsjLUI8g3iD1okmJnNhvMrnDqzwt+fIMIHoTQWxgTkMN3KvXNkiDXcgqtpLjl7wTEaJr69k8rghY85Gy+Aycptt87+PeLlQx14TbYvAdPpUGfof/gZg3avoKyXKSeTokAN8Pgz1DyS1N70PYXlLND5nY24Kk7qBs6rKSpM2ij4JKn8BAGDKUuy9V0MmijKHJoim/AIURv6HtZmL4XxxhfAotXWMDrJkivsPEugz2DNgr2fR/st42+o7CAZzb1DtqxfYrwTgFM0vnWt98Y44c6YilIkKPAJJ3VGsQY40OR4fT2jGRnDlJJHZwFBmKM8Y8iu4IKHki3Ye3exZpr0GMMX0V4o9gO2GVb5A6eoWwVXxJ8hNhfJVnmFW6MQSiy+BbfkQiC64wDWQAdimbMgvA6YzNSyRXVccSCRCkasJu/ypDcUFa7kQ5wb8gEyUIoSVWKIMpZObp68+w54REVvFVM6GYpFOViVBMcySQzgfQRBZogWkPqMJJV/3tiQeIQStKYKohWGMMXnOrzHxBHkDiEktTT6QxlPRtuEq93i/JfSRV3cAe/KEy6PLVQh/Ttvz4uWslz9DdCRcJCOmFImae24yWdY72vug89+p6olBL2wtnjitSGclYdkudqtavO/lD1IUm7CN4l9adG+ym676iOSdpjvaar3qTJHv0dnKkEi4olwgjKTiBrMMl6bVhc+eM8+gdQEbp54fdg6mIzRVfV/gjbInv1UV9VfbPl6J+wTKUrMy709XROVlflvlmtrwytvXrVHA91VUdWtCyobRCtmlagG958LHW1qMrd/nhcM2vj8bjfla3/gJGbAGgbAVcTgqDu+/6iFrqu23+D/skdfb8dlKmhBK35NETLiAR9+AU2jOFy1CaKTzEc2LaxQ19HZ/QjTVQqRXTbQP8GEAkhpreoFNFtg7rXe+nFbohsG+E/QpfwjT88R//yUdwhX/YiiL2g2or/XmkbJFvAQVQFUNSXMzWaKjPFFEBRPvrPgmKYcVRYxf96FSMpo8IpztvGbtSCIgw3sj3ZTgYcyMWZ9VScDDi7LAQlaSRCojptg5Eg5WlG5FgDTvTf4JQ6eF3H1JDlfcHeMPaVhj5kfAurH3Omqn22fha1WOtNZOd3OAqB+0fMyHK6Wt7rxpSpOvuLkFPiaf6R34XAUZe519Qs2xuCq/AuOBHf9IBQ4NkauQfQxVR5FdVin3sAXXp9Lo6qzPm3Ob0ULplXVV2N/sYcEVWZqWNWHceUoB5G7ByzxT6f3zsKYjRk8j1mVUH8bKrdYtSOelGA/PRSH+sR9sesKtfE8rPpmUP/GwfE6MVujP0BS30sh5bU1UtTvPB5KNTk4AsIKLK6OjTFqS5I6uZlkcJSV4vdddBz6VVrl7ibMqux0y9rVaGT04dewezLVjB1zBZk1nJTi/LYLKyb3YxefWSOu1b1t9HnOP+eHXbHZnV95bz0evVCtToyzZqNaY6q1UK9dy/UNmzYsGHDhg1C8D/J9batc1Yi+wAAAABJRU5ErkJggg==" alt="" />
         <MDBInput
          label="Email"
          value={values.email}
          name='email'
         size='lg'
         id='typeEmail' type='email'
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
            <Box  textAlign='right' >  <NavLink  style={{color:'red' }} className='hover-underline-animation' to='/forgot_password' > <Text style={{ textUnderlinePosition:'under' }}>forgot password?</Text> </NavLink> </Box>  
        <Button isLoading={loading}
          type='submit' height='50px' style={{ backgroundColor:"red", padding:"20px", textAlign:"center" }}
        variant="contained" color='#ffff' >LOGIN</Button>
       <Text textAlign="center" fontSize='lg'>New Customer <NavLink style={{color:'red' }} color='red' to='/signup' className='hover-underline-animation' > Create an account  </NavLink></Text> 
        </Stack>
      </form>
    </Box>
  )
}

export default LoginPage



//329753716905-d2nbvmp8oij1h9bb17ahglleicodf9mm.apps.googleusercontent.com
{/* <GoogleLogin 
onSuccess={credentialResponse => {
 // console.log(credentialResponse);
  let decode=jwt_decode(credentialResponse.credential)
  console.log(decode)
}}
onError={() => {
  alert('Login Failed');
}}
/>; */}

// const loginwithfb=()=>{
//   const provider = new FacebookAuthProvider();
//     signInWithPopup(auth, provider)
//   .then((result) => {
//     // The signed-in user info.
//     const user = result.user;

//     // This gives you a Facebook Access Token. You can use it to access the Facebook API.
//     const credential = FacebookAuthProvider.credentialFromResult(result);
//     const accessToken = credential.accessToken;

//     // ...
//   })
//   .catch((error) => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.customData.email;
//     // The AuthCredential type that was used.
//     const credential = FacebookAuthProvider.credentialFromError(error);

//     // ...
//   });
// }

{/* <Box position='relative' >
<MDBInput
 label="Password"
 id='typePassword'
 size='lg'
 name='password'
 type='password'
 value={values.password}
 onChange={handleChange}
 maxLength='8'
/>
<Box position='absolute' right='2' top='2' >  <NavLink  > <Text style={{ textUnderlinePosition:'under' }}>forgot password?</Text> </NavLink> </Box>  
</Box> */}