//estruturando os dados buscados no GitHub
export class GithubUser {
    //metodo que vai procurar o username, onde será pego o dado
    static seach(username) {
      const endpoint = `https://api.github.com/users/${username}`;
  
      //fech busca na internet - promessa de dados que vai ser tranformada em JSON
      //retorna o objeto direto do GitHub, por user, pegando os dados necessários
      return fetch(endpoint)
        .then((data) => data.json())
        .then(({ login, name, public_repos, followers }) => ({
          login,
          name,
          public_repos,
          followers,
        }));
    }
  }