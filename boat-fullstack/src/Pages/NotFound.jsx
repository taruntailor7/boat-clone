import { Box, Button, Image } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'

export const NotFound = () => {
  return (
    <Box position="relative">
      <Image mt="100px" mb={2} src="https://cdn.shopify.com/s/files/1/0057/8938/4802/files/404.png?v=1620023756"/>
      <NavLink to="/">
        <Button fontSize="25px" top="340px" width="300px" height="50px" color="white" bg="#ae0100" colorScheme="#ae0100" left="730px" position="absolute" >Sail Back Now</Button>
      </NavLink>
    </Box>
  )
}
