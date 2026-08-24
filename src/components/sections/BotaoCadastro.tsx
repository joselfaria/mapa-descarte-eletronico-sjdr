"use client";

import { useRef } from "react";
import { CARTAO } from "@/lib/styles";
import FormularioCadastro from "./FormularioCadastro";

// os controles do leaflet ficam em z-index 1000: o botao precisa passar por cima
const CAMADA_ACIMA_DO_MAPA = "z-[1001]";

// svg local, tamanho fixo: next/image so atrapalharia aqui
// eslint-disable-next-line @next/next/no-img-element
const ICONE = <img src="/icons/mais.svg" alt="" width={24} height={24} />;

// botao flutuante que abre o cadastro de ponto num modal
export default function BotaoCadastro() {
  const modal = useRef<HTMLDialogElement>(null);

  function fechar() {
    modal.current?.close();
  }

  return (
    <>
      <button
        type="button"
        aria-label="Cadastrar ponto de coleta"
        onClick={() => modal.current?.showModal()}
        className={`${CARTAO} ${CAMADA_ACIMA_DO_MAPA} fixed bottom-6 right-6 grid size-16 place-items-center !rounded-full`}
      >
        {ICONE}
      </button>

      <dialog
        // nativo: foco preso, esc, backdrop e top layer sem lib nem portal
        ref={modal}
        // o clique so cai no proprio dialog quando acerta o backdrop, por isso o padding fica no filho
        onClick={(e) => e.target === modal.current && fechar()}
        className={`${CARTAO} m-auto w-[540px] max-w-[calc(100vw-2rem)] backdrop:bg-black/40`}
      >
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto p-6">
          <FormularioCadastro onSucesso={fechar} onCancelar={fechar} />
        </div>
      </dialog>
    </>
  );
}
