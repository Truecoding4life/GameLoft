import * as React from "react";
import { Stack, Typography } from "@mui/material";
import CouponCard from "./CouponCard";

const CouponsList = [
  {
    id: 1,
    name: "20% off First Purchase",
    description: "This Only Work for first time Buyer",
    coupon: "FIRST20",
  },
  {
    id: 2, name: "10% off for Loyal Customer",
    description: "Loyal Customer",
    coupon: "LOYAL4EVA",
  },
  {
    id: 3,
    name: "15% off Big Purchase",
    description: "Take 15% off for order of 100$ or more",
    coupon: "15OFF",
  },
];

const Coupons = () => {
  return (
    <>
      <Stack direction="column" alignItems="center" margin={'auto'} spacing={2} p={2}>
      <Typography className="no-favorite-text" sx={{textShadow:4}} variant="h4">Click to copy coupon to clip board</Typography>
      <Stack
        direction="row"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
        spacing={5}
        flex={4}
        p={2}
      >
        {CouponsList.map((coupon) => (
          <CouponCard
            discount={coupon.name}
            description={coupon.description}
            coupon={coupon.coupon}
            key={coupon.id}
          />
        ))}
      </Stack>
    </Stack>
    </>
  );
};

export default Coupons;
