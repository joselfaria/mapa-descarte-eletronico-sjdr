import { lerPontos } from "@/lib/pontos-fs.server";
import MapaCliente from "@/components/sections/MapaCliente";
import FormularioCadastro from "@/components/sections/FormularioCadastro";

// pagina unica: mapa ocupando a primeira tela, cadastro logo abaixo
export default async function Home() {
  const pontos = await lerPontos();

  return (
    <main className="flex flex-col">
      <div className="flex justify-center items-center w-full h-dvh">
        <MapaCliente pontos={pontos} />
      </div>
      <div className="p-6 flex flex-col gap-6 max-w-3xl mx-auto w-full">
        <h1 className="text-2xl font-bold">
          Mapa de Descarte Eletrônico Reevida
        </h1>
        <FormularioCadastro />
      </div>
    </main>
  );
}
