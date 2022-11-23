import React, { useEffect, useState } from 'react'
import { Box, Grid, Image } from '@chakra-ui/react'
import { NavLink } from 'react-router-dom';


export const SearchCategory = ({setShow}) => {
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

  const filtered = categoryData.filter((cat)=>{
    return cat.id !== 12
  })
return (
    <Box position="absolute" borderRadius="5px" bg="white" width="100%" h="180px" mt="36px" >
      <Grid width="90%" margin="auto" templateColumns={{base:"repeat(1, 1fr)", sm:"repeat(2, 1fr)", md:"repeat(3, 1fr)", lg:"repeat(5, 1fr)"}} gap={1} marginTop="10px">
          {filtered.map((cat)=>(
              <NavLink key={cat.id} to={`/collections/${cat.id}/${cat.url}`} >
                  <Box data-aos="fade-up" onClick={()=>setShow(false)} w="50px" bg="#e6edfe" borderRadius="5px" textAlign="center" position="relative">
                      <Box w="100%" margin="auto" zIndex="1000">
                          <Image width="100%" src={cat.categoryImage} alt="image"/>
                      </Box>
                  </Box>
              </NavLink>
          ))}
      </Grid>
    </Box>
  )
}
