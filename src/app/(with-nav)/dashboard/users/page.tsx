import React, { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Search from "@/components/ui/search";
import AddFish from "@/components/fish/add-fish";
import FishTable from "@/components/fish/fish-table";
import { Metadata } from "next";
import { getAllFish } from "@/lib/action/fish";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { FetchFishResponse } from "@/lib/definition/fish-type";
import Pagination from "@/components/ui/pagination";
import TableSkeleton from "@/components/skeleton/table-skeleton";

export const metadata: Metadata = {
  title: "Fish",
};

const Page = async ({
  searchParams,
}: {
  searchParams?: {
    page?: number;
    search?: string;
  };
}) => {
  const session = await getServerSession(authOptions);

  const search = searchParams?.search || "";
  const page = Number(searchParams?.page) || 1;

  const fetchFishes: FetchFishResponse = await getAllFish({
    accessToken: session!.user.accessToken,
    search: search,
  });

  const totalPages = fetchFishes.data?.pagination.totalPages || 1;

  return (
    <main className="grid flex-1 items-start gap-6 sm:py-0">
      <div className="flex flex-row justify-between gap-6">
        <Search placeholder="Search fish name..." />
        <AddFish />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Fish</CardTitle>
          <CardDescription>Manage your fish data.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            key={search + totalPages}
            fallback={<TableSkeleton colSpan={5} />}
          >
            <FishTable search={search} page={page} />
          </Suspense>
        </CardContent>
        <CardFooter>
          <Pagination totalPages={totalPages} />
        </CardFooter>
      </Card>
    </main>
  );
};

export default Page;
