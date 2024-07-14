"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Search } from "lucide-react";
import Image from "next/image";
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
      origem: "",
      destino: "",
      isRoundTrip: true,
      dataIda: "",
      dataVolta: "",
      company: "SMILES",
    },
    onSubmit: (values) => {
      console.log(values);
      busca(
        values.origem,
        values.destino,
        values.isRoundTrip,
        values.dataIda,
        values.dataVolta,
        values.company
      );
    },
  });

  function getTimeStamp(date: string) {
    if (!date || date.trim() === "") return "";
    const dateTime = new Date(date + "T13:00:00Z");

    const timeStamp = dateTime.getTime();
    return timeStamp.toString();
  }

  const [airports, setAirports] = useState<Airport[]>([]);

  async function SearchAirports() {
    const response = await fetch("http://localhost:3000/api/airports", {
      method: "GET",
      next: {
        revalidate: 1,
      },
    }).then((res) => res.json());

    setAirports(response.airports);
  }

  console.log(airports);
  useEffect(() => {
    SearchAirports();
  }, []);

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

  const [openOrigem, setOpenOrigem] = useState(false);
  const [openDestino, setOpenDestino] = useState(false);

  return (
    <main>
      <form
        className="grid grid-cols-2 gap-4 p-4"
        onSubmit={formik.handleSubmit}
      >
        <div className="px-1">
          <Label htmlFor="origem">Origem</Label>
          <Input
            name="origem"
            placeholder="Origem"
            id="origem"
            max={3}
            onClick={() => {
              if (formik?.values?.origem === "") {
                setOpenOrigem(true);
              }
            }}
            onChangeCapture={(e) => {
              if (typeof e === "string") {
                formik.setFieldValue("origem", e);
              } else {
                formik.setFieldValue("origem", "");
              }
            }}
            value={formik.values.origem || ""}
          />
        </div>

        <div className="px-1">
          <Label htmlFor="destino">Destino</Label>
          <Input
            name="destino"
            placeholder="Destino"
            id="destino"
            max={3}
            onClick={() => {
              if (formik?.values?.destino === "") {
                setOpenDestino(true);
              }
            }}
            onChangeCapture={(e) => {
              if (typeof e === "string") {
                formik.setFieldValue("destino", e);
              } else {
                formik.setFieldValue("destino", "");
              }
            }}
            value={formik.values.destino || ""}
          />
        </div>

        <div className="px-1 ">
          <Label htmlFor="origem">Ida e volta</Label>
          <Select
            defaultValue={formik.values.isRoundTrip.toString()}
            onValueChange={(e) => {
              console.log(e);
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
            formik.values.origem === "" ||
            formik.values.destino === "" ||
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
          handlefieldValue={(e) => {
            console.log(e);
            formik.setFieldValue("origem", e);
          }}
        />

        <PesquisarAeroportos
          setOpen={setOpenDestino}
          open={openDestino}
          handlefieldValue={(e) => {
            console.log(e);
            formik.setFieldValue("destino", e);
          }}
        />
      </form>
    </main>
  );
}
