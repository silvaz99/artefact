# Gerenciador de Tarefas App
## Para Rodar

### Instalar as dependências
`pnpm install`

### Rodar o projeto localmente
`pnpm dev`

dependencies:
```
@t3-oss/env-nextjs 0.12.0     @trpc/server 11.1.2           server-only 0.0.1             
@tanstack/react-query 5.76.0  next 15.3.2                   superjson 2.2.2               
@trpc/client 11.1.2           react 19.1.0                  zod 3.24.4                    
@trpc/react-query 11.1.2      react-dom 19.1.0   
```

- Next.js:
Framework para React focado em renderização do lado do servidor (SSR) e geração de sites estáticos (SSG).

- Tailwind CSS:
Framework de CSS utilitário para estilização.

- tRPC:
Framework para criar APIs typesafe em TypeScript.
## Componentes

Foram criados dois componentes principais na aplicação, EditTask e ListingTask.

- ListingTask: Componente que lista todas as tarefas criadas, com as funcionalidades de remoção e edição.
- EditTask: Componente responsável por poder editar ou criar novas tarefas, além das funcionalidades de notificações em caso de sucesso/erro.

No arquivo src/server/api/routers/post.ts foram definidas todas as opeerações CRUD utilizando o tRPC para expor os endpoints que manipulam a lista de tarefas em memória. Foi feita a validação dos campos utilizando o Zod.