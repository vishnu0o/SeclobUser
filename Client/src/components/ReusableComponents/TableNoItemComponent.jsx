import React from 'react'
import Lottie from 'react-lottie' 
import animationData from './NoData.json'
import { Box, Typography } from '@mui/material';

function TableNoItemComponent() {

    const defaultOptions = {
      loop: false,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

  return (
    <Box sx={{ pt: "50px",pointerEvents:"none " }}>
      <Lottie options={defaultOptions} height={400} width={400} />
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "17px",
          textTransform: "capitalize",
          
        }}
      >
        no items found
      </Typography>
    </Box>
  );
}

export default TableNoItemComponent