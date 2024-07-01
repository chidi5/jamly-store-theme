import { UserRound } from "lucide-react";
import Link from "next/link";

const UserButton = () => {
  return (
    <Link href="/sign-in" className="hidden lg:flex">
      <UserRound className="w-5 h-5 text-gray-600 hover:text-gray-700" />
    </Link>
  );
};

export default UserButton;
