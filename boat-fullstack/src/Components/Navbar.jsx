// import React, { useEffect, useState } from "react";
import { Flex,Box,HStack,InputGroup, Text, PopoverTrigger, PopoverContent, Portal, PopoverArrow, PopoverCloseButton, PopoverFooter, ModalOverlay, ModalContent, ModalCloseButton, useToast} from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {NavLink } from "react-router-dom";
import { Input } from '@chakra-ui/react'
import { FaShoppingCart, FaUserAlt } from 'react-icons/fa';
import { RiCustomerService2Fill } from 'react-icons/ri'
import { AiFillCloseCircle, AiOutlineCloseCircle, AiOutlineSearch } from 'react-icons/ai'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'
import { useMediaQuery } from '@chakra-ui/react'
import Typed from 'react-typed'

import {
  useDisclosure,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
} from "@chakra-ui/react"
import { ChevronDownIcon } from '@chakra-ui/icons'
import { NavbarCategory } from "../Pages/NavbarCategory";
import { Cart } from "../Pages/Cart";
import { useContext, useEffect, useRef, useState } from 'react';
import { AuthContext } from '../AuthContextProvider/AuthContextProvider';
import { MenuOnTab } from '../Pages/MenuOnTab';
import { SearchCategory } from '../Pages/SearchCategory';

const links = [
    {
      to:"/collections/products",
      title:"ALL PRODUCTS"
    },
    {
      to:"/collections/sail-with-boat",
      title:"SAIL WITH BOAT"
    },
    {
      to:"/collections/offer-zone",
      title:"OFFER ZONE"
    },
]


const defaultStyle = {
  color:"black",
}

const activetStyle = {
  color:"black",
  borderBottom:"1px solid black",
}

let userId = localStorage.getItem("userId")

export const Navbar = () => {
  const useType = useRef();

  const {handleLogout} = useContext(AuthContext);

  const [userState, setUserState] = useState({})

  const [isLargerThan1144] = useMediaQuery('(min-width: 1144px)')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [cartVal, setCartVal] = useState(0);
  const toast = useToast()

  const [show, setShow] = useState(false);

  const handleMouseTyped=()=>{
    useType.current.typed.reset();
    useType.current.typed.stop();
    setShow(true);
  }

  useEffect(() =>{
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[userState, cartVal])

  const getUser = ()=>{
    fetch(`https://boat-lifestyle.herokuapp.com/users/${userId}`)
    .then(res=>res.json())
    .then(res=>setUserState(res))
    .catch(err=>console.log(err))
  }
  const logout=()=>{
    toast({
      // title: 'Account created.',
      description: "You've successfully logged out",
      status: 'warning',
      duration: 5000,
      isClosable: true,
      position:"top"
    })
    handleLogout();
  }

  let isAuth = localStorage.getItem('isAuth');
  
  if(isAuth===null){
    localStorage.setItem('isAuth',false)
  }
  
  return (
    <>
      {isLargerThan1144 ? <Box boxShadow='md' width="100%" padding="24px" bg='white' position="fixed" top="0" zIndex="1000">
      <Flex display="flex" color='white' width="98%" margin="auto" justifyContent="space-between" >
        <Box width="10%" >
          <NavLink to="/"><Image width="100%" src='https://cdn.shopify.com/s/files/1/0057/8938/4802/files/logo_gif_160x40.gif?v=1665553354' alt='Dan Abramov' /></NavLink>
        </Box>
        <HStack width="60%" spacing={8}  color="black"  display='flex' justifyContent="center" >
            <Menu isOpen={isOpen} >
                  <MenuButton 
                      fontSize="17px" 
                      variant="ghost"
                      mx={1}
                      py={[1, 2, 2]}
                      px={4}
                      borderRadius={5}
                      // aria-label="Courses"
                      fontWeight="500"
                      onMouseEnter={onOpen}
                      onMouseLeave={onClose}
                      color="black"
                      marginRight="-20px"
                      className='hover-underline-animation'
                      
                  >
                      CATEGORIES {isOpen ? <ChevronDownIcon fontSize="23px" mt={-1.5}/> : <ChevronDownIcon fontSize="23px" mt={-1.5}/>}
                  </MenuButton>
                <MenuList mt={4} onMouseEnter={onOpen} onMouseLeave={onClose}>
                  <NavbarCategory />
                </MenuList>
            </Menu>
          {links.map((link)=>(
            <Box fontSize="17px" fontWeight="500" color="black" key={link.to}>
              <NavLink className='hover-underline-animation' style={({isActive})=>(isActive ? activetStyle : defaultStyle)} to={link.to} end>
                {link.title} 
                {/* <Text color="black">{link.title}</Text> */}
              </NavLink>
            </Box>
          ))}
          <Menu>
            <MenuButton as={Text}fontSize="17px" fontWeight="500"  bg="white" className='hover-underline-animation'>
              MORE <ChevronDownIcon fontSize="23px" mt={-1.5}/>
            </MenuButton>
            <MenuList mt={6}>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        <HStack width="35%" spacing={6}  color="black"  display='flex' justifyContent="flex-end"  >
          <Box > 
            <InputGroup bg="#eaeaea" borderRadius="25px" variant="unstyled" width="300px" height="45px" padding="10px">
              <Text fontSize='25px' ><AiOutlineSearch /></Text>
              <Typed  ref={useType} fontSize='15px'  strings={["Search Speakers","Search Neckbands","Search Smartwatches","Search Earphones"]}  typeSpeed={150} backSpeed={100}  loop   >
              <Input  type='text' variant='unstyled' color="black" size='lg'  onClick={handleMouseTyped} /></Typed>
              {show ? <AiOutlineCloseCircle onClick={()=>{
                setShow(false)
                useType.current.typed.start();
                }} color="black" fontSize="25px"/> : <></>}
              {show ? <SearchCategory setShow={setShow} /> : <></>}
            </InputGroup>
          </Box>
          <Box>
            <NavLink>
              {isAuth ==="false" || undefined ?
                <Menu>
                  <MenuButton as={Text} fontSize="20px" fontWeight="500" colorScheme="white" bg="white">
                  <FaUserAlt color="black" fontSize="20px" />
                  </MenuButton>
                  <MenuList mt={6} colorScheme="white" bg="white">
                    <MenuItem _focus={{bg:"white"}} >
                      <Text color="red">Hi boAthead!</Text>
                    </MenuItem>
                    <MenuItem  _focus={{bg:"white"}} >
                      <Box textAlign="center" p={2}  width="100%" colorScheme="#ea2127" bg="#ea2127" color="white"> <NavLink  to="/login"><Text color="white">Login</Text></NavLink></Box>
                    </MenuItem>
                  </MenuList>
                </Menu> : <Menu>
                    <MenuButton as={Text} fontSize="20px" fontWeight="500" colorScheme="white" bg="white">
                    <FaUserAlt color="black" fontSize="20px" />
                    </MenuButton>
                    <MenuList mt={6} colorScheme="white" bg="white">
                      <MenuItem _focus={{bg:"white"}} >
                        <Text color="red">Hi User!</Text>
                      </MenuItem>
                        <NavLink to="/orders">
                          <MenuItem _focus={{bg:"white"}} >
                              <Text color="black">Manage Your Order</Text>
                          </MenuItem>
                        </NavLink>
                      <NavLink to="/account">
                        <MenuItem _focus={{bg:"white"}} >
                          <Text color="black">Account</Text>
                        </MenuItem>
                      </NavLink>
                      <MenuItem  _focus={{bg:"white"}} >
                        <Box textAlign="center" p={2} onClick={()=>logout()}  width="100%" colorScheme="#ea2127" bg="#ea2127" color="white"><Text color="white">Logout</Text></Box>
                      </MenuItem>
                    </MenuList>
                </Menu>
              }         
            </NavLink>
          </Box>
          <Box><NavLink><RiCustomerService2Fill color="black" fontSize="22px"/></NavLink></Box>
          <Box>
            <NavLink>
              <Text position="absolute" top="6" right="7" fontSize="12px" w="20px" textAlign="center" h="20px" color="white" bg="red" colorScheme="red" borderRadius="50%">{cartVal}</Text>
              {/* <FaShoppingCart color="black" fontSize="22px"/> */}
              <Cart setCartVal={setCartVal}/>
            </NavLink>
          </Box>
        </HStack>
      </Flex>
      </Box> : <Box boxShadow='md' width="100%" padding="10px" bg='white' > 
      <Flex color='black' width="98%" margin="auto" justifyContent="space-between">
        <Box width="10%" display="flex" justifyContent="space-between" alignItems="center">
          <NavLink to="/">
            <MenuOnTab />
            {/* <HiOutlineMenuAlt1 fontSize="30px"/> */}
          </NavLink>
        </Box>
        <Box width={{base:"20%",md:"11%"}} mt={3}  display="flex" justifyContent="center">
          <NavLink to="/">
            <Image width="100%" src='https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Asset_2_288x-8_5_small.png?v=1661838672' alt='Dan Abramov' />
          </NavLink>
        </Box>
        <Box width={{base:"30%",md:"20%"}}   display="flex" justifyContent="space-around" alignItems="center">
          <Box zIndex="1000">
            <NavLink>
              {isAuth ==="false" || undefined ?
                <Menu>
                  <MenuButton as={Text} fontSize="20px" fontWeight="500" colorScheme="white" bg="white">
                  <FaUserAlt color="black" fontSize="20px" />
                  </MenuButton>
                  <MenuList mt={6} colorScheme="white" bg="white">
                    <MenuItem _focus={{bg:"white"}} >
                      <Text color="red">Hi boAthead!</Text>
                    </MenuItem>
                    <MenuItem  _focus={{bg:"white"}} >
                      <Box textAlign="center" p={2}  width="100%" colorScheme="#ea2127" bg="#ea2127" color="white"> <NavLink  to="/login"><Text color="white">Login</Text></NavLink></Box>
                    </MenuItem>
                  </MenuList>
                </Menu> : <Menu>
                    <MenuButton as={Text} fontSize="20px" fontWeight="500" colorScheme="white" bg="white">
                    <FaUserAlt color="black" fontSize="20px" />
                    </MenuButton>
                    <MenuList mt={6} colorScheme="white" bg="white">
                      <MenuItem _focus={{bg:"white"}} >
                        <Text color="red">Hi User!</Text>
                      </MenuItem>
                        <NavLink to="/orders">
                          <MenuItem _focus={{bg:"white"}} >
                              <Text color="black">Manage Your Order</Text>
                          </MenuItem>
                        </NavLink>
                      <NavLink to="/account">
                        <MenuItem _focus={{bg:"white"}} >
                          <Text color="black">Account</Text>
                        </MenuItem>
                      </NavLink>
                      <MenuItem  _focus={{bg:"white"}} >
                        <Box textAlign="center" p={2} onClick={()=>logout()}  width="100%" colorScheme="#ea2127" bg="#ea2127" color="white"><Text color="white">Logout</Text></Box>
                      </MenuItem>
                    </MenuList>
                </Menu>
              }         
            </NavLink>
          </Box>
          <Box><NavLink><RiCustomerService2Fill color="black" fontSize="22px"/></NavLink></Box>
          {/* <Box><NavLink><FaUserAlt color="black" fontSize="22px" /></NavLink></Box> */}
          <Box>
            <NavLink>
              <Text position="absolute" top={{base:"4",md:"4"}} right={{base:"4",md:"6"}}  fontSize="12px" w="20px" textAlign="center" h="20px" color="white" bg="red" colorScheme="red" borderRadius="50%">{cartVal}</Text>
              {/* <FaShoppingCart color="black" fontSize="22px"/> */}
              <Cart setCartVal={setCartVal}/>
            </NavLink>
          </Box>
        </Box>
      </Flex>
    </Box>}
    </>
  );
};

