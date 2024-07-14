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
import Link from "next/link";

export default function History() {
  const history = JSON.parse(getCookie("history") || "[]");

  const parsedHistory = history;

  function getTimeStamp(date: string) {
    if (!date || date.trim() === "") return "";
    const dateTime = new Date(date + "T13:00:00Z");

    const timeStamp = dateTime.getTime();
    return timeStamp.toString();
  }

  function busca(
    origem: string,
    destino: string,
    isRoundTrip: boolean,
    dataIda: any,
    dataVolta: any,
    company: any
  ) {
    if (company == "TUDOAZUL") {
      if (isRoundTrip)
        window.open(
          `https://azulpelomundo.voeazul.com.br/flights/RT/${origem}/${destino}/-/-/${dataIda}/${dataVolta}/1/0/0/0/0/ALL/F/ECONOMY/-/-/-/-/A/-`
        );
      else
        window.open(
          `https://azulpelomundo.voeazul.com.br/flights/OW/${origem}/${destino}/-/-/${dataIda}/-/1/0/0/0/0/ALL/F/ECONOMY/-/-/-/-/A/-`
        );
    }

    if (company == "SMILES") {
      //
      if (dataIda != null && dataIda != undefined) {
        dataIda = getTimeStamp(dataIda);
      }

      if (dataVolta != null && dataVolta != undefined) {
        if (!isRoundTrip) dataVolta = "";
        else {
          dataVolta = getTimeStamp(dataVolta);
        }
      }

      console.log(getTimeStamp(dataIda));
      isRoundTrip === true ? 1 : 2;
      const FormatedIsRoundTrip = isRoundTrip ? 1 : 2;

      window.open(
        `https://www.smiles.com.br/mfe/emissao-passagem/?adults=1&cabin=ALL&children=0&departureDate=${dataIda}&infants=0&isElegible=false&isFlexibleDateChecked=false&returnDate=${dataVolta}&searchType=congenere&segments=1&tripType=${FormatedIsRoundTrip}&originAirport=${origem.toUpperCase()}&originCity=&originCountry=&originAirportIsAny=false&destinationAirport=${destino.toUpperCase()}&destinCity=&destinCountry=&destinAirportIsAny=false&novo-resultado-voos=true000000`
      );
    }
  }

  return (
    <main className="min-h-screen">
      <div className="flex justify-center items-center border ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Origem</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Ida e Volta</TableHead>
              <TableHead>Data Ida</TableHead>
              <TableHead>Data Volta</TableHead>
              <TableHead>Companhia</TableHead>
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
                          item.company
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
      </div>
    </main>
  );
}
