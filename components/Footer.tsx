import { getCategories } from "@/lib/queries";
import { Store } from "@/types";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import NavItems from "./NavItems";

const Footer = async ({ store }: { store: Store }) => {
  const categories = await getCategories(store.id);

  return (
    <footer className="bg-gray-100/70 border-0">
      <MaxWidthWrapper className="mx-auto w-full py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {store.name}
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-4 sm:grid-cols-3">
            <div>
              <ul className="text-gray-600 text-sm font-medium">
                <NavItems
                  data={categories}
                  className="flex-col gap-2 items-start"
                />
              </ul>
            </div>
            <div>
              <ul className="text-gray-600 text-sm font-medium">
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
              <ul className="text-gray-600 text-sm font-medium">
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
