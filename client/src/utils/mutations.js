import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $address: String!
    $city: String!
    $state: String!
    $zip: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      address: $address
      city: $city
      state: $state
      zip: $zip
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

export const ADD_REVIEW = gql`
mutation Mutation($productId: ID!, $commentText: String!, $userId: ID!) {
  addReview(productId: $productId, commentText: $commentText, userId: $userId) {
    reviews {
      commentText
      createdAt
      userId
    }
  }
}
`;

export const ADD_PRODUCT = gql`
  mutation addProduct(
    $name: String!
    $description: String!
    $price: Float!
    $quantity: Int!
    $category: ID!
  ) {
    addProduct(
      name: $name
      description: $description
      price: $price
      quantity: $quantity
      category: $category
    ) {
      _id
      name
      description
      price
      quantity
      category {
        name
      }
    }
  }
`;

export const ADD_RATING = gql`
mutation Mutation($productId: ID!, $rating: Int!) {
  addRating(productId: $productId, rating: $rating) {
    rating
  }
}
`

export const ADD_LIKE = gql`
mutation AddLike($productId: ID!, $userId: ID!) {
  addLike(productId: $productId, userId: $userId) {
    name
    likes {
      _id
    }
  }
}

`