export type RegisterDto = {
  username: string;
  email: string;
  password: string;
};

export type LoginDto = {
  identifier: string;
  password: string;
};

export type UserDto = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponseDto = {
  jwt: string;
  user: UserDto;
};
