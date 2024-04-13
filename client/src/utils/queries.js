import { gql } from '@apollo/client';

export const QUERY_PRODUCTS = gql`
query Query {
  products {
    name
    _id
    category {
      name
    }
    
    description
    price
    image
    rating
    quantity
    reviews {
      userId
      commentText
      createdAt
    }
    likes {
      _id
    }
  }
}


`;

export const QUERY_SINGLE_PRODUCT = gql`
query Product($id: ID!) {
  product(_id: $id) {
    _id
    category {
      name
    }
    description
    discount_price
    image
    likes {
      _id
    }
    name
    price
    quantity
    rating
    reviews {
      createdAt
      commentText
      userId
    }
  }
}
`;


export const QUERY_CHECKOUT = gql`
query Checkout($products: [ProductInput]) {
  checkout(products: $products) {
    session
  }
}
`;

export const QUERY_ALL_PRODUCTS = gql`
query Query {
  products {
    name
    _id
    category {
      name
    }
    
    description
    price
    image
    rating
    quantity
    reviews {
      userId
      commentText
      createdAt
    }
    likes {
      _id
    }
  }
}

`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
query User($email: String!) {
  user(email: $email) {
    _id
    address
    city
    email
    firstName
    isAdmin
    lastName
    zip
    state
  }
}
`;

export const QUERY_ALL_REVIEWS = gql`
  {
    reviews {
      _id
      commentText
      createdAt
      userId {
        firstName
        lastName
      }
    }
  }
`;
