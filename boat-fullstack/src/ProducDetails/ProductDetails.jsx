// import { Input } from "@chakra-ui/react";
import { Box, Flex} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ProdImages from "./ProdImages";
import ProdName from "./ProdName";
import ProductDisc from "./ProductDisc";

const ProductDetails = () => {
  const {id} = useParams();
  const [obj, setObj] = useState({});
  const [objImages, setObjImages] = useState([]);
  const [descimg,setDescImg ]=useState([]);
  const [img, setImg] =useState('');
  const [colors,setColor]=useState([]);

  const getData = ()=>{
    fetch(`https://boat-lifestyle.herokuapp.com/mainProducts/${id}`)
    .then(res=>res.json())
    .then(res=>{
      setObj(res)
      setObjImages(res.image)
      setDescImg(res.disc_img)
      setImg(res.image[0])
      setColor(res.color)
    })
    .catch(err=>console.log(err))
  }
  useEffect(() =>{
    getData();
  },[])


  const imgesData = [
    {
      img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call--4_600x.png?v=1658295340s",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-FI-6.1_1200x.png?v=1662636050",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-FI-5.1_1200x.png?v=1662636050",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-FI-2.1_1200x.png?v=1662636050",
    },
    {
      img: "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-FI-1_1200x.png?v=1662636050",
    },
  ];
  const [bgColor, stBgColor] = React.useState("black");
  // const colors = [
  //   "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call--4_600x.png?v=1658295340",
  //   "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-3_600x.png?v=1658295343",
  //   "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-Copy_600x.png?v=1658306520",
  //   "https://cdn.shopify.com/s/files/1/0057/8938/4802/products/wave-call-CG_600x.png?v=1662636050",
  // ];
  const changeColor = (color) => {
    stBgColor(color);
  };
 
 
  const setImge = (img) => {
    setImg(img);
  };

  return (
    <>
     
      <Box marginTop={{ base:'0px' ,sm:'0px',md:'20px',lg:'100px' }} marginBottom='190px' w="full" h="auto">
        <Flex
          w={["550px", "420px", "full", "full"]}
          direction={["column", "column", "column", "row"]}
          bg="#F5F5F5"
        >
          <Box
            h={625}
            w="full"
            // border="1px"
            bg="#F5F5F5"
          >
            <ProdImages 
              objImages={objImages}
              img={img}
              setImge={setImge}
            />
          </Box>
          <Box h={625} w={["550px", "420px", "full", "full"]}>
            <ProdName colors={colors} setImge={setImge} obj={obj} />
          </Box>
        </Flex>
        <br />
        <ProductDisc descimg={descimg} />
      </Box>
    </>
  );
};

export default ProductDetails;
