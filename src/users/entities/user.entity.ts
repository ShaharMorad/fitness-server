import { UUID } from "crypto";

export interface User {
  id: UUID;
  firstName: string;
  lastName: string;
  password: string;
  email?: string;
  weight?: number;
  height?: number;
  username?: string;
  notifications?: boolean;
}