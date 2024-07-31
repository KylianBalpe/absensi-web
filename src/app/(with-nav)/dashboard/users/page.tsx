import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddUser from "@/components/users/add-user";
import UsersTable from "@/components/users/users-table";
import { Metadata } from "next";
import { getUsers } from "@/lib/action/crud";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { FetchFishResponse } from "@/lib/definition/fish-type";

export const metadata: Metadata = {
  title: "Users",
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const usersData = await getUsers({
    accessToken: session!.user.accessToken,
  });

  return (
    <main className="grid flex-1 items-start gap-6 sm:py-0">
      <div className="flex flex-row justify-between gap-6">
        <div className="w-full">&nbsp;</div>
        <AddUser />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>Manage your fish data.</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable response={usersData} />
        </CardContent>
      </Card>
    </main>
  );
};

export default Page;
