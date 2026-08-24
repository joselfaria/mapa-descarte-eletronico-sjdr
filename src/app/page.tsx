import Image from "next/image";
import { lerPontos } from "@/lib/pontos-fs.server";
import MapaCliente from "@/components/sections/MapaCliente";
import BotaoCadastro from "@/components/sections/BotaoCadastro";

// pagina unica: mapa na tela inteira, cadastro atras do botao flutuante
export default async function Home() {
  const pontos = await lerPontos();

  return (
    <main className="relative h-dvh overflow-hidden">
      <MapaCliente pontos={pontos} />
      <h1 className="absolute left-6 top-6 z-[1001] overflow-hidden rounded-lg shadow-cartao">
        <Image
          // o alt e o unico nome acessivel da pagina agora que o titulo virou imagem
          src="/reeevida-logo.jpg"
          alt="Reevida"
          width={64}
          height={64}
          priority
        />
      </h1>
      <BotaoCadastro />
    </main>
  );
}
