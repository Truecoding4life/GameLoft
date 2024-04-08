import React from 'react';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './style.css'; 

const CouponCard = ({discount,description})=>{
    return (
        <Card id="coupon-card" 
    >
              <CardActionArea>
                <CardContent>
                  <Typography bottom variant="h5" component="div">
                   {discount}
                  </Typography>
                  <Typography variant="body2" >
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  Share
                </Button>
              </CardActions>
            </Card>
    )
};

export default CouponCard;