import React, { useEffect, useState } from 'react'
import { Box, Grid, Image, Text } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';

export const NavbarCategory = () => {
    const [categoryData, setCategoryData] = useState([]);

    const getData = ()=>{
        fetch(`https://boat-lifestyle.herokuapp.com/shopByCategory`)
        .then(res=>res.json())
        .then(res=>setCategoryData(res))
        .catch(err=>console.log(err))
    }

    useEffect(() =>{
        getData();
    },[])

    // const filtered = categoryData.filter((cat)=>{
    //   return cat.id !== 12
    // })

    return (
        <Box width="90%" margin="auto">
            <Grid width="100%" margin="auto" templateColumns={{base:"repeat(1, 1fr)", sm:"repeat(2, 1fr)", md:"repeat(3, 1fr)", lg:"repeat(4, 1fr)"}} gap="10px 200px" my={10}>
                {categoryData.map((cat)=>(
                    <NavLink key={cat.id} to={`/collections/${cat.id}/${cat.url}`} >
                        <Box data-aos="fade-up" w="100%" textAlign="center" position="relative">
                            <Box w="70%" margin="auto" zIndex="1000">
                                <Image width="100%" src={cat.categoryImage} alt="image"/>
                            </Box>
                            <Text fontWeight="500" mt={3} fontSize="15px" color="black">{cat.category}</Text>
                        </Box>
                    </NavLink>
                ))}
            </Grid>
        </Box> 
    )
}
