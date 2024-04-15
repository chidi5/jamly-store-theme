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
  selectedOption: OptionValue[];
};

export type Option = {
  id: string;
  name: string;
};

export type OptionValue = {
  id: string;
  value: string;
  option: Option[];
};
