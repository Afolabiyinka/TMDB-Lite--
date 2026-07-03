export type User = {
  name: string;
  profilePic: string;
  email: string;
  [key: string]: any;
};

export type EditUserPayload = {
  email: string;
  username: string;
};

