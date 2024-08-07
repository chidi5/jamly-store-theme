"use server";
import { Billboard, Category, Customer, Domain, Product, Store } from "@/types";
import { cookies, headers } from "next/headers";
import qs from "query-string";

interface ProductQuery {
  categoryId?: string[];
  isFeatured: boolean;
  limit?: number;
}

interface BillboardQuery {
  isBanner: boolean;
}

export async function getStoreDetails(): Promise<Store> {
  const storeDetailsHeader = headers().get("x-store-details");
  return storeDetailsHeader ? JSON.parse(storeDetailsHeader) : null;
}

export const getStore = async (id: string): Promise<Store> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${id}`;
  const res = await fetch(URL, { next: { revalidate: 0 } });
  return res.json();
};

export const getCategories = async (id: string): Promise<Category[]> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${id}/categories`;
  const res = await fetch(URL, { next: { revalidate: 0 } });
  return res.json();
};

export const getCategory = async (
  id: string,
  storeId: string
): Promise<Category> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/categories`;
  const res = await fetch(`${URL}/${id}`, { next: { revalidate: 0 } });
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
      limit: query.limit,
    },
  });
  const res = await fetch(url, { next: { revalidate: 0 } });
  return res.json();
};

export const getCustomerById = async (
  id: string,
  storeId: string
): Promise<Customer> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/${storeId}/customers`;
  const res = await fetch(`${URL}/${id}`, { next: { revalidate: 0 } });
  return res.json();
};

export const getDomainByCustomDomain = async (
  domain: string
): Promise<Domain> => {
  const URL = `${process.env.NEXT_PUBLIC_API_URL}/stores/domain`;
  const res = await fetch(`${URL}/${domain}`, { next: { revalidate: 0 } });
  return res.json();
};

export const getCookie = async (store: string) => {
  const cookieStore = cookies();
  return cookieStore.get(store);
};

export const deleteCookie = async (store: string) => {
  const cookieStore = cookies();
  return cookieStore.delete(store);
};
