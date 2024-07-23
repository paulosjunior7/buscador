"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eraser, Search, X } from "lucide-react";
import { useFormik } from "formik";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import PesquisarAeroportos from "@/components/pesquisador";
import { getCookie, setCookie } from "cookies-next";
import { addDays } from "date-fns";

interface Airport {
  city: string;
  name: string;
  iata: string;
  label: string;
  value: string;
  cityAirportName: string;
  id: string;
  country: string;
  icao: string;
  latitude: string;
  longitude: string;
  altitude: string;
  timezone: string;
  dst: string;
  tz: string;
  type: string;
  source: string;
  countryAlpha2: string;
  cityIsoCode: string;
}

export default function Home() {
  const formik = useFormik({
    initialValues: {
      origem: [],
      destino: [],
      isRoundTrip: true,
      dataIda: "",
      dataVolta: "",
      company: "SMILES",
      flexibilidade: 1,
    },
    onSubmit: (values) => {
      values.origem.forEach((origem) => {
        values.destino.forEach((destino) => {
          busca(
            origem,
            destino,
            values.isRoundTrip,
            values.dataIda,
            values.dataVolta,
            values.company,
            values.flexibilidade
          );
        });
      });

      const history = JSON.parse(getCookie("history") || "[]");
      history.push({
        origem: values.origem,
        destino: values.destino,
        isRoundTrip: values.isRoundTrip,
        dataIda: values.dataIda,
        dataVolta: values.dataVolta,
        company: values.company,
        flexibilidade: values.flexibilidade,
        date: new Date().toISOString(),
      });
      setCookie("history", JSON.stringify(history), {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    },
  });

  const [openOrigem, setOpenOrigem] = useState(false);
  const [openDestino, setOpenDestino] = useState(false);

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
    <main>
      <form
        className="grid grid-cols-2 gap-4 p-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="px-1 relative">
          <Label htmlFor="origem">Origem</Label>
          <Input
            name="origem"
            placeholder="Origem"
            id="origem"
            max={3}
            onClick={() => {
              setOpenOrigem(true);
            }}
            onChangeCapture={(e) => {
              if (typeof e === "string") {
                formik.setFieldValue(
                  "origem",
                  (e as string)
                    ?.split(",")
                    .map((s: string) => s.trim().toUpperCase())
                );
              }
            }}
            value={
              formik?.values?.origem.length > 0 ? formik.values.origem : ""
            }
          />
          {formik?.values?.origem.length > 0 && (
            <X
              className="absolute size-5 right-3 top-[34px] cursor-pointer"
              onClick={() => {
                formik.setFieldValue("origem", []);
              }}
            />
          )}
        </div>
        <div className="px-1 relative">
          <Label htmlFor="destino">Destino</Label>
          <Input
            name="destino"
            placeholder="Destino"
            id="destino"
            max={3}
            onClick={() => {
              setOpenDestino(true);
            }}
            onChangeCapture={(e) => {
              if (typeof e === "string") {
                formik.setFieldValue(
                  "destino",
                  (e as string)
                    ?.split(",")
                    .map((s: string) => s.trim().toUpperCase())
                );
              }
            }}
            value={
              formik?.values?.destino.length > 0 ? formik.values.destino : ""
            }
          />
          {formik?.values?.destino.length > 0 && (
            <X
              className="absolute size-5 right-3 top-[34px] cursor-pointer"
              onClick={() => {
                formik.setFieldValue("destino", []);
              }}
            />
          )}
        </div>
        <div className="px-1 ">
          <Label htmlFor="origem">Tipo</Label>
          <Select
            defaultValue={formik.values.isRoundTrip.toString()}
            onValueChange={(e) => {
              formik.setFieldValue(
                "isRoundTrip",
                e.toString() === "true" ? true : false
              );
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="true">ida e volta</SelectItem>
                <SelectItem value="false">Somente ida</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="px-1">
          <Label htmlFor="flexibilidade">Flexibilidade</Label>
          <Select
            defaultValue={formik.values.flexibilidade.toString()}
            onValueChange={(e) => {
              formik.setFieldValue("flexibilidade", e);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Flexibilidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="6">6</SelectItem>
                <SelectItem value="7">7</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="px-1 ">
          <Label htmlFor="origem">Companhia aérea</Label>
          <Select
            defaultValue={formik.values.company}
            onValueChange={(e) => {
              formik.setFieldValue("company", e);
            }}
            name="company"
          >
            <SelectTrigger>
              <SelectValue placeholder="Companhia aérea" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="TUDOAZUL">Tudo Azul</SelectItem>
                <SelectItem value="SMILES">Smiles</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div></div>
        <div className="px-1">
          <Label htmlFor="dataIda">Data de ida</Label>
          <Input
            type="date"
            name="dataIda"
            id="dataIda"
            min={new Date().toISOString().split("T")[0]}
            onChange={formik.handleChange}
            value={formik.values.dataIda}
          />
        </div>
        <div className="px-1">
          <Label htmlFor="dataVolta">Data de volta</Label>
          <Input
            type="date"
            name="dataVolta"
            id="dataVolta"
            min={formik.values.dataIda}
            onChange={formik.handleChange}
            disabled={!formik.values.isRoundTrip}
            value={formik.values.dataVolta}
          />
        </div>
        <Button
          type="submit"
          className="col-span-2 mt-2"
          disabled={
            formik.values.origem.length === 0 ||
            formik.values.destino.length === 0 ||
            formik.values.dataIda === ""
          }
        >
          <div className="flex items-center justify-center gap-2">
            <Search className="h-6 w-6" />
            <span>Buscar</span>
          </div>
        </Button>

        <PesquisarAeroportos
          setOpen={setOpenOrigem}
          open={openOrigem}
          handlefieldValue={(newValues) => {
            formik.setFieldValue("origem", [
              ...formik.values.origem,
              ...newValues.split(",").map((s) => s.trim().toUpperCase()),
            ]);
          }}
        />
        <PesquisarAeroportos
          setOpen={setOpenDestino}
          open={openDestino}
          handlefieldValue={(newValues) => {
            formik.setFieldValue("destino", [
              ...formik.values.destino,
              ...newValues.split(",").map((s) => s.trim().toUpperCase()),
            ]);
          }}
        />
      </form>
    </main>
  );
}
