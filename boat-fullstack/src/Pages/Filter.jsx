/* eslint-disable jsx-a11y/aria-proptypes */
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, Input, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { BsFilterLeft } from 'react-icons/bs';

export const Filter = ({handleFilter}) => {
    const [size, setSize] = React.useState('')
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sliderValue, setSliderValue] = useState([])

    const handleClick = (newSize) => {
        setSize(newSize)
        onOpen()
    } 

    const filterByRange = (val)=>{
      setSliderValue(val)
    }

    handleFilter(sliderValue)

    // const handleChangeMin = (e)=>{
    //   console.log(e.target.value,"min")
    //   setSliderValue(sliderValue[0]=e.target.value)
    // }
    // const handleChangeMax = (e)=>{
    //   console.log(e.target.value,"max")
    //   setSliderValue(sliderValue[1]=e.target.value)
    // }

    const sizes = ['sm']
    

    return (
       <Box   textAlign={{ base:'center' , sm:'center' ,md:"left" ,lg:"left" }} >
        {sizes.map((size) => (
            <Button 
              onClick={() => handleClick(size)}
              key={size}
              m={4}
              
            ><BsFilterLeft  fontSize="40px" />Show filters </Button>
          ))}

      <Drawer placement="left" onClose={onClose} isOpen={isOpen} size={size}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" fontSize="15px" />
          <DrawerHeader bg="#ff0000" p={2} color="white"><Text>Filters</Text></DrawerHeader>
          <DrawerBody>
            <Accordion defaultIndex={[0]} allowMultiple>
              {/* <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                       Availability
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  box
                </AccordionPanel>
              </AccordionItem> */}

              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      Price
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <RangeSlider colorScheme="red" aria-label={['min', 'max']} min={399} max={10000} defaultValue={[0, 10000]} onChange={(val) => filterByRange(val)}>
                    <RangeSliderTrack>
                      <RangeSliderFilledTrack />
                    </RangeSliderTrack>
                    <RangeSliderThumb index={0} />
                    <RangeSliderThumb index={1} />
                  </RangeSlider>
                  <Box display="flex" alignItems="center" width="100%" justifyContent="space-between" >
                    <Input width="40%" type="number" placeholder='min' value={sliderValue[0]} size='md'  />
                    <Text width="20%" textAlign="center">to</Text>
                    <Input width="40%" type="number" placeholder='max' value={sliderValue[1]} size='md' />
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      </Box> 
    )
}
