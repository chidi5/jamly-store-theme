import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Gallery from "@/components/gallery";
import GalleryCarousel from "@/components/image-carousel";
import Info from "@/components/info";
import ProductList from "@/components/product-list";
import { getProduct, getProducts } from "@/lib/queries";

const Productpage = async ({
  params,
}: {
  params: { domain: string; productId: string };
}) => {
  const product = await getProduct(params.productId, params.domain);
  const categoryIds = product?.categories?.map((category) => category.id) ?? [];
  const suggestedProducts = await getProducts(params.domain, {
    categoryId: categoryIds,
    isFeatured: true,
    limit: 4,
  });
  return (
    <div className="bg-white">
      <MaxWidthWrapper className="py-10">
        <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-4">
          <div className="m-0 p-0 col-span-2">
            <Gallery images={product.images} className="hidden sm:flex" />
            <GalleryCarousel images={product.images} className="sm:hidden" />
          </div>
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
