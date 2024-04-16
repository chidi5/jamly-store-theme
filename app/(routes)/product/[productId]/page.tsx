import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/product-list";

const Productpage = async ({ params }: { params: { productId: string } }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
    isFeatured: true,
  });
  return (
    <div className="bg-white">
      <MaxWidthWrapper className="py-10">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Gallery images={product.images} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info data={product} />
          </div>
        </div>
        <hr className="my-10" />
        <ProductList title="Related Items" items={suggestedProducts} />
      </MaxWidthWrapper>
    </div>
  );
};

export default Productpage;
