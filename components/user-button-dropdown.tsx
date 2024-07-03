"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useUser } from "@/hooks/use-user";
import { LogOut, Settings, UserRound } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const UserDropDownButton = () => {
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none focus:outline-none focus:ring-0">
        <UserRound className="w-5 h-5 text-gray-600 hover:text-gray-700" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 shadow-none">
        <DropdownMenuLabel className="mb-3">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 relative flex-none">
              <Image
                src="/avatar.png"
                fill
                className="rounded-full object-cover"
                alt="avatar image"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-xs">{`${user?.firstName} ${user?.lastName}`}</h1>
              <h3 className="font-normal text-xs">{user?.email}</h3>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem className="py-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="flex items-center gap-4 text-muted-foreground p-0"
          >
            <Settings className="w-3 h-3" />
            <p className="text-xs">Account</p>
          </Button>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSignOut}
            className="flex items-center gap-4 text-muted-foreground p-0"
          >
            <LogOut className="w-3 h-3" />
            <p className="text-xs">Sign out</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
