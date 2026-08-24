"use client";

import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import type { Ponto } from "@/lib/pontos";

const icone = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// um ponto de coleta no mapa: o pino e o balao que abre no clique
export default function PontoNoMapa({ ponto }: { ponto: Ponto }) {
  return (
    <Marker position={[ponto.lat, ponto.lng]} icon={icone}>
      <Popup>
        <strong>{ponto.nome}</strong>
        <br />
        {ponto.endereco}
        <br />
        Aceita: {ponto.tiposAceitos.join(", ")}
        {ponto.horario && (
          <>
            <br />
            Horário: {ponto.horario}
          </>
        )}
      </Popup>
    </Marker>
  );
}
