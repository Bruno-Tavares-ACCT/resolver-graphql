<h1 align="center">
Microservice Template
</h1>

<p align="center">Este template foi criado no intuito de padronizar a estrutura de pastas, camada de segurança e a declaração de rotas</p>

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- VTEX CLI instalado
- Versão ^16.x do NodeJs

## ☕ Configurando o template

Para configurar o template, siga estas etapas:

Clone o repositório para a sua maquina

```bash
git clone https://github.com/ACCT-global/microservice-template.git
```

Mude o origin para o repositório do seu projeto executando os comandos em sequencia

```bash
git remote rm origin
```

```bash
git remote add origin {{link_repo.git}}

# Substitua o "{{link_repo.git}}" pelo link do seu repositório
```

Modifique o arquivo `./manifest.json` e altere as propriedades abaixo

```json
{
  "name": "NOME_DO_APP",
  "vendor": "ACCOUNT",
  "title": "TITULO_DO_APP",
  "description": "DESCRIÇÃO_DO_APP",
  ...
}
```

O que é cada campo:

- **NOME_DO_APP:** Nome do app que deve ser solicitado liberação para executar o builder `Node` pelo formulário da VTEX [aqui](https://docs.google.com/forms/d/e/1FAIpQLSfhuhFxvezMhPEoFlN9yFEkUifGQlGP4HmJQgx6GP32WZchBw/viewform).
- **ACCOUNT:** Conta onde o app será instalado que também precisa ser colocada no fomulário citado acima.
- **TITULO_DO_APP:** Titulo do app que será exibido na listagem de apps no admin da loja.
- **DESCRIÇÃO_DO_APP:** Descrição do app que também será exibido na listagem de apps no admin da loja.

Modifique o arquivo `./package.json` e altere as propriedades abaixo

```json
{
  "name": "NOME_DO_APP",
  ...
}
```

- **NOME_DO_APP:** Mesmo nome utilizado no arquivo anterior (Sistemicamente não é utilizado, mas só por conta que no repo da VTEX já vem preenchido).

**🚀 Pronto, seu repositório já esta configurado para receber suas atualizações! 🚀**

## 💻 Programando com os padrões do template

Como o projeto tem como uma das finalidades padronizar a segurança, nomeclatura de rotas e estrutura de pastas, sugerimos algumas formas de utilizar os módulos já desenvolvidos no template.

### Segurança

O app contém duas funções/módulos de validação de segurança para as rotas. Uma é utilizada como middleware e aceita todos os tipos de validação que serão citados abaixo e outra é utilizada como função validadora dentro do Controller que pode ser especificada o tipo de autenticação que a rota vai aceitar.

**Tipos de validação:**
- **ADMIN:** Quando a requisição tem um token de admin, ou seja, que foi feita da pagina de admin da loja, conforme [documentação da VTEX](https://developers.vtex.com/docs/guides/getting-started-authentication#user-token).
- **STORE:** Quando a requisição tem um token de usuário logado, ou seja, quando o usuário fez login na loja, conforme [documentação da VTEX](https://developers.vtex.com/docs/guides/getting-started-authentication#user-token).
- **ALTERNATIVE_TOKEN:** Quando a requisição envia um header `Authorization` do tipo `Bearer Token` com o token que foi configurado na pagina de configuração do app no admin.

**Validação via middleware:**
No arquivo `./node/middlewares/defaultSecurityCheck.ts` é exportada uma função que deve ser usada como middleware na rota criada no arquivo principal `./index.ts` dessa forma:

```js
export default new Service({
  clients,
  routes: {
    routeName: method({
      POST: [defaultSecurityCheck, /*proxima função*/],
    }),
  },
})
```

Quando a sua rota que tem esse middleware adicionado a ela receber uma requisição, ele irá fazer a verificação se a requisição tem o tipo de acesso **"ADMIN"** ou **"STORE"**, caso tenha, ele chama a próxima função que foi listada no array da requisição, caso não tenha, a requisição é retornada com o *status code* `401` que significa **requisição não autorizada** conforme as [normas HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

**Validação via função:**

No arquivo `./node/src/helpers/securityCheck.ts` é exportada uma função que deve ser usada como uma validação em uma estrutura condicional. Segue um exemplo de utilização:

```js
const ìsUserValid = await securityCheck({
  ctx,
  accessType: ['ALTERNATIVE_TOKEN', 'STORE'],
})

if(!ìsUserValid) {
  // tratativa de erro
}

// executa o código
```
Como a função recebe um array na variavel `accessType` é possivel colocar mais de um tipo de validação na função, como foi mostrado no exemplo acima.

### Declaração de rotas

A fim de padronizar a declaração das rotas no app, foi criado um padrão a ser seguindo que visa melhorar não só a padronização mas também evitar que ocorra o problema de dois microserviços terem a mesma rota e o versionamento de rotas. A rota deve ser alterada no arquivo `./node/service.json`.

O padrão sugerido é:

```json
...
"routes": {
    "routeName": {
      "path": "/{{VERSÃO_ROTA}}/{{NOME_APP}}/{{NOME_ROTA}}",
      ...
    }
  }
```
- **VERSÃO_ROTA:** Versão da rota em questão (v1, v2, v3...) que visa ter a possibilidade de versionar as rotas.
- **NOME_APP:** Nome do app em questão que foi colocado na propriedade `name` do arquivo `./manifest.json`. Esse é um dos mais importantes, o padrão sugerido é que o nome não passe de duas palavras e seja escrito em caixa baixa e tudo junto. Um exemplo, se o nome do app for `app-teste-lorem` ficaria `appteste`, `applorem`, etc.
- **NOME_ROTA:** Nome da rota com um nome sugestivo a sua função, um exemplo, se é uma rota que lida com listagem de motivos de cancelamento, ficaria `getmotives` ou `listmotives`


### Estrutura de pastas
## 📫 Contribuindo com o template

<!---Se o seu README for longo ou se você tiver algum processo ou etapas específicas que deseja que os contribuidores sigam, considere a criação de um arquivo CONTRIBUTING.md separado--->

Para contribuir com <nome_do_projeto>, siga estas etapas:

1. Clone o repositório para a sua maquina
2. Crie um branch: `git checkout -b <nome_branch>`.
3. Faça suas alterações e confirme-as: `git commit -m '<mensagem_commit>'`
4. Envie para o branch original: `git push origin <nome_do_projeto>/<local>`
5. Crie a solicitação de pull.

Como alternativa, consulte a documentação do GitHub em [como criar uma solicitação pull](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🤝 Colaboradores

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/luizbpacct" target="_blank" title="Luiz Carlos B Pereira">
        <img src="https://avatars.githubusercontent.com/u/115479427?v=4" width="50px;" style="border-radius: 100%;" alt="Foto do Iuri Silva no GitHub"/><br>
      </a>
    </td>
  </tr>
</table>

[⬆ Voltar ao topo](#nome-do-projeto)<br>
