import { getCategories } from "@/lib/queries";
import { Store } from "@/types";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavItems from "./NavItems";

const Footer = async ({ store }: { store: Store }) => {
  const categories = await getCategories(store.id);
  /*const routes = categories.map((route) => ({
    href: `/category/${route.handle}`,
    label: route.name,
    active: pathName === `/category/${route.handle}`,
  }));*/
  return (
    <footer className="bg-white border">
      <MaxWidthWrapper className="mx-auto w-full py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {store.name}
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Quick Links
              </h2>
              <ul className="text-gray-500 font-medium">
                <NavItems
                  data={categories}
                  className="flex-col gap-2 items-start"
                />
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Follow us
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Instagram
                  </Link>
                </li>
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Tiktok
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase ">
                Legal
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center">
            © 2024{" "}
            <Link href="/" className="hover:underline font-semibold">
              Jamly™
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
