"use client";

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import type { Ponto } from "@/lib/pontos";

const CENTRO_SJDR: [number, number] = [-21.1355, -44.2612];

// 13 enquadra a cidade inteira: acima disso os bairros da borda ficam fora
const ZOOM_INICIAL = 13;

// 80% do container deixa respiro nas laterais; dvh acompanha a barra do navegador no celular
const DIMENSOES = { width: "80%", height: "80dvh" };

// leaflet monta o caminho do icone sozinho e erra sob bundler: url fixa no cdn
const icone = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  // ancora na ponta de baixo do pin, nao no centro da imagem
  iconAnchor: [12, 41],
});

// mapa openstreetmap com um marcador por ponto de coleta
export default function Mapa({ pontos }: { pontos: Ponto[] }) {
  return (
    <MapContainer center={CENTRO_SJDR} zoom={ZOOM_INICIAL} style={DIMENSOES}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pontos.map((ponto) => (
        <Marker key={ponto.id} position={[ponto.lat, ponto.lng]} icon={icone}>
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
      ))}
    </MapContainer>
  );
}
