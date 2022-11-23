import { Box, Select } from '@chakra-ui/react'
import React from 'react'

export const Sorting = ({handleChangeForAlpha,handleChangeForPrice}) => {

    return (
        <Box width={{ base:'100%' , sm:'100%' ,md:'40%' , lg:'40%' }} display="flex" justifyContent={{ base:'center', sm:'center' ,md:'flex-end',lg:'flex-end'  }}>
            {/* <Text fontSize="17px" display="flex" alignItems="center" width="30%">Sort by</Text> */}
            {/* <Select focusBorderColor="red.500" width="55%" mt={4} name="name" onChange={handleChangeForAlpha}>
                <option  value=''>Sort by Alphabetically</option>
                <option value='ASC'>Alphabetically, A-Z</option>
                <option value='DESC'>Alphabetically, Z-A</option>
            </Select> */}
            <Select focusBorderColor="red.500"  width="55%" mt={4} name="price" onChange={handleChangeForPrice}>
                <option  value=''>Sort by Price</option>
                <option value='ASC'>Price, low to high</option>
                <option value='DESC'>Price, high to low</option>    
            </Select>
        </Box>
    )
}

// const getValue = ()=>{
    // if(sortByAlpha !== "" && sortByPrice !== ""){
    //    return {
    //     _sort : sortByAlphaName,sortByPriceName,
    //     _order : sortByAlpha,sortByPrice
    //    }
    // }
    // else if(sortByAlpha !== ""){
    //     return {
    //      _sort : sortByAlphaName,
    //      _order : sortByAlpha
    //     }
    //  }
    //  else if(sortByPrice !== ""){
    //     return {
    //      _sort : sortByPriceName,
    //      _order :sortByPrice
    //     }
    // }
// }

                    
