import { Box, HStack, Image } from "@chakra-ui/react";
import React from "react";

const ProductsStars = ({ size, mtt, review }) => {
 
  return (
    <>
      <HStack mt={mtt} ml={2}>
        <Box display="flex" align="left">
          <Image
            w={size}
            h={size}
            src="https://img.icons8.com/ios-glyphs/20/E74C3C/star--v1.png"
            alt=""
          />

        </Box>
      </HStack>
    </>
  );
};

export default ProductsStars;
