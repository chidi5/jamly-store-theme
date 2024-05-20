import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  return (
    <MaxWidthWrapper className=" max-w-screen-xl">
      <section className="mt-28 rounded-xl transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(152,245,249,.5)_100%)]">
        <div className="py-28 px-12 text-center space-y-8">
          <Link
            href={"#"}
            className="text-2xl lg:text-xl text-gray-600 font-bold inline-flex hover:text-gray-700 items-center"
          >
            <ArrowLeft size="25" />
            <span>create a store @ Jamly.</span>
          </Link>
          <div className="pb-10">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Sorry, this store is currently unavailable.
            </h1>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Home;
