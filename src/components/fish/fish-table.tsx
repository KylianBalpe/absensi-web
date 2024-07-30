import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { getAllFish } from "@/lib/action/fish";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { FetchFishResponse } from "@/lib/definition/fish-type";
import SessionProvider from "@/components/SessionProvider";
import FishAction from "@/components/fish/fish-action";

const FishTable = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const session = await getServerSession(authOptions);

  //   const fetchFishes: FetchFishResponse = await getAllFish({
  //     accessToken: session!.user.accessToken,
  //     search: search,
  //     page: page,
  //   });

  //   const fishes = fetchFishes.data?.fishs;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Latin Name</TableHead>
            <TableHead className="hidden md:table-cell">
              Ideal Temperature
            </TableHead>
            <TableHead className="hidden md:table-cell">Ideal pH</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {fishes ? (
            fishes?.map((fish) => (
              <TableRow key={fish.id}>
                <TableCell className="font-medium">{fish.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {fish.latin_name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {fish.ideal_temperature}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {fish.ideal_ph}
                </TableCell>
                <TableCell>
                  <SessionProvider session={session}>
                    <FishAction fishId={fish.id} />
                  </SessionProvider>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                <div className="flex h-64 w-full flex-col items-center justify-center">
                  No fish found.
                </div>
              </TableCell>
            </TableRow>
          )} */}
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex h-64 w-full flex-col items-center justify-center">
                No fish found.
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default FishTable;
