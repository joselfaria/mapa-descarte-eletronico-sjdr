"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import type { Ponto } from "@/lib/pontos";
import PontoNoMapa from "@/components/PontoNoMapa";

const CENTRO_SJDR: [number, number] = [-21.1355, -44.2612];

// 13 enquadra a cidade inteira: acima disso os bairros da borda ficam fora
const ZOOM_INICIAL = 13;

// preenche o pai, que e quem define o tamanho: hoje o <main> h-dvh da page
const DIMENSOES = { width: "100%", height: "100%" };

// mapa com um marcador por ponto de coleta
export default function Mapa({ pontos }: { pontos: Ponto[] }) {
  return (
    <MapContainer
      center={CENTRO_SJDR}
      zoom={ZOOM_INICIAL}
      style={DIMENSOES}
      zoomControl={false}
    >
      <ZoomControl
        // topo esquerdo e do titulo, base direita e do botao de cadastro
        position="topright"
      />
      <TileLayer
        attribution="Map data &copy;2026 Google"
        url="https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
        subdomains={["mt0", "mt1", "mt2", "mt3"]}
        maxZoom={20}
      />
      {pontos.map((ponto) => (
        <PontoNoMapa key={ponto.id} ponto={ponto} />
      ))}
    </MapContainer>
  );
}
