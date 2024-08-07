import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

const Page = async () => {
  return (
    <MaxWidthWrapper className=" max-w-screen-xl">
      <section className="rounded-xl transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(152,245,249,.5)_100%)]">
        <div className="py-28 px-6 lg:px-12 text-center space-y-4 lg:space-y-8">
          <p className="text-base lg:text-xl text-gray-600 font-semibold inline-flex items-center">
            create a store @ &nbsp;
            <Link
              href="https://getjamly.com"
              target="_blank"
              className="underline text-foreground"
            >
              jamly
            </Link>
          </p>
          <div>
            <h1 className="text-2xl lg:text-5xl font-bold">
              Sorry, this store is currently unavailable.
            </h1>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Page;
