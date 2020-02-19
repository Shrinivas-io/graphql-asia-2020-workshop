import {
  getProducts,
  getProduct,
  getCartItems,
  getOrders,
  getUser,
  signup,
  login,
  logout,
  addToCart,
  emptyCart,
  placeOrder
} from "./connectors";
// import pubsub from "./pubsub";

const resolvers = {
  User: {
    fullName: (user, args, ctx) => {
      return `${user.firstName} ${user.lastName}`;
    }
  },
  CartItem: {
    user: (cartItem, args, ctx) => {
      return getUser(cartItem.userId);
    },
    product: (cartItem, args, ctx) => {
      return getProduct(cartItem.productId);
    }
  },
  Query: {
    ping: () => true,
    me: (_, args, ctx) => {
      if (!ctx.user) {
        throw new Error("Not logged in");
      }
      return getUser(ctx.user.id);
    },
    products: () => getProducts(),
    product: (_, args) => getProduct(args.id),
    cartItems: (_, args, ctx) => getCartItems(ctx.user.id),
    orders: (_, args, ctx) => getOrders(ctx.user.id)
  },
  Mutation: {
    signup: (_, args, ctx) => signup(args, ctx),
    login: (_, args, ctx) => login(args, ctx),
    logout: (_, args, ctx) => logout(ctx),
    addToCart: (_, args, ctx) => addToCart(args, ctx),
    emptyCart: (_, args, ctx) => emptyCart(args, ctx),
    placeOrder: (_, args, ctx) => placeOrder(args, ctx)
  }
  // Subscription: {
  //   onNewPost: {
  //     resolve(payload, args, ctx) {
  //       return payload;
  //     },
  //     subscribe: () => pubsub.asyncIterator("ON_NEW_POST")
  //   }
  // }
};

export default resolvers;
