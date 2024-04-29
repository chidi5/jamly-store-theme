"use server";
import qs from "query-string";
import { Billboard, Category, Product, Store } from "@/types";

interface ProductQuery {
  categoryId: string;
  isFeatured: boolean;
}

interface BillboardQuery {
  isBanner: boolean;
}

export const getStore = async (id: string): Promise<Store> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${id}/store`;
  const res = await fetch(URL, { next: { revalidate: 0 } });
  return res.json();
};

export const getCategories = async (id: string): Promise<Category[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${id}/categories`;
  const res = await fetch(URL, { next: { revalidate: 0 } });
  return res.json();
};

export const getBillboard = async (
  id: string,
  storeId: string
): Promise<Billboard> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/billboards`;
  const res = await fetch(`${URL}/${id}`, { next: { revalidate: 0 } });
  return res.json();
};

export const getBillboards = async (
  storeId: string,
  query: BillboardQuery
): Promise<Billboard[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/billboards`;
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      isBanner: query.isBanner,
    },
  });
  const res = await fetch(url, { next: { revalidate: 0 } });
  return res.json();
};

export const getProduct = async (
  id: string,
  storeId: string
): Promise<Product> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/products`;
  const res = await fetch(`${URL}/${id}`, { next: { revalidate: 0 } });
  return res.json();
};

export const getProducts = async (
  storeId: string,
  query: ProductQuery
): Promise<Product[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/products`;
  const url = qs.stringifyUrl({
    url: URL,
    query: {
      categoryId: query.categoryId,
      isFeatured: query.isFeatured,
    },
  });
  const res = await fetch(url, { next: { revalidate: 0 } });
  return res.json();
};
