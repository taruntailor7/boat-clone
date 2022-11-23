import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Flex,
    Container
  } from '@chakra-ui/react'
  
import "../payment_page1/Mystyle.css"
import { Alltabs } from './AllTabs'
import { MyAccordion } from './RightBox'
const breakpoints = {
    sm: '30em',
    md: '48em',
    lg: '62em',
    xl: '80em',
    '2xl': '96em',
  }
 export function MainModal({handleOrders,cartProduct,cartTotal}) {
    const { isOpen  , onOpen, onClose } = useDisclosure()
    return (
      <>
        <Button onClick={onOpen} mt={10} width="100%" height="50px" fontSize="20px" bg="red" color="white" colorScheme="red">Place Order</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}  closeOnOverlayClick={false}>
          <ModalOverlay />
          <ModalContent  maxW="1000px"  h={{base:'750px',md:"500px"}} borderRadius="10px" >
            <ModalHeader> 
              <Box><img style={{width:"60px"}} src="http://cdn.shopify.com/s/files/1/0057/8938/4802/files/Boat-Logo_2_256x256_7343fcda-46a7-4e67-885d-1ad75a441106.png?v=1647426867" alt="logo"/></Box>
            </ModalHeader>
              <ModalCloseButton />
            <ModalBody >
              <Flex  style={{display:"flex",gap:"10px"}}  direction={{base:"column",sm:"column-reverse",md:"row",lg:"row",}}>
                  <Box   w={{lg:"55%",md:"80%",sm:"100%"}}>
                    <Alltabs/>
                  </Box>
                  <Container p={2} borderRadius="10px" style={{boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} w={{lg:"49%",md:"100%",sm:"100%",base:"100%"}}>
                  <MyAccordion handleOrders={handleOrders} cartProduct={cartProduct} cartTotal={cartTotal}/>
                  </Container>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
        
      </>
    )
  }
 
  