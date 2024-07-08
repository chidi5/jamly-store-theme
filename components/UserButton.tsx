import { UserRound } from "lucide-react";
import Link from "next/link";
import { UserDropDownButton } from "./user-button-dropdown";
import { currentUser } from "@/hooks/use-auth";

const UserButton = async () => {
  const user = await currentUser();

  return (
    <>
      {user ? (
        <UserDropDownButton />
      ) : (
        <Link href="/sign-in" className="hidden md:flex">
          <UserRound className="w-5 h-5 text-gray-600 hover:text-gray-700" />
        </Link>
      )}
    </>
  );
};

export default UserButton;
