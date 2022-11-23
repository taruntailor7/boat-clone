import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'

import React from 'react'
import { Box, Image } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'

const images = [
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/AD113.jpg?v=1665574303",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/121_2f8218b7-7c14-4d7b-b493-8e4373939c04.jpg?v=1665574319",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Xtend_2e659993-1b3b-4783-8700-57f824715fbf.jpg?v=1665574331",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/DC_358d830b-e300-49d8-a152-0b5d76ac0cad.jpg?v=1665574227",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/New_6d6c1b24-4044-4cb1-8710-76d572438579.jpg?v=1665574286",
]

const responsive = {
    responsiveClass: true,
    loop:true,
    autoplay:true,
    nav: false,
    dots: false,
    smartSpeed: 300,
    responsive: {
        0: {
            items: 2,
        },
        400: {
            items: 2,
        },
        600: {
            items: 3,
        },
        700: {
            items: 4,
        },
        1000: {
            items: 5,
        },
        1200:{
            items:6,
        }
    },
}


export const ExploreNow = () => {
  return (
    <OwlCarousel {...responsive} >
    {images.map((img)=>(
        <Box key={img} width="95%" margin="auto" mt={10}>
            <Image w="236px" h={{sm:"250px",md:"250px", lg:"312px"}} src={img} borderRadius="10px 10px 0px 0px"/>
            <Button colorScheme="black" bg="black" color="white" width="100%" borderRadius="0px 0px 10px 10px">EXPLORE NOW</Button>
        </Box>
    ))}
    </OwlCarousel>
  )
}
