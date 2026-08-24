// classes do design system do figma, uma string por peca repetida:
// mudar aqui muda todo lugar que usa

// moldura branca do modal e do chip de titulo
export const CARTAO = "bg-white border border-borda rounded-lg shadow-cartao";

export const ROTULO = "text-sm/5 text-tinta";

// focus-visible so recolore o outline do navegador: tirar o foco visivel quebraria o teclado
export const CAMPO =
  "h-9 w-full rounded border border-borda-campo bg-white px-2.5 text-sm/5 text-tinta focus-visible:outline-primaria";

export const BOTAO_PRIMARIO =
  "h-9 rounded bg-primaria px-3 text-sm/5 font-bold text-white shadow-botao disabled:opacity-50";

export const BOTAO_SECUNDARIO =
  "h-9 rounded border border-borda bg-white px-3 text-sm/5 text-tinta shadow-botao";
