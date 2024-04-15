import React, { MouseEventHandler } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

type IconButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  icon: React.ReactElement;
  className: string;
};

const iconButton = ({ onClick, icon, className }: IconButtonProps) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white hover:bg-gray-50 border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </Button>
  );
};

export default iconButton;
