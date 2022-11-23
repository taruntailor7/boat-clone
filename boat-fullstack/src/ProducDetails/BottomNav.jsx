import { Box, Button, Image, Text, useDisclosure } from "@chakra-ui/react";
import React from "react";
import {
  BottomNavigation,
  BottomNavigationItem,
  BottomNavigationIcon,
  BottomNavigationLabel,
  BottomNavigationStyleConfig,
} from "chakra-ui-bottom-navigation";
import { EditIcon } from "@chakra-ui/icons";
import PaymetDrawer from "./PaymetDrawer";

const BottomNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <BottomNavigation
        backgroundColor="#F0F0F0"
        justifyContent="space-between"
        w='100%'
        h="80px"
        pb={2}
        variant="float"
        showLabel="if-active"
      >
        <BottomNavigationItem >
        <Image src="https://cdn.shopify.com/s/files/1/0057/8938/4802/products/main2_529ecf13-c993-4fe7-a2d6-9357f1a47db4_110x.png?v=1650387008"></Image>
        <Text color="Black" fontSize="15px" fontWeight="700" mt={5} ml="10px">
          boAt Watch Xtend‌ with Alexa Built Rs. 2,699.00
        </Text>

        <Button
          backgroundColor="red"
          color="white"
          // borderRadius="full"
          // _active={}
          // active color

          w="150px"
          mt={2}
          m={2}
          mr={2}
          //   ref={btnRef}
          onClick={onOpen}
        >
          ADD TO CART
        </Button>
        </BottomNavigationItem>
        <PaymetDrawer isOpen={isOpen} onClose={onClose} />
      </BottomNavigation>
    </>
  );
};

export default BottomNav;
