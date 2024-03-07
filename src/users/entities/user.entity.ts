import { UUID } from "crypto";

export interface User {
  _id: UUID;
  firstName: string;
  lastName: string;
  password: string;
  email?: string;
  weight?: number;
  height?: number;
  username?: string;
  notifications?: boolean;
}