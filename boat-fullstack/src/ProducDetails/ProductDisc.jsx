import React, { useEffect, useState } from "react";
import { extendTheme } from "@chakra-ui/react";
import {
  Accordion,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import ProdFaq from "./ProdFaq";
import BottomNav from "./BottomNav";
import ProductsStars from "./ProductsStars";
import UsersReviews from "./UsersReviews";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import ProdSpecification from "./ProdSpecification";

const svg = [
  {
    src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon-1b.png?v=1654855622",
    text: "1 Year Warranty",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon-3b.png?v=1654855622",
    text: "7 Days Replacement",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon-2b.png?v=1654855622",
    text: "Free Shipping",
  },
  {
    src: "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/icon-4b.png?v=1654855622",
    text: "Security Chekout",
  },
];

const faqs = [
  {
    question: "Q. What is the warranty period for boAt products?",
    ans: "All boAt products come with a 1-year warranty. For more details, please refer to our Warranty Policy.",
  },
  {
    question: "Q. Does it come with Media controls?",
    ans: "Yes, it comes with media controls.",
  },
  {
    question: "Q. Does it have a heart rate monitor?",
    ans: "Yes, it has a heart rate monitor.",
  },
  {
    question: "Q. Does it have a SpO2 monitor?",
    ans: "Yes, it has a SpO2 monitor.",
  },
  {
    question: "Q. Does it have a sleep monitor?",
    ans: "Yes, it has a sleep monitor.",
  },
  {
    question: "Q. Does it have a sedentary reminder?",
    ans: "Yes, it has a sedentary reminder.",
  },
  {
    question: "Q. Does it have a hydration reminder?",
    ans: "Yes, it has a hydration reminder.",
  },
  {
    question: "Q. Does it have a call reject feature?",
    ans: "Yes, it has a call reject feature.",
  },
];

const req = (page) => {
  return fetch(
    `https://boat-lifestyle.herokuapp.com/reviews?_sort=id&_order=desc&_page=${page}&_limit=5`
  ).then((res) => {
    return res.json();
  });
};

const ProductDisc = ({descimg}) => {
  let [comment, setComment] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    showRev(page);
  }, [page]);
  const showRev = (page) => {
    req(page).then((res) => {
      setComment(res);
    });
  };

  const [review, setReview] = useState({
    name: "",
    comment: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };
  const handleClick = () => {
    fetch(`https://boat-lifestyle.herokuapp.com/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }).then(() => {
      showRev(1);
    });
  };

  // const breakpoints = {
  //   sm: "320px",
  //   md: "768px",
  //   lg: "960px",
  //   xl: "1200px",
  //   "2xl": "1536px",
  // };
  // const theme = extendTheme({ breakpoints });

  return (
    <Box  marginTop={{ base:'-250px',sm:'-250px' ,md:'-200px',lg:'-100px' }} >
      <HStack
        // border="1px"
        // w="full"
        w={["550px", "420px", "full", "full"]}
        h="70px"
        spacing="1%"
        justifyContent="space-between"
      >
        {svg.map((item) => (
          <Flex direction={["column", "column", "row", "row"]}>
            <Image src={item.src} w="50px" h="50px"></Image>
            <Text mt={2} mr={2} textAlign="center">
              {item.text}
            </Text>
          </Flex>
        ))}
      </HStack>
      <ProdSpecification descimg={descimg}/>
      <VStack w="full" h="400px" mb={10} mt={5}>
        <Box w="800px">
          <Text
            fontSize="30px"
            fontWeight="800"
            color="black"
            textAlign="left"
            pl={2}
            ml={[4, 4, 24, 0]}
          >
            FAQs
          </Text>
        </Box>
        <Accordion allowToggle w={["400px", "300px", "600px", "900px"]}>
          {faqs.map((items) => (
            <ProdFaq ans={items.ans} question={items.question} />
          ))}
        </Accordion>
      </VStack>
      <hr />
      {/* <BottomNav /> */}
      <VStack w="full" h="700px" mt={[28, 28, 5, 5]}>
        <Box w={["300px", "400px", "600px", "900px"]}>
          <Text fontSize="30px" fontWeight="800" textAlign="left">
            what boAtheads are saying:
          </Text>
        </Box>
        <HStack w={["300px", "400px", "600px", "900px"]}>
          <VStack w="400px">
            <Box>
              <Text fontSize="12px" textAlign="left" mb={1}>
                Name (displayed publicly like)
              </Text>
              <Input
                w="400px"
                h="35px"
                name="name"
                value={review.name}
                placeholder="Enter Your Name"
                focusBorderColor="gray.300"
                borderColor="gray.200"
                onChange={handleChange}
              ></Input>
            </Box>
            <Box>
              <Text fontSize="12px" textAlign="left" mb={1}>
                Review Title
              </Text>
              <Input
                name="comment"
                value={review.comment}
                w="400px"
                h="35px"
                placeholder="Comment"
                focusBorderColor="gray.300"
                borderColor="gray.200"
                onChange={handleChange}
              ></Input>
            </Box>
            <Box flex w="400px" alignContent="left">
              <Button
                color="white"
                colorScheme="red"
                fontWeight="700"
                onClick={handleClick}
              >
                Submit Review
              </Button>
            </Box>
          </VStack>
          <Box w="full" h="full">
            <ProductsStars />
            <Text fontSize="16px" color="gray" textAlign="left" ml={2}>
              5.0 | Based On 22 Review
            </Text>
          </Box>
        </HStack>
        <Box w={["300px", "400px", "600px", "900px"]} h="full">
          {comment.map((item) => (
            <UsersReviews name={item.name} comment={item.comment} />
          ))}
        </Box>
        <HStack w="900px" h="full" justifyContent="center">
          <ArrowLeftIcon
            cursor="pointer"
            onClick={() => {
              if (page > 1) {
                setPage(page - 1);
              }
            }}
          />
          <Text px={7}>{page}</Text>

          <ArrowRightIcon
            cursor="pointer"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductDisc;
