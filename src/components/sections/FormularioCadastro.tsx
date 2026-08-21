"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TIPOS_ACEITOS } from "@/lib/pontos";
import { CAMPO } from "@/lib/styles";

// formulario que cadastra um ponto novo e recarrega o mapa ao terminar
export default function FormularioCadastro() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [horario, setHorario] = useState("");
  const [tipos, setTipos] = useState<string[]>([]);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  function alternarTipo(tipo: string) {
    setTipos((atual) =>
      atual.includes(tipo)
        ? atual.filter((t) => t !== tipo)
        : [...atual, tipo]
    );
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setEnviando(true);

    const resposta = await fetch("/api/pontos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nome, endereco, tiposAceitos: tipos, horario }),
    });

    setEnviando(false);

    if (!resposta.ok) {
      // a rota ja devolve a mensagem pronta em portugues
      const dados = await resposta.json();
      setErro(dados.erro);
      return;
    }

    setNome("");
    setEndereco("");
    setHorario("");
    setTipos([]);
    // refresh re-executa a page no servidor: o ponto novo aparece no mapa sem reload
    router.refresh();
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-3 max-w-md">
      <h2 className="text-lg font-semibold">Cadastrar novo ponto</h2>

      <input
        required
        placeholder="Nome do local"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        className={CAMPO}
      />
      <input
        required
        placeholder="Endereço"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        className={CAMPO}
      />
      <input
        placeholder="Horário de funcionamento"
        value={horario}
        onChange={(e) => setHorario(e.target.value)}
        className={CAMPO}
      />

      <fieldset className="flex flex-col gap-1">
        <legend className="text-sm font-medium mb-1">Tipos aceitos</legend>
        {TIPOS_ACEITOS.map((tipo) => (
          <label key={tipo} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={tipos.includes(tipo)}
              onChange={() => alternarTipo(tipo)}
            />
            {tipo}
          </label>
        ))}
      </fieldset>

      {erro && <p className="text-red-600 text-sm">{erro}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="bg-green-700 text-white rounded px-3 py-2 disabled:opacity-50"
      >
        {enviando ? "Salvando..." : "Cadastrar"}
      </button>
    </form>
  );
}
