export type User = {
  name: string;
  picture: string;
  email: string;
  [key: string]: any;
};

export type EditUserPayload = {
  email: string;
  username: string;
};

