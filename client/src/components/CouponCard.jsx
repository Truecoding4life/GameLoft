import React from 'react';
import { Button, CardActionArea, CardActions, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useStoreContext } from '../utils/GlobalState';
import './style.css';
import { DO_SUCCESS_ALERT, CLOSE_ALERT } from "../utils/actions";

const CouponCard = ({ discount, description, coupon }) => {
  const [state, dispatch] = useStoreContext();
  const successAlert = state.successAlert;
  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        dispatch({
          type: DO_SUCCESS_ALERT,
          successAlert: "Copied to clipboard!",
        });
        setTimeout(() => { 
          dispatch({
            type: CLOSE_ALERT,
          })
          
        
        }, 2000);
      })
      .catch((error) => {
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