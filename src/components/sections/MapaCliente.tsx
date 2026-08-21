"use client";

import dynamic from "next/dynamic";
import type { Ponto } from "@/lib/pontos";

// leaflet toca em window no import: ssr:false so vale dentro de client component,
// por isso esta ponte existe entre a page (server) e o Mapa
const Mapa = dynamic(() => import("./Mapa"), { ssr: false });

export default function MapaCliente({ pontos }: { pontos: Ponto[] }) {
  return <Mapa pontos={pontos} />;
}
