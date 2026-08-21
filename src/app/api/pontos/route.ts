import { NextResponse } from "next/server";
import { geocodificar } from "@/lib/pontos";
import { adicionarPonto } from "@/lib/pontos-fs.server";

export async function POST(request: Request) {
  const body = await request.json();
  const { nome, endereco, tiposAceitos, horario } = body;

  // valida antes de geocodificar: evita chamada externa para corpo incompleto
  if (!nome || !endereco || !tiposAceitos?.length) {
    return NextResponse.json(
      { erro: "Preencha nome, endereço e ao menos um tipo aceito." },
      { status: 400 }
    );
  }

  const coordenadas = await geocodificar(endereco);
  if (!coordenadas) {
    // 422 e nao 400: o corpo veio certo, o endereco e que nao existe no mapa
    return NextResponse.json(
      { erro: "Não encontramos esse endereço, tente ser mais específico." },
      { status: 422 }
    );
  }

  const ponto = await adicionarPonto({
    nome,
    endereco,
    tiposAceitos,
    horario: horario || "",
    ...coordenadas,
  });

  return NextResponse.json(ponto, { status: 201 });
}
