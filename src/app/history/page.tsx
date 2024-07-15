"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCookie, getCookies } from "cookies-next";
import { CookiesFn } from "cookies-next/lib/types";
import { formatDate } from "date-fns";
import { PlaneLanding, PlaneTakeoff } from "lucide-react";
import Link from "next/link";

export default function History() {
  const history = JSON.parse(getCookie("history") || "[]");

  const parsedHistory = history;

  const addDays = (date: string, days: number): string => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0]; // Retorna apenas a data no formato 'YYYY-MM-DD'
  };

  const getTimeStamp = (date: any, flexibilidade?: number): string => {
    if (!date || date.trim() === "") return "";
    let newDate = date;
    if (flexibilidade) {
      newDate = addDays(date, flexibilidade);
    }
    const dateTime = new Date(newDate + "T00:00:00Z");
    const timeStamp = dateTime.getTime();
    return timeStamp.toString();
  };

  function busca(
    origem: string,
    destino: string,
    isRoundTrip: boolean,
    dataIda: any,
    dataVolta: any,
    company: any,
    flexibilidade: number
  ) {
    if (company == "SMILES") {
      const idaDates: any[] = Array.from(
        { length: flexibilidade },
        (_, i) => i
      ).map((e) => {
        return getTimeStamp(dataIda, e);
      });

      const voltaDates: any[] = Array.from(
        { length: flexibilidade },
        (_, i) => i
      ).map((e) => {
        return getTimeStamp(dataVolta, e);
      });

      if (dataIda != null && dataIda != undefined) {
        dataIda = getTimeStamp(dataIda);
      }

      if (dataVolta != null && dataVolta != undefined) {
        if (!isRoundTrip) dataVolta = "";
        else {
          dataVolta = getTimeStamp(dataVolta);
        }
      }

      const FormatedIsRoundTrip = isRoundTrip ? 1 : 2;

      if (!isRoundTrip) {
        idaDates.forEach((e) => {
          window.open(
            `https://www.smiles.com.br/mfe/emissao-passagem/?adults=1&cabin=ALL&children=0&departureDate=${e}&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=${dataVolta}&searchType=congenere&segments=1&tripType=${FormatedIsRoundTrip}&originAirport=${origem.toUpperCase()}&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=${destino.toUpperCase()}&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true000000`
          );
        });
      } else {
        idaDates.forEach((e) => {
          voltaDates.forEach((v) => {
            window.open(
              `https://www.smiles.com.br/mfe/emissao-passagem/?adults=1&cabin=ALL&children=0&departureDate=${e}&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=${v}&searchType=congenere&segments=1&tripType=${FormatedIsRoundTrip}&originAirport=${origem.toUpperCase()}&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=${destino.toUpperCase()}&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true000000`
            );
          });
        });
      }
    }

    if (company == "TUDOAZUL") {
      const idaDates: any[] = Array.from(
        { length: flexibilidade },
        (_, i) => i
      ).map((e) => {
        return getTimeStamp(dataIda, e);
      });

      const voltaDates: any[] = Array.from(
        { length: flexibilidade },
        (_, i) => i
      ).map((e) => {
        return getTimeStamp(dataVolta, e);
      });

      if (isRoundTrip) {
        idaDates.forEach((e) => {
          voltaDates.forEach((v) => {
            window.open(
              `https://azulpelomundo.voeazul.com.br/flights/RT/${origem}/${destino}/-/-/${e}/${v}/1/0/0/0/0/ALL/F/ECONOMY/-/-/-/-/A/-`
            );
          });
        });
      } else {
        idaDates.forEach((e) => {
          window.open(
            `https://azulpelomundo.voeazul.com.br/flights/OW/${origem}/${destino}/-/-/${e}/-/1/0/0/0/0/ALL/F/ECONOMY/-/-/-/-/A/-`
          );
        });
      }
    }
  }
  return (
    <main className="min-h-screen">
      <h1 className="text-lg font-semibold md:text-2xl mb-3">Histórico</h1>
      <div className=" justify-center items-center hidden md:flex ">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Origem</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Ida e Volta</TableHead>
              <TableHead>Data Ida</TableHead>
              <TableHead>Data Volta</TableHead>
              <TableHead>Cia</TableHead>
              <TableHead>Flex</TableHead>
              <TableHead>Data Pesquisa</TableHead>
              <TableHead>Ver</TableHead>
              <TableHead className="flex justify-end items-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsedHistory &&
              parsedHistory?.map((item: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.origem}</TableCell>
                  <TableCell>{item.destino}</TableCell>
                  <TableCell>
                    {item.isRoundTrip.toString() === "true" ? "Sim" : "Não"}
                  </TableCell>
                  <TableCell>
                    {formatDate(new Date(item.dataIda), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{item.dataVolta}</TableCell>
                  <TableCell>{item.company}</TableCell>
                  <TableCell>{item.flexibilidade}</TableCell>
                  <TableCell>
                    {formatDate(new Date(item.date), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/history`}
                      onClick={() =>
                        busca(
                          item.origem,
                          item.destino,
                          item.isRoundTrip,
                          item.dataIda,
                          item.dataVolta,
                          item.company,
                          item.flexibilidade
                        )
                      }
                    >
                      <span className="text-blue-500">Ver</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* list mobile */}
      </div>
      <div className="flex w-full flex-col gap-4 md:hidden">
        {parsedHistory &&
          parsedHistory?.map((item: any, index: number) => (
            <div className="border w-full p-6 h-auto rounded-lg" key={index}>
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-semibold flex">
                      {item.origem}
                    </h2>
                    {" - "}
                    <h2 className="text-lg font-semibold">{item.destino}</h2>
                  </div>

                  <p>
                    {formatDate(new Date(item.dataIda), "dd/MM/yyyy")} -{" "}
                    {item.isRoundTrip.toString() === "true"
                      ? formatDate(new Date(item.dataVolta), "dd/MM/yyyy")
                      : ""}
                  </p>
                </div>
                <div>
                  <Link
                    href={`/history`}
                    onClick={() =>
                      busca(
                        item.origem,
                        item.destino,
                        item.isRoundTrip,
                        item.dataIda,
                        item.dataVolta,
                        item.company,
                        item.flexibilidade
                      )
                    }
                  >
                    <span className="text-blue-500">Ver</span>
                  </Link>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="text-sm">
                    Companhia{" "}
                    <span className="font-semibold">{item.company}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Data da pesquisa{" "}
                    <span className="font-semibold">
                      {formatDate(new Date(item.date), "dd/MM/yyyy")}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Flex{" "}
                    <span className="font-semibold">{item.flexibilidade}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}
