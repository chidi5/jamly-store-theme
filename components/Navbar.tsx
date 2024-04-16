import getCategories from "@/actions/get-categories";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NavItems from "@/components/NavItems";
import Link from "next/link";
import Cart from "./Cart";
import MobileNav from "./MobileNav";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-20">
      <header className="relative bg-white border border-gray-200">
        <MaxWidthWrapper>
          <div>
            <div className="lg:flex h-20 items-center grid grid-cols-3">
              <MobileNav data={categories} />

              <div className="flex lg:ml-0 items-center justify-center">
                <Link href="/" className="font-bold text-lg sm:text-2xl">
                  Store Name
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block">
                <NavItems data={categories} />
              </div>

              <div className="ml-auto flex items-center">
                <div className="lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  <div className="ml-4 flow-root lg:ml-6">
                    {/* TODO: Cart */}
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
