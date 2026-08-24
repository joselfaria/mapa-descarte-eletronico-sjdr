"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TIPOS_ACEITOS } from "@/lib/pontos";
import { BOTAO_PRIMARIO, BOTAO_SECUNDARIO, CAMPO, ROTULO } from "@/lib/styles";

type Props = {
  onSucesso?: () => void;
  onCancelar?: () => void;
};

// formulario que cadastra um ponto novo e recarrega o mapa ao terminar
export default function FormularioCadastro({ onSucesso, onCancelar }: Props) {
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
    onSucesso?.();
  }

  return (
    <form onSubmit={enviar} className="flex flex-col gap-4">
      <h2 className="text-lg/7 font-bold text-tinta">
        Cadastrar ponto de coleta
      </h2>

      <label className="flex flex-col gap-0.5">
        <span className={ROTULO}>Nome</span>
        <input
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={CAMPO}
        />
      </label>

      <label className="flex flex-col gap-0.5">
        <span className={ROTULO}>Endereço</span>
        <input
          required
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          className={CAMPO}
        />
      </label>

      <label className="flex flex-col gap-0.5">
        <span className={`${ROTULO} flex justify-between`}>
          Horário <span className="text-hint">Opcional</span>
        </span>
        <input
          value={horario}
          onChange={(e) => setHorario(e.target.value)}
          className={CAMPO}
        />
      </label>

      <fieldset className="flex flex-col gap-0.5">
        <legend className={ROTULO}>Tipos aceitos</legend>
        <div className="grid grid-cols-2 gap-x-2 gap-y-1 pt-1">
          {TIPOS_ACEITOS.map((tipo) => (
            <label key={tipo} className="flex items-center gap-2 text-sm/5 text-tinta">
              <input
                type="checkbox"
                checked={tipos.includes(tipo)}
                onChange={() => alternarTipo(tipo)}
                className="accent-primaria"
              />
              {tipo}
            </label>
          ))}
        </div>
      </fieldset>

      {erro && <p className="text-red-600 text-sm/5">{erro}</p>}

      <div className="flex justify-end gap-2 pt-1">
        {onCancelar && (
          <button type="button" onClick={onCancelar} className={BOTAO_SECUNDARIO}>
            Cancelar
          </button>
        )}
        <button type="submit" disabled={enviando} className={BOTAO_PRIMARIO}>
          {enviando ? "Salvando..." : "Cadastrar"}
        </button>
      </div>
    </form>
  );
}
