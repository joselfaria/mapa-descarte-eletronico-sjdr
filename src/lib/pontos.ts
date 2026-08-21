export const TIPOS_ACEITOS = [
  "Pilhas e baterias",
  "Celulares",
  "Computadores e notebooks",
  "Eletrodomésticos pequenos",
  "Eletrodomésticos grandes",
  "Outros",
] as const;

export type Ponto = {
  id: string;
  nome: string;
  endereco: string;
  lat: number;
  lng: number;
  tiposAceitos: string[];
  horario: string;
};

// o usuario digita so a rua: sem o sufixo o nominatim acha rua homonima em outro estado
const CIDADE = "São João del-Rei, MG, Brasil";

function urlGeocoding(endereco: string): string {
  const query = `${endereco}, ${CIDADE}`;
  return `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
    query
  )}`;
}

// converte endereco em lat/lng pelo nominatim; null quando nao encontra
export async function geocodificar(
  endereco: string
): Promise<{ lat: number; lng: number } | null> {
  const resposta = await fetch(urlGeocoding(endereco), {
    // politica de uso do nominatim exige user-agent identificando a aplicacao
    headers: { "User-Agent": "mapa-descarte-eletronico-sjdr" },
  });
  const resultados = await resposta.json();
  if (!resultados.length) return null;
  // nominatim devolve "lon", o resto do projeto usa "lng"
  return { lat: Number(resultados[0].lat), lng: Number(resultados[0].lon) };
}
