"use client";

import { FacebookIcon, InstagramIcon, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  return (
    <footer className="bg-white border">
      <MaxWidthWrapper className="mx-auto w-full py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <Image
                src="https://flowbite.com/docs/images/logo.svg"
                width="32"
                height="32"
                className="h-8 me-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap">
                {"Store Name"}
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">
                Quick Links
              </h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4">
                  <Link href="/" className="hover:underline">
                    Shoes
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Shoes
                  </Link>
                </li>
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
            <Link href="/" className="hover:underline font-bold">
              Jamly™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-900">
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Facebook page</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 ms-5">
              <InstagramIcon className="h-5 w-5" />
              <span className="sr-only">Discord community</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 ms-5">
              <XIcon className="h-5 w-5" />
              <span className="sr-only">Twitter page</span>
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
