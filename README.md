# Contas Web

Frontend independente: React, TypeScript, Tailwind, React Router e Axios. Node.js 24.11+.

```sh
npm ci
npm run dev
npm run build
```

## Páginas e organização

- `/login` e `/cadastro`: autenticação, com formulário compartilhado.
- `/contas`: painel, resumo e busca de pastas.
- `/contas/:id`: detalhes e lançamentos da conta. A URL pode ser recarregada e os botões voltar/avançar do navegador funcionam.
- `src/pages/`: telas; `src/layouts/`: estrutura visual compartilhada.
- `src/components/`: cartões, resumo, modais, formulários e estados vazios.
- `src/contexts/`: sessão e estado das contas.
- `src/services/api.ts`: instância Axios, cookies, timeout e tratamento de erros.
- `src/types.ts` e `src/utils/`: tipos e formatação compartilhados.
- `src/main.tsx`: apenas inicialização do React.

## Estilos

O Tailwind CSS é integrado ao Vite. Cada componente, página e layout mantém suas classes utilitárias no arquivo `*.styles.ts` ao lado do respectivo `.tsx`. As classes são estáticas para que o Tailwind consiga detectar e gerar todos os estilos no build.

`src/components/ui/` reúne os componentes reutilizáveis `Button` e `Form`, com seus próprios estilos. `src/styles/globals.css` contém somente a importação do Tailwind, os tokens dos temas claro/escuro e as regras básicas de acessibilidade e da página. Estilos específicos de componentes devem permanecer nos arquivos locais.

## Ambientes

| Comando         | Arquivo de ambiente | URL da API                               |
| --------------- | ------------------- | ---------------------------------------- |
| `npm run dev`   | `.env.development`  | `http://localhost:3000/api`              |
| `npm run build` | `.env.production`   | `https://contas-api-beta.vercel.app/api` |

O `.env` local também contém a URL de desenvolvimento. O Vite prioriza o arquivo específico do modo. Variáveis definidas na plataforma de deploy ou arquivos `.env.*.local` podem sobrescrever esses valores. As URLs incluem `/api`, prefixo das rotas do backend. Nenhum segredo deve ser colocado em variáveis `VITE_*`.

A API deve estar rodando separadamente. No desenvolvimento, abra http://localhost:5173 para manter o mesmo hostname utilizado pelo cookie da API. No backend, configure `WEB_ORIGIN` com a origem exata do frontend.

## Deploy

Publique `dist/`. O `vercel.json` encaminha as URLs das páginas para `index.html`. Em outras hospedagens, configure o mesmo fallback de SPA. O build de produção já utiliza a API da Vercel.

A autenticação usa cookies HttpOnly e SameSite=Lax. Para frontend e API em sites diferentes, o backend precisa de uma estratégia de cookies compatível com acesso cross-site (incluindo HTTPS, configuração de SameSite e proteção de origem); `withCredentials` no Axios não altera a política do cookie nem elimina bloqueios de cookies de terceiros. Prefira domínio próprio com subdomínios do mesmo site.

## Formatação

`npm run format` formata; `npm run format:check` verifica. Os temas claro e escuro permanecem disponíveis com a preferência salva no navegador.
