# Contas Web

Projeto independente em React, TypeScript, Vite e Tailwind CSS. Requer Node.js 24.11+.

```sh
npm ci
npm run dev
npm run build
```

O servidor local usa http://localhost:5173 e encaminha `/api` para http://127.0.0.1:3000. Para outro backend local, configure `API_PROXY_TARGET` no ambiente ao iniciar o Vite.

## Deploy

Configure `VITE_API_URL=https://api.seudominio.com/api` **antes do build**. Variáveis VITE são públicas: não coloque segredos nelas. Execute `npm ci && npm run build` e publique a pasta `dist` em uma hospedagem estática. Alternativamente, mantenha `VITE_API_URL=/api` e configure o proxy reverso da hospedagem para encaminhar `/api` ao backend; o proxy do Vite só existe em desenvolvimento.

Configure `WEB_ORIGIN` na API com a origem exata deste frontend (protocolo, domínio e porta, sem caminho). Utilize HTTPS e preferencialmente subdomínios do mesmo domínio, como `app.exemplo.com` e `api.exemplo.com`, pois a autenticação usa cookies SameSite=Lax. Domínios de sites diferentes exigem rever a estratégia de cookies/CSRF e políticas de cookies de terceiros.

`npm run format` formata o código; `npm run format:check` verifica. Os temas claro e escuro são selecionados no login e painel e a preferência é salva no navegador.
