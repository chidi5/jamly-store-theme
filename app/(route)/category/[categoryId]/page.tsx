import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NoResult from "@/components/no-result";
import ProductCard from "@/components/product-card";
import { getCategory, getProducts, getStoreDetails } from "@/lib/queries";
import { redirect } from "next/navigation";
import React from "react";

type CategoryPageProps = {
  params: {
    categoryId: string;
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const store = await getStoreDetails();

  if (!store) {
    redirect("/site");
  }

  const category = await getCategory(params.categoryId, store.id);

  const products = await getProducts(store.id, {
    categoryId: [category.id],
    isFeatured: true,
  });

  return (
    <MaxWidthWrapper>
      <div className="my-10">
        <h2 className="text-5xl capitalize">{category.name}</h2>
      </div>
      <div className="flex justify-between">
        <div>Filter:</div>
        <div className="ml-auto text-muted-foreground">{`${products.length} products`}</div>
      </div>
      <div className="my-10">
        {products.length === 0 && <NoResult />}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <ProductCard key={product.id} data={product} />
          ))}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default CategoryPage;
