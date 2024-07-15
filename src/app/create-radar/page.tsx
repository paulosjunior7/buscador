"use client";
import PesquisarAeroportos from "@/components/pesquisador";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormik } from "formik";
import { useState } from "react";

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

export default function Radar() {
  const formik = useFormik({
    initialValues: {
      cabine: "ECONOMY",
      dataIda: "",
      dataVolta: "",
      destino: "",
      flexibilidade: 1,
      imgFidelidade:
        "https://all.accor.com/loyalty-program/partners/assets/images/airlines/smiles.svg",
      origem: "",
      programaFidelidade: "Smiles",
      tipoViagem: "OW",
      usuarioId: "30",
    },
    onSubmit: (values) => {},
  });

  const [openOrigem, setOpenOrigem] = useState(false);
  const [openDestino, setOpenDestino] = useState(false);

  return (
    <main>
      <h1 className="text-lg font-semibold md:text-2xl mb-3">Criar Radar</h1>

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
          <Label htmlFor="tipo">Tipo</Label>
          <Select
            defaultValue={formik.values.tipoViagem.toString()}
            onValueChange={(e) => {
              formik.setFieldValue(
                "tipoViagem",
                e.toString() === "true" ? true : false
              );
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="RT">ida e volta</SelectItem>
                <SelectItem value="OW">Somente ida</SelectItem>
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
            disabled={!formik.values.tipoViagem}
            value={formik.values.dataVolta}
          />
        </div>

        <div className="px-1 ">
          <Label htmlFor="origem">Companhia aérea</Label>
          <Select
            defaultValue={formik.values.programaFidelidade}
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
                <SelectItem value="SMILES">Smiles</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div></div>

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
            <span>Criar Radar</span>
          </div>
        </Button>

        <PesquisarAeroportos
          setOpen={setOpenOrigem}
          open={openOrigem}
          handlefieldValue={(e) => {
            formik.setFieldValue("origem", e);
          }}
        />

        <PesquisarAeroportos
          setOpen={setOpenDestino}
          open={openDestino}
          handlefieldValue={(e) => {
            formik.setFieldValue("destino", e);
          }}
        />
      </form>
    </main>
  );
}
