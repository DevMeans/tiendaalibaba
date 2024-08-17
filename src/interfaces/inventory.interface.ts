import { ProductVariant } from "./product-variant.interface";
import { Supplier } from "./supplier.interface";
import { Warehouse } from "./warehouse.interface";

export interface Inventory {
    id: bigint;
    productVariant: ProductVariant;
    productVariantId: bigint;
    supplier?: Supplier;
    supplierId?: bigint;
    purchaseDate: Date;
    quantity: number;
    costPrice: number;
    warehouse?: Warehouse;
    warehouseId?: bigint;
  }