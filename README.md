# Mapa de Descarte Eletrônico — SJDR

Mapa dos pontos de coleta de lixo eletrônico em São João del-Rei, com um
formulário público para cadastrar pontos novos.

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
  components/sections/  uma seção da página por arquivo
  lib/                  dados, tipos e utilitários — sem JSX
data/                   pontos.json, gravado em runtime pelo formulário
public/                 arquivos estáticos servidos na raiz
```

Imports usam o alias `@/` apontando para `src/`.

## Onde mexer

| Para mudar isto | Vá em |
|---|---|
| Lista de tipos de lixo aceitos | `src/lib/pontos.ts` → `TIPOS_ACEITOS` |
| Centro ou zoom inicial do mapa | `src/components/sections/Mapa.tsx` → `CENTRO_SJDR`, `ZOOM_INICIAL` |
| Tamanho do mapa na tela | `src/components/sections/Mapa.tsx` → `DIMENSOES` |
| Aparência do marcador | `src/components/sections/Mapa.tsx` → `icone` |
| Campos do formulário de cadastro | `src/components/sections/FormularioCadastro.tsx` |
| Moldura dos campos de texto | `src/lib/styles.ts` → `CAMPO` |
| Validação e mensagens de erro do cadastro | `src/app/api/pontos/route.ts` |
| Cidade usada na busca de endereço | `src/lib/pontos.ts` → `CIDADE` |
| Onde os pontos são gravados | `src/lib/pontos-fs.server.ts` → `DATA_PATH` |
| Título e descrição da aba | `src/app/layout.tsx` → `metadata` |
| Texto do título na página | `src/app/page.tsx` |
| Cores de fundo e texto | `src/app/globals.css` |

## Limitações conhecidas

Os pontos ficam em `data/pontos.json`, lido e reescrito a cada cadastro, sem
lock. Dois cadastros no mesmo instante podem se sobrescrever, e em hospedagem
com sistema de arquivos efêmero (Vercel, por exemplo) as gravações se perdem no
próximo deploy. Trocar por um banco quando o volume justificar.
