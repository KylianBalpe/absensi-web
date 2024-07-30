import React from "react";
import EditFishForm from "@/components/fish/edit-form";
import { Metadata } from "next";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { FishType } from "@/lib/definition/fish-type";
import { getFish } from "@/lib/action/fish";
import DataNotFound from "@/components/DataNotFound";

export const metadata: Metadata = {
  title: "Edit Fish",
};

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);
  const fishId = Number(params.id);

  const fetchFish = await getFish({
    accessToken: session!.user.accessToken,
    id: fishId,
  });

  const fishes = await fetchFish?.json();
  const fish: FishType = fishes.data?.fish;

  return (
    <SessionProvider session={session}>
      {fish ? <EditFishForm fish={fish} /> : <DataNotFound />}
    </SessionProvider>
  );
};

export default Page;
