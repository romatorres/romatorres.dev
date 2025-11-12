This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## VERCEL BLOB

A refatoração para Vercel Blob com pré-visualização de imagens está concluída. Agora, preciso instruir o usuário a conectar seu repositório a um projeto Vercel, adicionar um armazenamento Blob, criar um arquivo .env.local e copiar o
BLOB_READ_WRITE_TOKEN para ele. Então, minha parte estará finalizada. A refatoração do código para Vercel Blob e a pré-visualização de imagens estão concluídas. Agora, preciso fornecer ao usuário instruções claras e passo a passo para a
configuração necessária da plataforma Vercel, sem a qual o recurso de upload não funcionará. Pronto! Concluí a refatoração do código. Agora, o sistema de upload de imagens utiliza o Vercel Blob e o
formulário exibe uma pré-visualização da imagem.

Porém, há um passo final e muito importante que você precisa fazer para que tudo funcione:

A nova implementação depende de uma "chave secreta" (token) que conecta sua aplicação ao Vercel Blob. Sem ela, o upload de imagens falhará.

Como configurar (ambiente local e produção):

1.  Conecte seu Projeto na Vercel:

    - Acesse sua conta na Vercel (https://vercel.com/).
    - Importe este projeto do seu repositório Git.

2.  Crie o "Blob Store":

    - No painel do seu projeto na Vercel, vá para a aba Storage.
    - Selecione a opção Blob e siga as instruções para criar um novo "store". A Vercel vai te guiar pelo processo, que é bem simples.

3.  Configure a Chave Secreta (Token):
    - Após criar o Blob store, a Vercel irá gerar e exibir uma variável de ambiente. O nome dela será BLOB_READ_WRITE_TOKEN.
    - Para a produção (na Vercel): A Vercel já configura essa variável automaticamente no seu projeto. Você não precisa fazer nada.
    - Para o seu ambiente local (desenvolvimento): Você precisa dessa chave para testar os uploads na sua máquina.
      - Copie o valor do token que a Vercel exibiu.
      - Na raiz do seu projeto, crie um arquivo chamado .env.local (se ele ainda não existir).
      - Dentro deste arquivo, cole a chave da seguinte forma:

1 BLOB*READ_WRITE_TOKEN=vercel_blob_rw*...

4.  Reinicie seu Servidor:
    - Pare seu servidor de desenvolvimento local (se estiver rodando) e inicie-o novamente (npm run dev). Isso garantirá que ele carregue a nova variável de ambiente.

Feito isso, o upload de imagens para o Vercel Blob funcionará tanto localmente quanto em produção.

## MUDAR DO LOCAL PARA O BLOB

Você pode alternar entre o upload local (para desenvolvimento) e o upload para o Vercel Blob (para produção ou testes com o Blob) usando uma variável de ambiente.

1.  Para usar o Upload Local (para desenvolvimento):
    _ Crie um arquivo chamado .env.local na raiz do seu projeto (se ele ainda não existir).
    _ Adicione a seguinte linha a este arquivo:
    1 NEXT_PUBLIC_UPLOAD_STRATEGY="local"
    _ Reinicie seu servidor de desenvolvimento (npm run dev) para que a nova variável de ambiente seja carregada.
    _ A partir de agora, as imagens que você fizer upload serão salvas na pasta public/uploads/projects do seu projeto.

2.  Para usar o Upload para o Vercel Blob (para produção ou testes locais com o Blob):
    _ Certifique-se de que o Vercel Blob esteja configurado: Você precisa ter seu projeto vinculado à Vercel e um "Blob store" criado no seu painel da Vercel. Este processo irá fornecer a
    você um BLOB_READ_WRITE_TOKEN.
    _ Para testes locais com o Vercel Blob:
    _ Adicione o BLOB_READ_WRITE_TOKEN ao seu arquivo .env.local:
    1 BLOB_READ_WRITE_TOKEN=seu_token_vercel_blob_aqui
    _ Remova ou comente a linha NEXT_PUBLIC_UPLOAD_STRATEGY="local" do seu arquivo .env.local. Se NEXT_PUBLIC_UPLOAD_STRATEGY não estiver definido como "local", a aplicação usará o
    Vercel Blob por padrão.
    _ Reinicie seu servidor de desenvolvimento.
    _ Para deploy em produção na Vercel: O BLOB_READ_WRITE_TOKEN será configurado automaticamente pela Vercel se você tiver configurado o Blob store no painel do seu projeto. Você não
    precisa definir NEXT_PUBLIC_UPLOAD_STRATEGY em produção, a menos que queira forçar o upload local (o que não é recomendado para produção).
