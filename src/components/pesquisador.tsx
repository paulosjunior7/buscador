"use client";

import * as React from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

interface Airport {
  name: string;
  realName?: string;
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
  code?: string;
  dst: string;
  tz: string;
  type: string;
  source: string;
  countryAlpha2: string;
  cityIsoCode: string;
  city?: string;
}

const sortByProperty = (property: string) => {
  return (a: any, b: any) => (a[property] > b[property] ? 1 : -1);
};

function findAirPort(input: string, airports: Airport[]) {
  input = input.toLowerCase();
  let resp = airports.filter(
    (e) =>
      e.city?.toLowerCase().includes(input) ||
      e.iata?.toLowerCase().includes(input) ||
      e.name?.toLowerCase().includes(input) ||
      e.cityIsoCode?.toLowerCase().includes(input)
  );
  resp = resp.map((e) => ({
    ...e,
    realName:
      "(" +
      (e.iata !== "null" && e.iata !== null ? e.iata : e.cityIsoCode) +
      ") " +
      e.city +
      (e.name !== "null" ? " - " + e.name : ""),
    code: e.iata !== "null" && e.iata !== null ? e.iata : e.cityIsoCode,
  }));
  return resp.sort(sortByProperty("iata"));
}

export default function PesquisarAeroportos({
  setOpen,
  open,
  handlefieldValue,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  handlefieldValue: (e: string) => void;
}) {
  const [airports, setAirports] = React.useState<Airport[]>([]);
  const [filter, setFilter] = React.useState<string>("");
  const [resultadosAeroportos, setResultadosAeroportos] = React.useState<
    Airport[]
  >([]);

  async function SearchAirports() {
    const response = await fetch("https://buscador-omega.vercel.app/api/airports", {
      method: "GET",
      next: {
        revalidate: 1,
      },
    }).then((res) => res.json());

    setAirports(response.airports);
  }

  React.useEffect(() => {
    SearchAirports();
  }, []);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    if (filter.trim() === "") {
      setResultadosAeroportos([]);
    } else {
      const results = findAirPort(filter, airports);
      console.log(results);
      setResultadosAeroportos(results);
    }
  }, [filter, airports]);

  const handleValueChange = (e: string) => {
    const value = e;
    if (value.trim() === "") {
      setResultadosAeroportos([]);
    } else {
      const results = findAirPort(value, airports);
      setResultadosAeroportos(results);
    }
  };

  return (
    <>
      {/* <p className="text-sm text-muted-foreground">
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>J
        </kbd>
      </p> */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Pesquisar aeroporto."
          onValueChange={(e) => handleValueChange(e)}
        />
        <CommandList>
          <CommandSeparator />
          <CommandGroup heading="Aeroportos">
            {resultadosAeroportos.map((airport) => (
              <div
                key={airport.id}
                onClick={() => {
                  handlefieldValue(airport.code ?? "");
                  setOpen(false);
                }}
              >
                <CommandItem
                  key={airport.id}
                  value={airport.realName}
                  className="cursor-pointer"
                  onClick={() => {
                    handlefieldValue(airport.code ?? "");
                    setOpen(false);
                  }}
                >
                  <div
                    className="flex flex-col !cursor-pointer"
                    onClick={() => {
                      handlefieldValue(airport.code ?? "");
                      setOpen(false);
                    }}
                  >
                    <p className="text-sm text-muted-foreground">
                      {airport.iata}
                    </p>
                    <div className="flex flex-row justify-between gap-4">
                      <p className="font-semibold"> {airport.city}</p>
                      <p className="text-sm text-muted-foreground">
                        {airport.name}
                      </p>
                    </div>
                  </div>
                </CommandItem>
              </div>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
