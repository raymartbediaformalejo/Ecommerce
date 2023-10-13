// import { TVarietiesProduct } from "../types/TProducts";

// export const cartItemVariationAndQuantity = (
//   productId: number
// ): TVarietiesProduct => {
//   const cartItem = cartItems.find((cartItem) => cartItem.id === productId);

//   if (cartItem) {
//     const { quantity, variation } = cartItem;

//     const variationObject = Object.fromEntries(
//       Object.entries(variation || {})
//         .map(([key, value]) => [key, String(value)])
//         .filter(([_, value]) => value.length > 0)
//     );

//     return { quantity: String(quantity), ...variationObject };
//   }

//   return {};
// };
