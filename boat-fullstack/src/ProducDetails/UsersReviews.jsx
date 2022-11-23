import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import ProductsStars from "./ProductsStars";

const UsersReviews = ({ name, comment }) => {
  return (
    <>
      <Box>
        <Flex>
          <Box>
            <Image
              w="40px"
              h="40px"
              mt={9}
              src="https://img.icons8.com/ios-filled/50/000000/user-male-circle.png"
            ></Image>
          </Box>
          <VStack ml={2}>
            <ProductsStars size="15px" mtt="10" />
            <Text mt={-5}>{name}</Text>
          </VStack>
        </Flex>
        <Text textAlign="left" ml={2} mt={1} mb={1} fontWeight="700">
          {comment}
        </Text>

        <hr />
      </Box>
    </>
  );
};

export default UsersReviews;
