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

// const myHeaders = new Headers();
// myHeaders.append("accept", "application/json, text/plain, /");
// myHeaders.append("accept-language", "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7");
// myHeaders.append(
//   "cookie",
//   "_ga=GA1.1.119644977.1719337768; _ga_WE1WHSCSHG=GS1.1.1721163234.3.1.1721164066.36.0.0"
// );
// myHeaders.append("priority", "u=1, i");
// myHeaders.append(
//   "referer",
//   "https://pncp.gov.br/app/editais?q=&status=propostas_encerradas&pagina=1"
// );
// myHeaders.append(
//   "sec-ch-ua",
//   '"Not/A)Brand";v="8", "Chromium";v="126", "Google Chrome";v="126"'
// );
// myHeaders.append("sec-ch-ua-mobile", "?0");
// myHeaders.append("sec-ch-ua-platform", '"Windows"');
// myHeaders.append("sec-fetch-dest", "empty");
// myHeaders.append("sec-fetch-mode", "cors");
// myHeaders.append("sec-fetch-site", "same-origin");
// myHeaders.append(
//   "user-agent",
//   "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
// );

// const requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };

// fetch(
//   "https://pncp.gov.br/api/search/?tipos_documento=edital&ordenacao=-data&pagina=1&tam_pagina=1&status=propostas_abertas&q=AVALIA%C3%87%C3%83O",
//   requestOptions
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.error(error));

interface Item {
  id: string;
  index: string;
  doc_type: string;
  title: string;
  description: string;
  item_url: string;
  document_type: string;
  createdAt: string;
  numero: string | null;
  ano: string;
  numero_sequencial: string;
  numero_sequencial_compra_ata: string | null;
  numero_controle_pncp: string;
  orgao_id: string;
  orgao_cnpj: string;
  orgao_nome: string;
  orgao_subrogado_id: string | null;
  orgao_subrogado_nome: string | null;
  unidade_id: string;
  unidade_codigo: string;
  unidade_nome: string;
  esfera_id: string;
  esfera_nome: string;
  poder_id: string;
  poder_nome: string;
  municipio_id: string;
  municipio_nome: string;
  uf: string;
  modalidade_licitacao_id: string;
  modalidade_licitacao_nome: string;
  situacao_id: string;
  situacao_nome: string;
  data_publicacao_pncp: string;
  data_atualizacao_pncp: string;
  data_assinatura: string | null;
  data_inicio_vigencia: string;
  data_fim_vigencia: string;
  cancelado: boolean;
  valor_global: number | null;
  tem_resultado: boolean;
  tipo_id: string;
  tipo_nome: string;
  tipo_contrato_id: string | null;
  tipo_contrato_nome: string | null;
}

interface Response {
  items: Item[];
  total: number;
  filters: Record<string, any>;
}

const getLicitacoes = async () => {
  const response = await fetch(
    "https://pncp.gov.br/api/search/?tipos_documento=edital&ordenacao=-data&pagina=1&tam_pagina=10&status=propostas_abertas&q=AVALIA%C3%87%C3%83O",
    {
      headers: {
        accept: "application/json, text/plain, */*",
        "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
      },
      body: null,
      method: "GET",
    }
  );
  return response.json();
};

export default async function Licitacoes() {
  const licitacoes = await getLicitacoes();

  console.log(licitacoes);
  return (
    <main className="min-h-screen">
      <h1 className="text-lg font-semibold md:text-2xl mb-3">Licitaçoes</h1>
      <div className=" justify-center items-center hidden md:flex  ">
        <div className="flex flex-col gap-4 w-full">
          {licitacoes &&
            licitacoes.items?.map((item: Item, index: number) => (
              <>
                <div className="border w-full h-auto p-3 flex-col flex">
                  <div>
                    <span className="font-bold">Titulo:</span> {item.title}
                  </div>
                  <div>
                    <span className="font-bold">Descrição:</span>{" "}
                    {item.description}
                  </div>
                  <div>
                    <span className="font-bold">orgao_nome:</span>{" "}
                    {item.orgao_nome}
                  </div>
                  <div>
                    <span className="font-bold">municipio_nome:</span>{" "}
                    {item.municipio_nome}
                  </div>
                  <div>
                    <span className="font-bold">uf:</span> {item.uf}
                  </div>
                  <div>
                    <span className="font-bold">Data de inicio:</span>{" "}
                    {item.data_inicio_vigencia}
                  </div>
                </div>
              </>
            ))}
        </div>
        {/* list mobile */}
      </div>
      <div className="flex w-full flex-col gap-4 md:hidden">
        {[] &&
          []?.map((item: any, index: number) => (
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
                  <Link href={`/history`} onClick={() => {}}>
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
