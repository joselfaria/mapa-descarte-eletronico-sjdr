# Mapa de Descarte Eletrônico — SJDR

Mapa dos pontos de coleta de lixo eletrônico em São João del-Rei, ocupando a
tela inteira, com um formulário público para cadastrar pontos novos dentro de um
modal, atrás do botão flutuante no canto inferior direito.

## Setup

```bash
npm install
npm run dev
```

Abre em http://localhost:3000. Não precisa de chave de API nem de `.env`: o mapa
usa tiles do OpenStreetMap e a geocodificação usa o Nominatim, ambos públicos.

## Scripts

| Script | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento com hot reload |
| `npm run build` | Build de produção (roda o TypeScript junto) |
| `npm start` | Sobe o build de produção |
| `npm run lint` | ESLint |

## Estrutura

```
src/
  app/                  roteamento, metadata e CSS global
    api/pontos/         POST que cadastra um ponto novo
  components/           componentes usados dentro das seções
  components/sections/  uma seção da página por arquivo
  lib/                  dados, tipos e utilitários — sem JSX
data/                   pontos.json, gravado em runtime pelo formulário
public/                 logo, ícones e demais estáticos servidos na raiz
```

Imports usam o alias `@/` apontando para `src/`.

## Onde mexer

| Para mudar isto | Vá em |
|---|---|
| Lista de tipos de lixo aceitos | `src/lib/pontos.ts` → `TIPOS_ACEITOS` |
| Centro ou zoom inicial do mapa | `src/components/sections/Mapa.tsx` → `CENTRO_SJDR`, `ZOOM_INICIAL` |
| Tamanho do mapa na tela | `src/components/sections/Mapa.tsx` → `DIMENSOES` |
| Tiles do mapa | `src/components/sections/Mapa.tsx` → `<TileLayer>` |
| Posição dos controles de zoom | `src/components/sections/Mapa.tsx` → `<ZoomControl>` |
| Aparência do pino e do balão de um ponto | `src/components/PontoNoMapa.tsx` |
| Campos do formulário de cadastro | `src/components/sections/FormularioCadastro.tsx` |
| Botão flutuante e o modal que ele abre | `src/components/sections/BotaoCadastro.tsx` |
| Ícone do botão flutuante | `public/icons/mais.svg` |
| Molduras de campo, botão e cartão | `src/lib/styles.ts` |
| Validação e mensagens de erro do cadastro | `src/app/api/pontos/route.ts` |
| Cidade usada na busca de endereço | `src/lib/pontos.ts` → `CIDADE` |
| Onde os pontos são gravados | `src/lib/pontos-fs.server.ts` → `DATA_PATH` |
| Título e descrição da aba | `src/app/layout.tsx` → `metadata` |
| Logo no canto da tela | `public/reeevida-logo.jpg`, dimensionado em `src/app/page.tsx` |
| Cores e sombras do design | `src/app/globals.css` → `@theme inline` |
| Cores de fundo e texto | `src/app/globals.css` → `:root` |

## Limitações conhecidas

Em `Mapa.tsx` há um `<TileLayer>` do Google comentado. Não descomente para
publicar: `mt0-3.google.com/vt` é endpoint interno, e o
[ToS do Maps Platform](https://cloud.google.com/maps-platform/terms) §3.2.3(a)
lista "bulk download Google Maps tiles" como uso proibido.

Os pontos ficam em `data/pontos.json`, lido e reescrito a cada cadastro, sem
lock. Dois cadastros no mesmo instante podem se sobrescrever, e em hospedagem
com sistema de arquivos efêmero (Vercel, por exemplo) as gravações se perdem no
próximo deploy. Trocar por um banco quando o volume justificar.

O visual do modal segue o frame "create project modal" do arquivo
[Modal Templates | Forms + Tables](https://www.figma.com/design/4asPZ5A4OKvJyCGW2sL2Sr/Modal-Templates-%7C-Forms---Tables--Community-?node-id=0-1)
no Figma. As cores e sombras de lá viraram variáveis no `@theme` do `globals.css`.
