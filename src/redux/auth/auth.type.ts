export type TLogin = {
  username: string;
  password: string;
};

export type TLoginResponse = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  image: string;
  token: string;
};

export type TToken = {
  token: string;
};

export type TUserId = {
  userId: number;
};

export type TRegister = {
  email: string;
  password: string;
  cpassword: string;
  firstname: string;
  lastname: string;
};

export type TUserResponse = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  gender: string;
  image: string;
  token: string;
  maidenname: string;
  age: number;
  phone: string;
  password: string;
  birthDate: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: THair;
  domain: string;
  ip: string;
  address: TAddress;
  macAddress: string;
  university: string;
  back: TBank;
  company: TCompany;
  ein: string;
  ssn: string;
  userAgent: string;
};

type THair = {
  color: string;
  type: string;
};

type TCoordinates = {
  lat: number;
  lng: number;
};

type TAddress = {
  address: string;
  city: string;
  coordinates: TCoordinates;
  postalCode: string;
  state: string;
};

type TBank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

type TCompany = {
  address: {
    address: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    postalCode: string;
    state: string;
  };
  department: string;
  name: string;
  title: string;
};
