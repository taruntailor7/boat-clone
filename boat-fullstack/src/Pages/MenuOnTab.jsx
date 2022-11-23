import {Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { HiOutlineMenuAlt1 } from 'react-icons/hi'

export const MenuOnTab = () => {
    const [size, setSize] = useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const sizes = ['sm']

    const handleClick = (newSize) => {
        setSize(newSize)
        onOpen()
    } 
    
    return (
       <Box  textAlign={{ base:'center' , sm:'center' ,md:"left" ,lg:"left" }} >
        {sizes.map((size) => (
            <Text 
              onClick={() => handleClick(size)}
              key={size}
              m={4}
              bg="white"  
            ><HiOutlineMenuAlt1 fontSize="25px"/></Text>
          ))}

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" fontSize="15px" />
          <DrawerHeader bg="#ff0000" p={2} color="white"><Text>Filters</Text></DrawerHeader>
          <DrawerBody>
            ok
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </Box> 
    )
}
