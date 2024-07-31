import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { LogInIcon } from "lucide-react";
import { authOptions } from "@/lib/authOptions";
import { getAbsensi } from "@/lib/action/crud";
import Clock from "@/components/Clock";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const absensiData = await getAbsensi();
  const { dosenHadir, dosenPulang,dosenTidakHadir} = absensiData.data;

  return (
    <div className="flex w-full flex-col items-center justify-center py-8 lg:h-screen">
      <div className="container h-full w-full space-y-4 px-4 md:px-6">
        <div className="flex justify-between">
          <Clock />
          <div className="flex flex-col items-end">
            {!!session && (
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
            )}
          </div>
        </div>
        <h1 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
          Absensi Dosen Fikti
        </h1>
        <p className="text-md text-center font-bold tracking-tighter sm:text-lg xl:text-xl/none">
          Universitas Muhammadiyah Sumatera Utara
        </p>
        <div className="grid h-full grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col space-y-4">
            <div className="space-y-2">
              <h1 className="text-lg font-bold tracking-tighter sm:text-xl xl:text-2xl/none">
                Dosen Hadir
              </h1>
              <div className="flex flex-col flex-wrap gap-2">
                <ul className="pl-4">
                  {dosenHadir.map((hadir: any) => {
                    return (
                      <li key={hadir.id} className="list-disc">
                        <p>
                          <span className="font-semibold">{hadir.name}</span>,
                          {` ${String(new Date(hadir.time).getUTCHours()).padStart(2, "0")}:${String(new Date(hadir.time).getUTCMinutes()).padStart(2, "0")}:${String(new Date(hadir.time).getUTCSeconds()).padStart(2, "0")}`}{" "}
                          WIB
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-lg font-bold tracking-tighter sm:text-xl xl:text-2xl/none">
                Dosen Pulang
              </h1>
              <div className="flex flex-col flex-wrap gap-2">
                <ul className="pl-4">
                  {dosenPulang.map((pulang: any) => {
                    return (
                      <li key={pulang.id} className="list-disc">
                        <p>
                          <span className="font-semibold">{pulang.name}</span>,
                          {` ${String(new Date(pulang.time).getUTCHours()).padStart(2, "0")}:${String(new Date(pulang.time).getUTCMinutes()).padStart(2, "0")}:${String(new Date(pulang.time).getUTCSeconds()).padStart(2, "0")}`}{" "}
                          WIB
                        </p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-lg font-bold tracking-tighter sm:text-xl xl:text-2xl/none">
                Dosen Tidak Hadir
              </h1>
              <div className="flex flex-col flex-wrap gap-2">
                <ul className="pl-4">
                  {dosenTidakHadir.map((tidakHadir: any) => {
                    return (
                      <li key={tidakHadir.id} className="list-disc">
                        <p>{tidakHadir.name}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
