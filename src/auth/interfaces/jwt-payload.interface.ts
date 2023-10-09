export interface JwtPayload {
  userId: string;
  username: string;
  email: string;
  permissions: string[];
  expiration?: Date;
}
