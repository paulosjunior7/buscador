import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/formatDate";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface Radar {
  id: number;
  program: string;
  pontos: number;
  origem: string;
  destino: string;
  duracao: string;
  tarifa: string;
  tipoViagem: string;
  dataVooIda: string;
  dataVooVolta: string;
  dtVooIda: string;
  dtVooVolta: string;
  cabine: string;
  usuarioId: number;
  hash: string;
  link: string;
  miles: number;
}

export const getRadar = async () => {
  const response = await fetch(
    "https://starkmiles-dev.azurewebsites.net/api/GetRadarAppFunction?&usuarioId=30",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site",
        Referer: "https://milhas.codestark.com.br/",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
      body: null,
      method: "GET",
    }
  );
  return response.json();
};

export default async function Radar() {
  const radar: Radar[] = await getRadar();

  return (
    <main className="min-h-screen">
      <div className="flex w-full justify-between mb-4">
        <h1 className="text-lg font-semibold md:text-2xl mb-3">Radar</h1>
        <Button asChild>
          <Link href="/create-radar">Adicionar</Link>
        </Button>
      </div>
      <div className=" justify-center items-center hidden md:flex mt-4 ">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead>Origem</TableHead>
              <TableHead>Destino</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data Ida/Volta</TableHead>
              <TableHead>Data Volta</TableHead>
              <TableHead>Cabine</TableHead>
              <TableHead>Tarifa</TableHead>
              <TableHead>Programa</TableHead>
              <TableHead>Milhas</TableHead>
              <TableHead>Link</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {radar &&
              radar?.map((item: Radar, index: number) => (
                <TableRow key={index}>
                  <TableCell>{item.origem.split(" ")[0]}</TableCell>
                  <TableCell>{item.destino.split(" ")[0]}</TableCell>
                  <TableCell>
                    {item.tipoViagem === "RT" ? "Ida e Volta" : "Ida"}
                  </TableCell>
                  <TableCell>{item.dataVooIda}</TableCell>
                  <TableCell>{item.dataVooVolta}</TableCell>
                  <TableCell>{item.cabine}</TableCell>
                  <TableCell>{item.tarifa}</TableCell>
                  <TableCell>{item.program}</TableCell>
                  <TableCell>
                    {" "}
                    <Badge>{item.miles === 0 ? "Buscando" : item.miles}</Badge>
                  </TableCell>
                  <TableCell>
                    {item.link ? (
                      <Link href={item.link}>
                        <span className="text-blue-500">Ver</span>
                      </Link>
                    ) : (
                      ""
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full flex-col gap-4 md:hidden">
        {radar &&
          radar?.map((item: Radar, index: number) => (
            <div className="border w-full p-4 h-auto rounded-lg" key={index}>
              <div className="flex justify-between items-center">
                <div className="flex flex-col w-full">
                  <div className="flex items-center w-full justify-between">
                    <div className="flex flex-row gap-4">
                      <h2 className="text-sm font-semibold">
                        {item.origem.split(" ")[0]}
                      </h2>{" "}
                      <ArrowRight size={18} />
                      <h2 className="text-sm font-semibold">
                        {item.destino.split(" ")[0]}
                      </h2>
                    </div>
                    <div>
                      <Badge>
                        {item.miles === 0 ? "Buscando" : item.miles}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm">
                    {item.dataVooIda} -{" "}
                    {item.tipoViagem === "RT" ? item.dataVooVolta : ""}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">
                      Companhia: {item.program.toUpperCase()}
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-sm">
                    Cabine: <span className="font-semibold">{item.cabine}</span>
                  </p>
                </div>
              </div>
              {item.link && (
                <div>
                  <Link href={item.link}>
                    <span className="text-blue-500">Ver</span>
                  </Link>
                </div>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
