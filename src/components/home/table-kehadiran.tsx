import React from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TableKehadiran({
  absensiData,
  title,
}: {
  absensiData: any;
  title: string;
}) {
  const data = absensiData;
  return (
    <Card className="h-min">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              {data[0].time !== null ? <TableHead>Waktu</TableHead> : ""}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                {item.time !== null ? (
                  <TableCell>
                    {` ${String(new Date(item.time).getUTCHours()).padStart(2, "0")}:${String(new Date(item.time).getUTCMinutes()).padStart(2, "0")}:${String(new Date(item.time).getUTCSeconds()).padStart(2, "0")}`}{" "}
                    WIB
                  </TableCell>
                ) : (
                  ""
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
