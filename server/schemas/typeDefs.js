const typeDefs = `
  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
    reviews: [Review]
    likes: [User]
    discount_price: Float
    rating: [Int]
  }

  type Coupon {
    _id: ID
    name: String
    discount: Float
    expiration: String
  }

  type Review {
    commentText: String
    createdAt: String
    userId: ID
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    address: String
    city: String
    state: String
    zip: String
    email: String
    orders: [Order]
    isAdmin: Boolean
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
    discounted_price: Float
    description: String
  }

  type Query {
    categories: [Category]!
    productsByCategory(category: ID!, name: String): [Product]
    products: [Product]!
    product(_id: ID!): Product
    user(email: String!): User
    order(_id: ID!): Order
    checkout(products: [ProductInput]): Checkout
    GetReviews: [Product]
    allUsers: [User]
    getAllLiked(userId: ID!): [Product] 

  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, address: String!, city: String!, state: String!, zip: String!, email: String!, password: String! ): Auth
    addOrder(products: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String, address: String, city: String, state: String, zip: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    addReview(productId: ID!, commentText: String!, userId: ID!): Product
    removeReview(productId: ID!, reviewId: ID!): Product
    login(email: String!, password: String!): Auth
    createCoupon(name: String!, discount: Float!, expiration: String!): Coupon
    addLike(productId: ID!, userId: ID!): Product
    removeLike(_id: ID!): Product
    addRating(productId: ID!, rating: Int!):Product
  }
`;

module.exports = typeDefs;
