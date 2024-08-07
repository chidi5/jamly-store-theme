export type Domain = {
  storeId: string;
};

export type Customer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
};

export type Billboard = {
  id: string;
  label: string;
  imageUrl: string;
};

export type Category = {
  id: string;
  name: string;
  handle: string;
  imageUrl: string;
  isFeatured: boolean;
  products: Product[];
};

export type Product = {
  id: string;
  categories: Category[];
  name: string;
  handle: string;
  description: string;
  isFeatured: boolean;
  manageVariants: boolean;
  weight: number;
  priceData: PriceData;
  stock: Stock;
  images: Image[];
  options: Option[];
  variants: Variant[];
  additionalInfoSections: AdditionalInfoSection[];
};

enum DiscountType {
  AMOUNT,
  PERCENT,
}

export type discount = { id: string; value: number; type: DiscountType };

export type AdditionalInfoSection = {
  id: string;
  title: string;
  description: string;
};

export type Image = {
  id: string;
  url: string;
};

export type Variant = {
  id: string;
  title: string;
  priceData: PriceData;
  stock: Stock;
  selectedOptions: OptionValue[];
};

export type Option = {
  id: string;
  name: string;
  values: OptionValue[];
};

export type OptionValue = {
  id: string;
  value: string;
  option: Option;
};

export type PriceData = {
  id: string;
  currency: string;
  price: number;
  discountedPrice: number;
};

enum InventoryStatus {
  IN_STOCK,
  OUT_OF_STOCK,
  PARTIALLY_OUT_OF_STOCK,
}

export type Stock = {
  id: string;
  trackInventory: boolean;
  quantity: number;
  inventoryStatus: string;
};

export type PaymentConfig = {
  id: string;
  provider: string;
  publicKey: string;
  secretKey: string;
  isActive: boolean;
};

export type Store = {
  id: string;
  name: string;
  storeLogo: string;
  companyEmail: string;
  companyPhone: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
  billboards: Billboard;
  categories: Category;
  products: Product;
  paymentConfigs: PaymentConfig[];
};

export type SelectedOptions = {
  [key: string]: string;
};

export type CartItems = {
  variant?: string;
  selectedOptions?: SelectedOptions;
  variantTitle?: string;
  variantPrice: number;
  variantInventory: number;
  variantQuantity: number;
  variantTotal: number;
  id: string;
  name: string;
  handle: string;
  images: Image[];
};

export type Session = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  iat: number;
  exp: number;
};

export type Address = {
  address: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
};

// export type CheckoutFormData = {
//   email: string;
//   phone: string;
//   address: Address;
//   isCustomerInfo?: boolean;
// };

export type CheckoutFormData = {
  email: string;
  phone: string;
  address: {
    address: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
  };
  isCustomerInfo?: boolean | undefined;
};
