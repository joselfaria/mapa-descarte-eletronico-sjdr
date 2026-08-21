import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { Ponto } from "@/lib/pontos";

// data/ fica fora de src: e estado gravado em runtime, nao codigo-fonte
const DATA_PATH = path.join(process.cwd(), "data", "pontos.json");

export async function lerPontos(): Promise<Ponto[]> {
  const conteudo = await readFile(DATA_PATH, "utf-8");
  return JSON.parse(conteudo);
}

// json em disco sem lock: dois cadastros no mesmo instante podem se sobrescrever
export async function adicionarPonto(novo: Omit<Ponto, "id">): Promise<Ponto> {
  const pontos = await lerPontos();
  const ponto: Ponto = { id: crypto.randomUUID(), ...novo };
  pontos.push(ponto);
  await writeFile(DATA_PATH, JSON.stringify(pontos, null, 2));
  return ponto;
}
