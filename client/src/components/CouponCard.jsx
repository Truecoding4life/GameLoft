import React from 'react';
import { CardActionArea, CardActions, Box, Card, CardContent, Typography } from '@mui/material';
import './style.css';
import { useDispatch } from 'react-redux';
import { setErrorAlert, clearAlert, setSuccessAlert } from '../utils/feature/alertSlice';


const CouponCard = ({ discount, description, coupon }) => {
  const dispatch = useDispatch();
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        dispatch(setSuccessAlert('Copied to clipboard!'));
        setTimeout(() => {
          dispatch(clearAlert())


        }, 2000);
      })
      .catch((error) => {
        dispatch(setErrorAlert('Failed to copy!'));
        console.error('Failed to copy: ', error);
      });
  };

  return (
    <Card id="coupon-card"
    >
      <CardActionArea
        onClick={() => handleCopyToClipboard(coupon)}
      >
        <CardContent>
          <Typography bottom variant="h5" component="div">
            {discount}
          </Typography>
          <Typography variant="body2" >
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant='p'>Click to copy</Typography>
      </Box>
    </Card>
  )
};

export default CouponCard;