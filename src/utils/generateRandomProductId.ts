const generateRandomProductId = () => {
  const length = 8;
  const characters = "0123456789";
  let productId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);

    productId += characters.charAt(randomIndex);
  }

  return productId;
};

export default generateRandomProductId;
