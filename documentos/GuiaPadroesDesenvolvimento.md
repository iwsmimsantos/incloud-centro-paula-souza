<Table>
  <tr>
    <td><a href= "https://www.cps.sp.gov.br/"><img src="img/logo-CPS.jpg" alt="Centro Paula Souza" border="0"></td>
    <td>
      <a href= "https://www.inteli.edu.br/"><img src="img/logo-Inteli.png" alt="Inteli - Instituto de Tecnologia e Liderança" border="0"></a>
    </td>
  </tr>
</table>

# Nome do projeto: Incloud

## Nome do grupo: Inclouders

## Integrantes:

<div align="center">
  <table>
    <tr>
      <td align="center"><a href="https://www.linkedin.com/in/andre-lobo-dev/"><img style="border-radius: 50%;" src="img/André_Eduardo_Lobo%20(1).jpg" width="150px;" alt=""/><br><sub><b>André Lobo</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/gabriel-nascimento-563382243/"><img style="border-radius: 50%;" src="img/Gabriel_Santos_Nascimento.jpg" width="150px;" alt=""/><br><sub><b>Gabriel Nascimento</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/iasmim-/"><img style="border-radius: 50%;" src="img/Iasmim_Santos_Silva_de_Jesus.jpg" width="150px;" alt=""/><br><sub><b>Iasmim Santos</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/nicolasramons/"><img style="border-radius: 50%;" src="img/Nicolas%20Ramon%20da%20Silva.jpg" width="150px;" alt=""/><br><sub><b>Nicolas Ramon</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/rafael-furtado-b30715265/"><img style="border-radius: 50%;" src="img/Rafael%20Furtado%20Victor%20dos%20Santos.jpg" width="150px;" alt=""/><br><sub><b>Rafael Furtado</b></sub></a></td>
      <td align="center"><a href="https://www.linkedin.com/in/thalyta-viana/"><img style="border-radius: 50%;" src="img/Thalyta%20da%20Silva%20Viana.jpg" width="150px;" alt=""/><br><sub><b>Thalyta Viana</b></sub></a></td>
      <td align="center"><a href="http://www.linkedin.com/in/viniciussavian"><img style="border-radius: 50%;" src="img/Vinicius%20dos%20Reis%20Savian.jpg" width="150px;" alt=""/><br><sub><b>Vinicius Savian</b></sub></a></td>
    </tr>
  </table>
</div>

# Sumário

<details>
  <summary><strong>Clique aqui para expandir</strong></summary>
  <details>
    <summary><a href="#1-introdução"><strong>1. Introdução</strong></a></summary>
  </details>


  <details>
    <summary><a href="#2-padrões-de-codificação"><strong>2. Padrões de Codificação</strong></a></summary>
    <ul>
      <li><a href="#21-naming-conventions">2.1 Naming Conventions</a></li>
      <li><a href="#22-formatação-de-código">2.2 Formatação de Código</a></li>
      <li><a href="#23-comentários-e-documentação">2.3 Comentários e Documentação</a></li>
    </ul>
  </details>


  <details>
    <summary><a href="#3-padrões-de-projeto"><strong>3. Padrões de Projeto</strong></a></summary>
    <ul>
      <li><a href="#31-design-patterns">3.1 Design Patterns</a></li>
      <li><a href="#32-arquitetura-de-software">3.2 Arquitetura de Software</a></li>
    </ul>
  </details>

  <details>
    <summary><a href="#4-práticas-de-desenvolvimento"><strong>4. Práticas de Desenvolvimento</strong></a></summary>
    <ul>
      <li><a href="#41-testes-automatizados">4.1 Testes Automatizados</a></li>
      <li><a href="#42-controle-de-qualidade">4.2 Controle de Qualidade</a></li>
    </ul>
  </details>

  <details>
    <summary><a href="#5-ferramentas-e-tecnologias"><strong>5. Ferramentas e Tecnologias</strong></a></summary>
    <ul>
      <li><a href="#51-ferramentas-de-desenvolvimento">5.1 Ferramentas de Desenvolvimento</a></li>
      <li><a href="#52-tecnologias-e-frameworks">5.2 Tecnologias e Frameworks</a></li>
    </ul>
  </details>

</details>

# 1. Introdução

Este documento estabelece padrões de codificação e práticas de desenvolvimento para garantir a qualidade e a consistência do código. Em engenharia de software, convenções bem definidas são essenciais para reduzir custos de manutenção e minimizar erros decorrentes de ambiguidades ou práticas inconsistentes. A padronização do código facilita a identificação de anomalias durante revisões, simplifica a depuração e garante que soluções sejam implementadas de forma uniforme em toda a base de código. Além disso, a adoção de formatos documentais padronizados cria uma referência técnica clara, alinhando a equipe e reduzindo retrabalho. Essas práticas fortalecem a colaboração entre desenvolvedores, promovem a reusabilidade de componentes e garantem que o software permaneça adaptável a mudanças, mesmo em ambientes dinâmicos com entregas ágeis.

## 2. Padrões de Codificação

Os padrões de codificação definidos nesta seção visam promover consistência, legibilidade e manutenibilidade do código. Esses padrões serão aplicados para garantir que o software seja compreensível por todos os desenvolvedores e esteja alinhado às melhores práticas da indústria.

### 2.1. Naming Conventions

Serão adotadas as seguintes convenções para nomeação de variáveis, funções, classes, constantes e outros elementos:

- **Variáveis e Funções**: Utilize `camelCase` com nomes descritivos.
  ```typescript
  // ✅ Correto: Nome descritivo em camelCase
  let numeroDeTentativas = 5;

  // ❌ Incorreto: Nome genérico ou não em camelCase
  let num_tentativas = 5;
  ```

- **Classes e Interfaces**: Utilize `PascalCase`.
  ```typescript
  // ✅ Correto: Nome descritivo em PascalCase
  export class PerfilUsuario { }

  // ❌ Incorreto: Nome genérico ou não em PascalCase
  export class perfil_usuario { }
  ```

- **Constantes**: Utilize `UPPER_CASE` com underscores.
  ```typescript
  // ✅ Correto: Nome descritivo em UPPER_CASE
  const LIMITE_MAXIMO_USUARIOS = 100;

  // ❌ Incorreto: Nome genérico ou não em UPPER_CASE
  const limiteMaximoUsuarios = 100;
  ```

### 2.2. Formatação de Código

As seguintes formatações devem ser seguidas:

- **Indentação**: Utilize **2 espaços** para indentação.
  ```typescript
  // ✅ Correto: Indentação com 2 espaços
  if (condicao) {
    console.log("Executando...");
  }

  // ❌ Incorreto: Indentação inconsistente
  if (condicao) {
  console.log("Executando...");
  }
  ```

- **Linhas**: Mantenha o comprimento das linhas em até **80 caracteres** para evitar quebras indesejadas.
  ```typescript
  // ✅ Correto: Quebra de linha para respeitar o limite
  const mensagem =
    "Esta é uma mensagem que respeita o limite recomendado de 80 caracteres.";

  // ❌ Incorreto: Linha muito longa
  const mensagem =
    "Esta é uma mensagem extensa que ultrapassa o limite recomendado de 80 caracteres, podendo ser quebrada em várias linhas, o que pode comprometer a legibilidade do código.";
  ```

- **Chaves**: Coloque chaves de abertura na mesma linha.
  ```typescript
  // ✅ Correto: Chave na mesma linha
  if (condicao) {
    console.log("Executando...");
  }

  // ❌ Incorreto: Chave em nova linha
  if (condicao)
  {
    console.log("Executando...");
  }
  ```

### 2.3. Comentários e Documentação

Comentários devem ser usados para explicar lógica complexa ou decisões não óbvias que possam gerar dúvidas para outros desenvolvedores. Evite comentários redundantes ou que apenas repitam o que o código já expressa claramente.

- **Comentários de Linha**: Explique lógica complexa.
  ```typescript
  // ✅ Correto: Comentário para explicar lógica não óbvia
  let desconto = valorTotal > 1000 ? valorTotal * 0.1 : valorTotal * 0.05; // Aplica desconto progressivo com base no valor total da compra

  // ❌ Incorreto: Comentário redundante
  let total = preco * quantidade; // Calcula o total
  ```

- **Comentários de Bloco**: Use JSDoc para documentar funções e classes.
  ```typescript
  // ✅ Correto: Documentação clara com JSDoc
  /**
   * Calcula o total de um pedido.
   * @param {number} preco - Preço unitário do item.
   * @param {number} quantidade - Quantidade de itens.
   * @returns {number} Total calculado.
   */
  function calcularTotal(preco: number, quantidade: number): number {
    return preco * quantidade;
  }

  // ❌ Incorreto: Ausência de documentação
  function calcularTotal(preco: number, quantidade: number): number {
    return preco * quantidade;
  }
  ```

### 2.4. Uso de Aspas

Utilize aspas simples para strings.

```typescript
// ✅ Correto: Uso de aspas simples
const mensagem = 'Olá, mundo!';

// ❌ Incorreto: Uso de aspas duplas
const mensagem = "Olá, mundo!";
```

## 3. Regras Específicas do Angular

### 3.1. Sufixos de Classes

Classes de componentes e diretivas devem seguir convenções específicas de sufixos para garantir clareza e consistência.

```typescript
// ✅ Correto: Classe com sufixo 'Component' para componentes
export class PerfilUsuarioComponent { }

// ❌ Incorreto: Classe sem sufixo específico
export class Usuario { }
```

### 3.2. Prefixos de Seletores

Os seletores de componentes e diretivas devem usar o prefixo **app** para evitar conflitos e seguir convenções.

```typescript
// ✅ Correto: Seletor com prefixo 'app' e formato kebab-case para componentes
@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
})
export class PerfilUsuarioComponent { }

// ❌ Incorreto: Seletor sem prefixo
@Component({
  selector: 'perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
})
export class PerfilUsuarioComponent { }
```

### 3.3. Inputs e Outputs

Evite o uso de prefixos redundantes em inputs e outputs.

```typescript
// ✅ Correto: Input sem prefixo redundante
@Input() nome: string;

// ❌ Incorreto: Input com prefixo redundante
@Input() inputNome: string;
```

### 3.4. Interfaces de Ciclo de Vida

Sempre implemente as interfaces de ciclo de vida do Angular para garantir clareza e boas práticas.

```typescript
// ✅ Correto: Implementação explícita da interface OnInit
export class PerfilUsuarioComponent implements OnInit {
  ngOnInit(): void {
    console.log('Componente inicializado');
  }
}

// ❌ Incorreto: Método de ciclo de vida sem implementar a interface
ngOnInit() {
  console.log('Componente inicializado');
}
```

### 3.5. Pipes Personalizados

Pipes personalizados devem implementar a interface `PipeTransform` e usar o prefixo **app**.

```typescript
// ✅ Correto: Pipe implementando PipeTransform e usando prefixo 'app'
@Pipe({ name: 'appFormatarData' })
export class FormatarDataPipe implements PipeTransform {
  transform(valor: Date): string {
    return valor.toDateString();
  }
}

// ❌ Incorreto: Pipe sem implementar PipeTransform
@Pipe({ name: 'formatarData' })
export class FormatarDataPipe {
  transform(valor: Date): string {
    return valor.toDateString();
  }
}
```


## 4. Padrões de Projeto

Os padrões de projeto definidos nesta seção visam promover uma arquitetura robusta, modular e escalável. Eles foram selecionados por sua relevância para os objetivos do projeto e por representarem práticas consolidadas e amplamente adotadas no mercado de desenvolvimento de software.

Segue os padrões que serão utilizados:

**Singleton**:  
  O padrão Singleton garante que uma classe tenha apenas uma instância durante o ciclo de vida da aplicação. É ideal para cenários onde recursos compartilhados, como serviços de autenticação ou configurações globais, precisam ser centralizados. No Angular, o Singleton é implementado automaticamente para serviços providos no escopo `root`. 

**Exemplo de uso**: um serviço de autenticação que gerencia o estado do usuário logado em toda a aplicação.

  ```typescript
  @Injectable({
      providedIn: 'root', // Define o serviço como Singleton
  })
  export class AuthService {
      private usuarioLogado: string = ''; // Armazena o nome do usuário logado

      login(usuario: string) {
          this.usuarioLogado = usuario; // Simula o login do usuário
      }

      getUsuarioLogado() {
          return this.usuarioLogado; // Retorna o usuário logado
      }
  }
  ```
  **Descrição**: O código acima demonstra um serviço Singleton (`AuthService`) que centraliza o estado do usuário logado. A instância única garante que o estado seja consistente em toda a aplicação.

**Observer (Observable)**:  
  O padrão Observer é usado para gerenciar fluxos de dados assíncronos, permitindo que múltiplos observadores reajam a mudanças em um estado ou evento. No Angular, ele é implementado pelo RxJS, facilitando operações como requisições HTTP e manipulação de eventos. 

**Exemplo de uso**: recuperar dados de uma API e exibi-los na interface do usuário.
  ```typescript
  this.http.get('/api/usuarios') // Faz uma requisição GET para a API
      .subscribe(
          (dados) => {
              console.log('Dados recebidos:', dados); // Exibe os dados no console
          },
          (erro) => {
              console.error('Erro ao buscar dados:', erro); // Trata possíveis erros
          }
      );
  ```
  **Descrição**: O código acima demonstra o uso do padrão Observer com RxJS para consumir dados de uma API. O método `subscribe` permite que o componente reaja aos dados recebidos ou trate erros.
  
Para mais informações sobre esses e outros design patterns, consulte o site [Refactoring Guru](https://refactoring.guru/), que fornece explicações aprofundadas e exemplos práticos.  


### 4.1. Arquitetura de Software

Utilize a arquitetura de três camadas para organizar o projeto, separando responsabilidades e promovendo modularidade. Essa abordagem divide o sistema em três camadas principais:

 **Camada de Apresentação**  
  Responsável pela interface do usuário. Em uma aplicação Angular, essa camada é implementada por meio de componentes e templates. 

**Exemplo de uso**: exibir informações de perfil de usuário na tela.

  ```typescript
  @Component({
      selector: 'app-perfil-usuario', // Define o seletor do componente
      templateUrl: './perfil-usuario.component.html', // Define o template HTML
  })
  export class PerfilUsuarioComponent {
      nomeUsuario: string = 'João Silva'; // Exemplo de dado exibido no template
  }
  ```
  **Descrição**: O código acima define um componente Angular (`PerfilUsuarioComponent`) que exibe o nome do usuário na interface. O template HTML vinculado ao componente renderiza os dados na tela.

**Camada de Negócios**  
  Contém a lógica de negócios e regras específicas da aplicação. Em Angular, essa camada é implementada por meio de serviços. 

**Exemplo de uso**: calcular o total de um pedido com base no preço e quantidade.

  ```typescript
  @Injectable({
      providedIn: 'root', // Define o serviço como Singleton
  })
  export class PedidoService {
      calcularTotal(preco: number, quantidade: number): number {
          return preco * quantidade; // Calcula o total do pedido
      }
  }
  ```
  **Descrição**: O código acima demonstra um serviço (`PedidoService`) que encapsula a lógica de negócio para calcular o total de um pedido. Esse método pode ser reutilizado em diferentes partes da aplicação.

**Camada de Dados**  
  Gerencia o acesso a dados, como bancos de dados ou APIs externas. No backend, essa camada pode ser implementada por meio de controladores ou módulos dedicados. 

**Exemplo de uso**: consultar todos os usuários em um banco de dados.

  ```typescript
  export class UsuarioController {
      constructor(private db: Database) {}

      async findAll(): Promise<any[]> {
          return this.db.query('SELECT * FROM usuarios'); // Consulta todos os usuários
      }
  }
  ```
  **Descrição**: O código acima demonstra um controlador (`UsuarioController`) que abstrai o acesso ao banco de dados. O método `findAll` retorna todos os registros de usuários, simplificando a interação com a camada de dados.

# 5. Práticas de Desenvolvimento
_conteúdo_

## 5.1 Testes Automatizados

- Testes Unitários: Utilize Jest para criar testes unitários
  - Exemplo:
    ```
    test('adiciona 1 + 2 para igualar 3', () => {
      expect(1 + 2).toBe(3);
    });
    ```

- Testes de Integração: Como sugestão, utilizar o Cypress para testes de integração.
  - Exemplo: Testar a interação entre componentes de frontend e backend.

- Testes end-to-end: Como sugestão, utilizar o Cypress para testes end-to-end. 
  - Exemplo: Testar um RF de ponta a ponta.

## 5.2 Controle de Qualidade

- Revisão de Código: Todos os commits devem ser revisados por pelo menos um outro desenvolvedor.

- Sugestão: Utilizar ESLint para análise estática de código JavaScript/TypeScript.

## 5.1. Ferramentas e Tecnologias

As ferramentas e tecnologias adotadas desempenham um papel essencial na automatização de processos, validação de código e facilitação do desenvolvimento. Elas são amplamente utilizadas no mercado de software, garantindo padronização, redução de erros e maior produtividade. Essas soluções ajudam a manter o código limpo, consistente e alinhado com as melhores práticas da indústria.

### 5.2. Ferramentas de Desenvolvimento

- **Editor de Código**: Visual Studio Code.  
- **Plugins Recomendados**: ESLint, Prettier, GitLens.  

### 5.3. Tecnologias e Frameworks

- **Backend**: Node.js com TypeScript.  
- **Frontend**: Angular com TypeScript.  

Essas ferramentas e tecnologias foram escolhidas por sua popularidade e robustez. Juntas, elas garantem eficiência, escalabilidade e qualidade no desenvolvimento.

### 5.4. Ferramentas de Garantia de Qualidade

Para garantir que todos os membros do grupo sigam os padrões definidos, implementamos um fluxo automatizado que utiliza diversas ferramentas integradas ao processo de commit. Esse fluxo garante que o código esteja formatado corretamente, livre de erros e alinhado com as melhores práticas antes de ser enviado ao repositório.

1. **Husky**  
   O processo começa com o **Husky**, que intercepta os commits usando Git hooks. Assim que um desenvolvedor tenta realizar um commit (por exemplo, com `git commit -m "feat: adiciona funcionalidade"`), o Husky ativa automaticamente as próximas etapas do fluxo.

2. **lint-staged**  
   Em seguida, o **lint-staged** entra em ação para aplicar as ferramentas apenas aos arquivos alterados no commit atual. Isso otimiza o processo, evitando verificações desnecessárias em arquivos que não foram modificados. Por exemplo, se você alterou apenas `login.component.ts` e `auth.service.ts`, apenas esses arquivos serão processados.

3. **Prettier**  
   O **Prettier** é executado primeiro pelo lint-staged. Ele corrige automaticamente problemas simples de formatação, como:
   - Uso de aspas duplas (`"`) em vez de aspas simples (`'`).
   - Indentação com 2 espaços.
   - Quebra de linhas que excedem 80 caracteres.
   - Adição de vírgulas trailing em objetos e arrays multi-linha.

   Durante essa etapa, qualquer inconsistência de formatação é ajustada automaticamente, garantindo que o código siga as convenções estabelecidas sem intervenção manual.

4. **ESLint**  
   Após o Prettier, o **ESLint** valida regras mais complexas que não podem ser corrigidas automaticamente. Ele verifica:
   - Convenções de nomenclatura (ex.: variáveis em `camelCase`, classes em `PascalCase`, constantes em `UPPER_CASE`).
   - Boas práticas específicas do Angular (como sufixos de classes, prefixos de seletores e implementação de interfaces de ciclo de vida).
   - Uso de variáveis não utilizadas.

   Se o ESLint encontrar problemas, ele relatará os erros e bloqueará o commit até que os ajustes necessários sejam feitos. Essa etapa garante que o código esteja alinhado com as melhores práticas e padrões técnicos.

5. **Commitlint**  
   Finalmente, o **Commitlint** valida a mensagem de commit para garantir que ela siga o formato **Conventional Commits**. Se a mensagem de commit não estiver no formato correto, o Commitlint impedirá o commit e solicitará que a mensagem seja ajustada.

Durante todo esse processo, as ferramentas trabalham em conjunto para garantir que o código enviado ao repositório esteja sempre formatado corretamente, livre de erros e alinhado com as melhores práticas. Apenas após todas as etapas serem concluídas com sucesso, o commit é finalizado e o código é integrado ao repositório.
