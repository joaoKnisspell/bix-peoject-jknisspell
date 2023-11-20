# Desafio Bix - Apresentação

<aside>
💡 Considerações: O desafio era desenvolver um dashboard com funcionalidades de Criação, Leitura, Atualização e Exclusão (CRUD) de empresas e funcionários utilizando a tecnologia React.js para o front-end e Django para o back-end, no entanto, julgo ainda não ter o conhecimento necessário em Django para a construção do back-end, logo utilizei a ferramenta Firebase do Google para a contrução do back-end e autenticação de usuários.

</aside>

# **⚙️** Ferramentas Utilizadas

**Front-End** - **React.js:**

- Typescript
- Tailwind CSS
- React Router Dom
- Lucide React (biblioteca de svg's)
- React Toastify (personalização de alert's)
- Date Fns (formatação de data)

************Back-End - Firebase************

- Firebase Firestore (banco de dados)
- Firebase Auth (autenticação)

---

# 🏗 Estrutura

Dentro do diretório da aplicação optei por criar ******oito rotas distintas****** sendo: uma rota para **cadastro de usuários gerais**, uma rota para **cadastro de colaboradores da empresa**, uma **rota padrão de login** para todos os usuários cadastrados, uma **rota de dashboard** com os últimos funcionários e empresas cadastradas, uma **rota única para as empresas cadastradas**, uma **rota única para os funcionários cadastrados**, além de uma **rota para o cadastro de novos usuários** e uma **rota para cadastro de novas empresas**. 

Além da pasta routes, a aplicação conta com uma pasta components onde estão inseridos todos os componentes que utilizei na criação da aplicação, uma pasta context que possui apenas o arquivo de criação do contexto da aplicação(Context API), e uma pasta lib que possui o arquivo de configuração do firebase. 

Optei por utilizar o arquivo App.tsx da aplicação para criar a estrutura inicial padrão de todas as rotas que possuem a sidebar:

![Captura de Tela 2023-11-20 às 12.02.04.png](Desafio%20Bix%20-%20Apresentac%CC%A7a%CC%83o%20be2d7046c71947fdaa85246ed1e5dff0/Captura_de_Tela_2023-11-20_as_12.02.04.png)

     Por último, o arquivo main.tsx da aplicação ficou responsável pela criação da parte de roteamento da aplicação, e fornecimento do contexto da aplicação:

![Captura de Tela 2023-11-20 às 12.09.09.png](Desafio%20Bix%20-%20Apresentac%CC%A7a%CC%83o%20be2d7046c71947fdaa85246ed1e5dff0/Captura_de_Tela_2023-11-20_as_12.09.09.png)

---

# **📚** Contexto

> Primeiramente gostaria de salientar que utilizei o ContextAPI para criação do contexto da aplicação.
> 

Dentro do contexto da aplicação temos oito funções asíncronas, sendo elas:

- addEmployee(): a função realiza o cadastro de um novo funcionário no sistema;
- addCompany(): a função realiza o cadastro de uma nova empresa no sistema;
- updateEmployee(): a função realiza a atualização de informações de um funcionário já existente no sistema;
- updateComapny(): a função realiza a atualização de informações de uma empresa já existente no sistema;
- getEmployees(): a função realiza a busca por todos os funcionários já cadastrados no sistema;
- getCompanies(): a função realiza a busca por todas as empresas já cadastrados no sistema;
- removeDoc(): a função realiza a remoção de um documento do sistema podendo ser, tanto um funcionário cadastrado, quanto uma empresa cadastrada;
- signOutUser(): a função realiza a finalização do respectivo usuário logado no sistema;

Além das funções assíncronas temos uma função setUserData() que é executada dentro das rotas de cadastro de usuário colaborador, cadastro de usuário geral e de login da aplicação. Está função, quando executada, armazena as informações do usuário atual que realizou o cadastro dentro do estado user que criamos no contexto da aplicação. 

Observação: Optei por criar as diferentes funções de cadastro de usuário e login de usuários dentro das respectivas rotas, pois a biblioteca **react-router-dom** não permite que a gente utilize a função **useNavigate()** dentro de algum arquivo que não seja o componente ou subcomponente de alguma rota da aplicação. Neste caso, se deixássemos essas funções dentro do arquivo de contexto, elas causariam **erro**.  

---

# 💻 Cadastro de usuários

> Como dito anteriormente, temos páginas de cadastro distintas para funcionários da empresa e usuários gerais. Sendo assim, criei duas funções assíncronas distintas para o cadastramento de colaboradores da empresa, que terão permissão para a inserção e exclusão de dados no sistema, e usuários gerais que apenas poderão visualizar estas informações enquanto logados no sistema.
> 

Na rota [https://bix-project-jknisspell.vercel.app/guestSignUp](https://bix-project-jknisspell.vercel.app/guestSignUp), a função **signUpGuestUser()** é executada, recebendo como parâmetro o email do usuário e a senha. Após a validação dos dados enviados pelo usuário ser concluída, executamos a função setDoc() do Firebase, passando a referência no banco de dados na qual queremos armazenar esta coleção e também os respectivos dados do usuário. Além das propriedades de nome e email, passamos a propriedade isAdmin como **false**. Após a criação do documento do respectivo usuário no banco de dados, executamos a função setUserData() que criamos no nosso contexto, passando esses dados do usuário. Também armazenamos os dados dele no localStorage do navegador. Dessa forma, será possível manter o usuário logado mesmo se ele fechar a aba de navegação."

Observação: A propriedade isAdminque passamos o valor false será importante no futuro para verificar se este usuário possui ou não acesso para inserção ou remoção de dados no nosso sistema.   

Já na rota [https://bix-project-jknisspell.vercel.app/employeeSignUp](https://bix-project-jknisspell.vercel.app/employeeSignUp), a função **signUpEmployeeUser()** é executada. Apesar de receber apenas os dados de email e senha do usuário como parâmetro, ao criar um documento utilizando a função setDoc() do Firebase, passamos a propriedade isAdmin como true. Isso garante que esse colaborador possua as permissões de inserção e exclusão de informações no sistema.

---
