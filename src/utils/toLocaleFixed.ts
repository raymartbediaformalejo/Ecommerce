type TToLocaleFixed = {
  number: number;
  decimalPlace: number;
};

const toLocaleFixed = ({ number, decimalPlace }: TToLocaleFixed) => {
  return number.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlace,
    maximumFractionDigits: decimalPlace,
  });
};

export default toLocaleFixed;
