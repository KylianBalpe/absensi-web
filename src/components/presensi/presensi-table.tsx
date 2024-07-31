import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

const PresensiTable = async ({ response }: { response: any }) => {
  const session = await getServerSession(authOptions);
  const presensi = response.data.presensi;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID Presensi</TableHead>
            <TableHead>Nama Dosen</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Waktu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {presensi || presensi.length > 0 ? (
            presensi.map((data: any) => (
              <TableRow key={data.id}>
                <TableCell className="font-medium">{data.id}</TableCell>
                <TableCell className="font-medium">{data.name}</TableCell>
                <TableCell className="font-medium">{data.status}</TableCell>
                <TableCell className="font-medium">
                  {daysOfWeek[new Date(data.time).getDay()]}{" "}
                  {`${String(new Date(data.time).getUTCDate()).padStart(2, "0")}-${String(new Date(data.time).getUTCMonth() + 1).padStart(2, "0")}-${new Date(data.time).getUTCFullYear()} ${String(new Date(data.time).getUTCHours()).padStart(2, "0")}:${String(new Date(data.time).getUTCMinutes()).padStart(2, "0")}:${String(new Date(data.time).getUTCSeconds()).padStart(2, "0")}`} WIB
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                <div className="flex h-64 w-full flex-col items-center justify-center">
                  No presensi found.
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default PresensiTable;
