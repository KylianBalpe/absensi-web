import React from "react";
import AddFishForm from "@/components/fish/add-form";
import { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const metadata: Metadata = {
  title: "Add Fish",
};

const Page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <SessionProvider session={session}>
      <AddFishForm />
    </SessionProvider>
  );
};

export default Page;
