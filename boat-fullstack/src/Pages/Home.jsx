import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Image } from '@chakra-ui/react';
import { HomeSailWithBoat } from './HomeSailWithBoat';
import { ShopByCategory } from './ShopByCategory';
import { SlidingImages } from './SlidingImages';
import { HomeBestOfBoat } from './HomeBestOfBoat';
import { CinematicMagic } from './CinematicMagic';
import { ExploreNow } from './ExploreNow';
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.min.css'
import 'owl.carousel/dist/assets/owl.theme.default.min.css'
import { HomeCatchMeAll } from './HomeCatchMeAll';

const images = [
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/web_1_2000x.png?v=1665644267",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/diwali-banner_2000x.gif?v=1664442921",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/SN-Desktop-Banner-Wave-Style_1_2000x.jpg?v=1663914840",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/DESKTOP-Banner-WB_4_2000x.gif?v=1664782144",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/web_3_2000x.png?v=1665752361",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/web_2_2_2000x.png?v=1665727855"
]

const responsive = {
    responsiveClass: true,
    loop:true,
    autoplay:true,
    nav: true,
    dots: true,
    smartSpeed: 300,
    navClass: ['prev', 'next'],
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 1,
        },
        700: {
            items: 1,
        },
        1000: {
            items: 1,
        },
        1200:{
            items:1,
        }
    },
}


export const Home = () => {

  return (
    <Box width="95%" margin="auto" marginTop="40px" zIndex="-1">
        <Box width="100%" marginTop={{base:"-75px",sm:"-85px", md:"-75px",lg:"60px"}}>
            <OwlCarousel {...responsive} className="owl-theme" >
            {images.map((img)=>(
                <Box key={img} className='hover-underline-banner' width="100%" margin="auto" mt={10} >
                    <Image w="100%"  src={img} />
                </Box>
            ))}
            </OwlCarousel>
        </Box>
        <HomeSailWithBoat />
        <ShopByCategory />
        <SlidingImages />
        <HomeBestOfBoat />
        <CinematicMagic />
        <ExploreNow />
        <HomeCatchMeAll />
    </Box>
  )
}
