import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";

const PaymetDrawer = ({ isOpen, onClose, btnRef }) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>YOUR CART</DrawerHeader>

        <DrawerBody>
          <HStack border="1px" borderColor="gray.400" borderRadius="20">
            <Image
              w="100px"
              h="100px"
              src="https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call--4_160x.png?v=1658295340"
            ></Image>
            <VStack>
              <Text>boAt Wave Call</Text>
              <Text color="red" fontWeight="700">
                Rs. 1,799.00
              </Text>
            </VStack>
          </HStack>
          <br />
          <hr />
        </DrawerBody>
        <HStack justifyContent="space-between" ml={2}>
          <Text color="black" fontWeight="700">
            Total:
          </Text>
          <Text color="red" fontWeight="700">
            Rs. 1,799.00
          </Text>
        </HStack>
        <Button colorScheme="red" w="96%" mt={2} m={2} mr={2} ref={btnRef}>
          CASH ON DELIVERY
        </Button>
        <Button
          w="96%"
          mt={2}
          m={2}
          mb={6}
          mr={4}
          border="2px"
          borderColor="red.500"
          color="red"
        >
          PAY VIA OTHER CARDS
        </Button>
      </DrawerContent>
    </Drawer>
  );
};

export default PaymetDrawer;
