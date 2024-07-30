import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddFish = () => {
  return (
    <Button className="gap-1" asChild>
      <Link href="/dashboard/fish/add" className="flex items-center gap-1">
        <CirclePlusIcon className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add Item
        </span>
      </Link>
    </Button>
  );
};

export default AddFish;
