import { User } from "@prisma/client";

export interface Order {
  id: string;
  orderDate: Date;
  customerName: string;
  customerEmail: string;
  user: User;
  deliveryAddress: string;
  phoneNumber: string;
  notes?: string;
  isRegisteredUser: boolean;
}
