import { ProductVariant } from "./product-variant.interface";
import { User } from "./user.interface";
import { Warehouse } from "./warehouse.interface";

export interface WarehouseTransfer {
  id: string;
  productVariant: ProductVariant;
  fromWarehouse?: Warehouse;
  toWarehouse?: Warehouse;
  transferDate: Date;
  quantity: number;
  requestedByUser?: User;
  approvedByUser?: User;
  approvedAt?: Date;
  status: string;
}
