import React from 'react';
import {
    Box,
  } from "@chakra-ui/react";
const ImageComponent = () => {
  const imageStyle = {
    width: '280px',
    height: '320px',
    borderRadius: '10px',
    // position: 'fixed',
    marginLeft: '25px',

  };

  return (
    <Box  position="relative" top="800px">
      <img src="/images/Face.png" alt="Dashboard" style={imageStyle} />
    </Box>
  );
};

export default ImageComponent;
