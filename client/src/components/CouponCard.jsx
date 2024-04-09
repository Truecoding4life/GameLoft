import React from 'react';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css'; 

const CouponCard = ({discount,description, coupon})=>{

  const handleCopyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert(`Copied "${coupon}" to clipboard`);
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
                <Button size="small" fullWidth color="primary">
                  Share
                </Button>
             
            </Card>
    )
};

export default CouponCard;