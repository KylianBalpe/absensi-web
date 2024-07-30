import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { LogInIcon } from "lucide-react";
// import { authOptions } from "@/lib/authOptions";

const Page = async () => {
  // const session = await getServerSession(authOptions);

  return (
    <div className="flex w-full flex-col items-center justify-center py-8 lg:h-screen lg:py-24">
      <div className="container h-full w-full px-4 md:px-6">
        <div className="grid h-full grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to RekanIkan Library
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Manage your library&apos;s data.
              </p>
            </div>
            {/* {!!session && (
              <Button className="max-w-min" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}
            {!session && (
              <Button className="max-w-min" asChild>
                <Link href="/login">
                  <LogInIcon className="mr-2" size={16} /> Login
                </Link>
              </Button>
            )} */}
            <Button className="max-w-min" asChild>
              <Link href="/login">
                <LogInIcon className="mr-2" size={16} /> Login
              </Link>
            </Button>
          </div>
          {/* <Image
            src="/logo-lg.png"
            width="550"
            height="550"
            alt="Hero"
            className="aspect-square overflow-hidden rounded-xl object-cover sm:h-full md:h-auto md:w-full"
            priority={true}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Page;
