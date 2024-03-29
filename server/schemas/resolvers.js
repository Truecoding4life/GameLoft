const { User, Product, Category, Order, Review } = require("../models");
const { signToken, AuthenticationError } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51ONTIVHTFh8Wci3cJtLIlL13zdb1MbBsYiou3PBy4aYQmMxXGENNkOIv2fB1PCaxuAbvLYLzHmD30swJXni08xQ800uWiYh07D"
);

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },

    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },

    user: async (_, args, context) => {
      if (context.user) {
        const user = await User.findOne({ email: args.email });
        return user;
      }

      throw new AuthenticationError("User not authenticated");},
    allUsers: async () => {
      return await User.find({});
    },

    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw AuthenticationError;
    },

    getAllLikes: async (parent, { _id }) => {
      const product = await Product.findById(_id).populate("likes");

      return product.likes;
    },

    checkout: async (parent, args, context) => {
      try {
        const url = new URL(context.headers.referer).origin;
        await Order.create({ products: args.products.map(({ _id }) => _id) });
        // eslint-disable-next-line camelcase
        const line_items = [];

        // eslint-disable-next-line no-restricted-syntax
        for (const product of args.products) {
          line_items.push({
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
                description: product.description,
                images: [`${product.image}`],
              },
              unit_amount: parseInt(product.price) * 100,
            },
            quantity: product.purchaseQuantity,
          });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${url}/success`,
          cancel_url: `${url}/`,
        });
        return { session: session.id };
      } catch (err) {
        console.log(err);
      }
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      console.log(user);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { products }, context) => {
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw AuthenticationError;
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, {
          new: true,
        });
      }

      throw AuthenticationError;
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },

    addReview: async (parent, { productId, commentText }) => {
      return Review.findOneAndUpdate(
        { _id: productId },
        {
          $addToSet: { reviews: { commentText } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeReview: async (parent, { productId, reviewId }) => {
      return Product.findOneAndUpdate(
        { _id: productId },
        { $pull: { reviews: { _id: reviewId } } },
        { new: true }
      );
    },

    addRating: async( parent, { productId, rating}) =>{
      return Product.findOneAndUpdate(
        { _id: productId},
        { $push: { rating: rating}},
        {
          new: true,
          runValidators: true,
        }
      );
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      console.log("This is a login");
      if (!user) {
        throw AuthenticationError;
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },

    addLike: async (parent, { productId, userId }) => {
      return Product.findOneAndUpdate(
        { _id: productId },
        {
          $addToSet: { likes: { userId } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },

    removeLike: async (parent, { productId, userId }) => {
      return Product.findOneAndUpdate(
        { _id: productId },
        {
          $pull: { likes: { userId } },
        },
        {
          new: true,
          runValidators: true,
        }
      );
    },
  },
};

module.exports = resolvers;
