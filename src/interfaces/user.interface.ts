export interface User {
  id: string;
  name: string;
  email: string;
  role: "SUPER_USER" | "INVENTORY" | "SELLER" | "BUYER";
  password: string;
  createdAt: Date;
}
