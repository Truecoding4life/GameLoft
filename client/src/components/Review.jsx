import { Box} from "@mui/material";

function Review({review}) {
    const {commentText, createdAt, userId} = review;
    return (
        <Box className='review' >
        <p>{createdAt}</p>
        <h5>{commentText}</h5>
        </Box>
    );
}



export default Review;