export type Billboard = {
  id: string;
  label: string;
  imageUrl: string;
};

export type Category = {
  id: string;
  name: string;
  billboard: Billboard;
};

export type Product = {
  id: string;
  category: Category;
  name: string;
  price: string;
  isFeatured: boolean;
  images: Image[];
  options: Option[];
  variants: Variant[];
};

export type Image = {
  id: string;
  url: string;
};

export type Variant = {
  id: string;
  title: string;
  price: string;
  inventory: string;
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
};
