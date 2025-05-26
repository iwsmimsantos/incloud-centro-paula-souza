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
  <summary><strong>Sumário</strong></summary>

- <details>
    <summary><a href="#1-introdução"><strong>1. Introdução</strong></a></summary>
    <ul>
      <li><a href="#11-objetivo-do-documento">1.1 Objetivo do Documento</a></li>
    </ul>
  </details>

- <details>
    <summary><a href="#2-política-de-branches"><strong>2. Política de Branches</strong></a></summary>
    <ul>
      <li><a href="#21-visão-geral-do-gitflow">2.1 Visão Geral do Gitflow</a></li>
      <li><a href="#22-estrutura-de-branches">2.2 Estrutura de Branches</a></li>
      <li><a href="#23-diretrizes-de-uso-das-branches">2.3 Diretrizes de Uso das Branches</a></li>
    </ul>
  </details>

- <a href="#3-políticas-de-commit"><strong>3. Políticas de Commit</strong></a>

- <a href="#4-política-de-push-e-pull-requests"><strong>4. Política de Push e Pull Requests</strong></a>

- <a href="#referências"><strong>Referências</strong></a>

</details>

# 1. Introdução
O desenvolvimento colaborativo de software exige processos bem definidos para garantir a organização, qualidade e eficiência no gerenciamento do código. Este documento apresenta as diretrizes adotadas pela equipe para estruturar o fluxo de trabalho, desde o versionamento até a entrega das funcionalidades. Ele reflete a importância de um ambiente colaborativo onde boas práticas são compartilhadas e aplicadas por todos os membros da equipe.

## 1.1 Objetivo do Documento
Este documento tem como objetivo estabelecer regras claras e padronizadas para o uso de ferramentas e metodologias no desenvolvimento do projeto. Ele busca alinhar a equipe em relação ao Gitflow, políticas de commits, revisão de código e integração contínua, promovendo entregas consistentes e minimizando erros. Além disso, serve como referência para garantir que todas as contribuições sigam os mesmos padrões de qualidade e organização.

# 2. Política de Branches
A política de branches é uma parte fundamental do fluxo de trabalho deste projeto, garantindo que o código seja organizado, versionado e entregue de maneira eficiente e consistente. A adoção de um modelo estruturado, como o Gitflow, permite que a equipe gerencie as diferentes fases do desenvolvimento de forma clara, minimizando conflitos entre versões e facilitando a colaboração entre os membros.

## 2.1 Visão Geral do Gitflow
O Gitflow é um modelo de fluxo de trabalho amplamente utilizado no desenvolvimento de software para gerenciar branches de forma eficiente e organizada. Ele define uma estrutura clara para o ciclo de vida do desenvolvimento, desde a criação de novas funcionalidades até a entrega de versões estáveis para produção. Empresas renomadas, como Aplle, Microsoft e Google , adotam o Gitflow em seus processos de desenvolvimento devido à sua capacidade de manter o código-fonte organizado, facilitar a colaboração entre os membros da equipe e reduzir o risco de conflitos durante o desenvolvimento.

## 2.2 Estrutura de Branches
A seguir, apresentamos o diagrama de estrutura de branches , que ilustra a hierarquia e o propósito de cada branch utilizada no nosso projeto. Essa estrutura foi projetada para garantir clareza, organização e eficiência no gerenciamento do código-fonte.

```bash
├── main                              # Código e documentação consolidados referentes à última sprint finalizada
│   │
│   └── hotfix/nome-do-hotfix         # Correção urgente aplicada diretamente na branch `main`
│
├── develop                           # Integração contínua das novas funcionalidades e documentação em desenvolvimento
│   │
│   ├── feature/nome-da-feature       # Nova funcionalidade sendo desenvolvida
│   │
│   ├── feature/outra-feature         # Outra funcionalidade em desenvolvimento
│   │
│   ├── docs/nome-da-secao            # Documentação de uma seção específica do projeto
│   │
│   ├── docs/outra-secao              # Documentação de outra seção específica do projeto
│   │
│   ├── bugfix/nome-do-bug            # Correção não urgente de um bug
│   │
│   └── release/versao-x.y.z          # Preparação da versão mais atualizada e estável para lançamento da versão x.y.z
```

No contexto do nosso projeto, o deploy da aplicação não está previsto no nosso escopo nem no termo de abertura do projeto. No entanto, dependendo do andamento e das necessidades futuras, a branch `release` poderá ser utilizada para preparar versões estáveis caso decidamos implementar o deploy.

Além disso, neste momento, não utilizaremos branches como `support`, `experiment`, `spike`, `chore` ou `refactor`. Essa decisão foi tomada com base nas características e nos requisitos atuais do projeto. Entretanto, é importante ressaltar que isso pode mudar ao longo do desenvolvimento, de acordo com as necessidades da equipe e do projeto. Caso isso ocorra, este documento será atualizado para refletir as mudanças e garantir que todos os membros da equipe estejam alinhados.

## 2.3 Diretrizes de Uso das Branches
Para garantir consistência e organização no gerenciamento das branches, estabelecemos diretrizes claras sobre como criar, nomear e utilizar cada tipo de branch no projeto. A tabela abaixo apresenta as diretrizes, descrições e padrões de nomenclatura adotados. Todas as branches, exceto hotfix, devem ser integradas à branch develop por meio de pull requests. Além disso, todas as branches devem seguir o padrão kebab-case.


| **Finalidade da branch**                          | **Diretriz**                                                                                     | **Padrão de nomenclatura (kebab-case)**       |
|---------------------------------------|---------------------------------------------------------------------------------------------------|----------------------------------|
| **Desenvolvimento de Funcionalidades** | Cada nova funcionalidade deve ser desenvolvida em uma branch criada a partir da branch `develop`. | `feature/[nome-da-feature]`      |
| **Documentação**                      | Branches para documentação devem ser criadas a partir da branch `develop`.                        | `docs/[nome-da-secao]`           |
| **Correção de Bugs**                  | Branches para correção de bugs não urgentes devem ser criadas a partir da branch `develop`.       | `bugfix/[nome-do-bug]`           |
| **Correções Críticas**       | Branches de hotfix devem ser criadas a partir da branch `main` para corrigir problemas críticos. Após a correção, devem ser integradas tanto à `main` quanto à `develop`.  | `hotfix/[nome-do-hotfix]`        |

Restrições e considerações adicionais:

- **Commits diretos na branch main são proibidos!** A branch `main` foi configurada para não aceitar commits diretamente. Para que alterações sejam incluídas na main, é necessário abrir um pull request da branch `develop` para a branch `main` . O pull request deve ser revisado e aprovado, em sua versão mais recente, por no mínimo duas pessoas.
  
- **Adoção de Novos Padrões ou Branches**: Qualquer novo padrão ou tipo de branch só deve ser adotado após aprovação do grupo e dos docentes envolvidos no projeto. Todas as mudanças devem ser documentadas neste documento.

# 3. Políticas de Commit
Integrar **Conventional Commits** nas políticas de commit ajuda a manter um histórico de commits claro e estruturado, facilitando a automação de processos como geração de changelogs e versionamento semântico.

As mensagens de commit devem seguir o padrão de **Conventional Commits** para garantir clareza e consistência.

**Formato**: `[Tipo][Escopo opcional]: Mensagem clara e descritiva`.

### Tipos de Commit
Abaixo estão os tipos de commit permitidos, com suas respectivas descrições:

<div align="center">
  
| **Tipo**      | **Descrição**                                                                                   |
|:-------------:|:-----------------------------------------------------------------------------------------------:|
| **`feat`**    | Uma nova funcionalidade para o usuário.                                                       |
| **`fix`**     | Correção de bug.                                                                              |
| **`docs`**    | Mudanças na documentação.                                                                     |
| **`style`**   | Mudanças que não afetam o significado do código (espaços em branco, formatação, etc.).        |
| **`refactor`**| Uma mudança de código que não corrige um bug nem adiciona uma funcionalidade.                 |
| **`test`**    | Adição ou correção de testes.                                                                 |
| **`chore`**   | Atualizações de tarefas de build ou ferramentas auxiliares e bibliotecas, como a geração de documentação. |

</div>

### Exemplos de Commit
A seguir, apresentamos uma tabela com exemplos de commits válidos e inválidos, acompanhados de suas respectivas justificativas para facilitar a compreensão do padrão Conventional Commits .

| **Tipo**     | **Exemplo**                                      | **Justificativa**                                                                 |
|--------------|--------------------------------------------------|-----------------------------------------------------------------------------------|
| **Válido ✅** | `feat(auth): adicionar feature de login`         | Segue o padrão Conventional Commits, com tipo, escopo e mensagem descritiva.       |
| **Válido ✅** | `docs: adicionar documentação da seção 3`        | Segue o padrão Conventional Commits. O escopo é opcional, e sua ausência não invalida o commit. |
| **Inválido ❌** | `melhorias: ajustes no código`                   | Inválido porque a mensagem é vaga e não segue o formato estruturado esperado.      |
| **Inválido ❌** | `docs📝: adição da seção X`                      | Inválido porque contém um emoji.         |

### Considerações Importantes:

É fundamental realizar commits frequentes, preferencialmente diários, para facilitar o rastreamento de mudanças e promover uma colaboração eficiente. Para garantir consistência e qualidade no código, implementamos um fluxo automatizado que valida as mensagens de commit e aplica regras de formatação. O Husky intercepta os commits e executa ferramentas como Commitlint , Prettier e ESLint antes de permitir que o commit seja concluído.

O Commitlint é responsável por validar se as mensagens de commit seguem o padrão Conventional Commits. Se a mensagem não estiver no formato correto, o commit é bloqueado até que seja ajustada.

Esse fluxo garante que o código esteja sempre alinhado com os padrões definidos, promovendo consistência e facilitando a colaboração entre os membros da equipe. Ao combinar ferramentas como Husky, Commitlint, Prettier e ESLint, conseguimos manter um repositório limpo, organizado e livre de erros, enquanto as mensagens de commit claras e padronizadas facilitam o rastreamento de mudanças.

# 4. Política de Push e Pull Requests

A seguir, detalhamos as políticas e regras relacionadas ao uso de push e pull requests no projeto. Abaixo, você encontrará informações sobre as restrições de push, os critérios de revisão e os procedimentos para aprovação de pull requests.

### Políticas e Regras de Push

| **Tópico**                | **Instrução**                                                                                     |
|---------------------------|---------------------------------------------------------------------------------------------------|
| **Push Direto**           | Não é permitido fazer push diretamente para a branch `main` ou `dev`.                             |
| **Contribuições**         | Todas as contribuições devem ser feitas via branches e submetidas por meio de pull requests.      |
| **Revisão de Código**     | Todo código deve passar por revisão de código por pares antes de ser mergeado.                    |
| **Testes Automatizados**  | A revisão só deve ser aprovada se os testes automatizados forem bem-sucedidos.                    |
| **Critérios de Qualidade**| A revisão só deve ser aprovada se os critérios de qualidade (cobertura de testes, análise de código) forem atendidos. |

### Revisão por Pares - Critérios de Aprovação

<div align="center">

| **Aspecto**            | **Critério de Revisão**                                                             |
|:-----------------------:|:-----------------------------------------------------------------------------:|
| **Funcionalidade**      | Está funcional e resolve o problema proposto.                                |
| **Testes Automatizados**| Passou em todos os testes automatizados.                                     |
| **Cobertura de Testes** | Cobertura mínima de testes (60% ou mais).                                    |
| **Boas Práticas de Código** | Verificação de boas práticas de código.                                  |
| **Duplicidade de Código**   | Não introduz duplicidade de código.                                      |

</div>

Após a aprovação do pull request, a branch deve ser mergeada na `develop` e fechada. Quando o código estiver pronto para ser integrado à branch `main`, o mesmo processo de revisão deve ser seguido, mas com a participação de pelo menos duas pessoas: o scrum master da sprint e outro membro da equipe. Os revisores devem considerar os critérios descritos nas tabelas anteriores durante a avaliação do pull request.

# Referências

**Conventional Commits**: [https://www.conventionalcommits.org/en/v1.0.0/](https://www.conventionalcommits.org/en/v1.0.0/)  
**GitFlow**: [https://nvie.com/posts/a-successful-git-branching-model/](https://nvie.com/posts/a-successful-git-branching-model/)  
**GitFlow (TargetSO)**: [https://www.targetso.com/2024/02/06/git-flow/](https://www.targetso.com/2024/02/06/git-flow/)  
**GitHub/iuricode - Padrões de Commits**: [https://github.com/iuricode/padroes-de-commits](https://github.com/iuricode/padroes-de-commits)  
**Kebab Case**: [https://www.alura.com.br/artigos/convencoes-nomenclatura-camel-pascal-kebab-snake-case?srsltid=AfmBOopV28BxijBj9e88nldC9OgvJfKfd77yC
