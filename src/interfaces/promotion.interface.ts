export interface Promotion {
    id: string;
    name: string;
    description?: string;
    discountPercentage: number;
    minPurchaseAmount: number;
    startDate: Date;
    endDate: Date;
  }
  