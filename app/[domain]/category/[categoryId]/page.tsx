import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NoResult from "@/components/no-result";
import ProductCard from "@/components/product-card";
import { getCategory, getProducts } from "@/lib/queries";
import React from "react";

type CategoryPageProps = {
  params: {
    domain: string;
    categoryId: string;
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const category = await getCategory(params.categoryId, params.domain);

  const products = await getProducts(params.domain, {
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
