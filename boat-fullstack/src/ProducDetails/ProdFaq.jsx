import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React from "react";

const ProdFaq = ({ question, ans }) => {
  return (
    <AccordionItem ml={[20, 20, 0, 0]}>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left" fontWeight="700">
            {question}
          </Box>
          <AccordionIcon color="red" />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>{ans}</AccordionPanel>
    </AccordionItem>
  );
};

export default ProdFaq;
