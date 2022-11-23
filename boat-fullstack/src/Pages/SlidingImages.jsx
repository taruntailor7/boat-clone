import { Box, Image } from "@chakra-ui/react";

import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";

const responsive = {
  responsiveClass: true,
  loop: true,
  autoplay: true,
  nav: false,
  dots: false,
  smartSpeed: 300,
  responsive: {
    0: {
      items: 1.3,
    },
    400: {
      items: 1.5,
    },
    600: {
      items: 2.2,
    },
    700: {
      items: 2.5,
    },
    1000: {
      items: 3.2,
    },
    1200: {
      items:3.5,
    },
  },
};

export const SlidingImages = () => {
  const images = [
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Gifting-1.jpg?v=1665491728",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Daily-deals-2.jpg?v=1665491727",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Daily-deals.jpg?v=1665491728",
    "https://cdn.shopify.com/s/files/1/0057/8938/4802/files/Newsletter.jpg?v=1665491728",
  ];
  return (
    <OwlCarousel {...responsive}>
      {images.map((img) => (
        <Box key={img} width="95%" margin="auto" mt={10}>
          <Image
            w="100%"
            h={{ sm: "250px", md: "250px", lg: "400px" }}
            src={img}
          />
        </Box>
      ))}
    </OwlCarousel>
  );
};
