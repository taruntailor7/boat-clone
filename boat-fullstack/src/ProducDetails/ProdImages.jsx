import { Box, Flex, HStack, Image, VStack } from "@chakra-ui/react";
import React, { useState } from "react";

const ProdImages = ({ objImages, img, setImge }) => {
  // console.log({ imgesData, bgColor, img });
  return (
    <Box ml={[15, 50, "10%", 1]} pl={5} h={625} float="left">
      <Flex mt={10}>
        <VStack align="left" pl={2} mr={5} cursor="pointer">
          {objImages.map((img) => (
            <Box
              h={70}
              w={70}
              border="1px"
              borderColor="gray.200"
              _hover={{ borderColor: "gray.900" }}
              onMouseOver={() => setImge(img)}
            >
              <Image boxSize="full" borderRadius="4" src={img}/>
            </Box>
          ))}
        </VStack>
        <Box
          border="1px"
          // h={[12000, 1200, 1200, 450]}
          // w={[600, 700, 1200, 400]}
          borderRadius="20"
        >
          <Image boxSize="400px" borderRadius="20" src={img} boxShadow="2xl" />
        </Box>
      </Flex>
    </Box>
  );
};

export default ProdImages;
