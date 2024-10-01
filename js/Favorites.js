export class GithubUser {
  //metodo que vai procurar o username
  static seach(username) {
    const endpoint = `https://api.github.com/users/${username}`;

    //fech busca na internet - promessa que vai ser tranformada em JSON
    //retorna o objeto direto do GitHub, por user
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

//class com a lógica dos dados - como os dados serão estruturados
export class Favorites {
  //o root é a #app
  constructor(root) {
    //colocando a #app e colocando dentro do this.root
    this.root = document.querySelector(root);
    //até aqui os dados estão vazios

    //carrega os dados
    this.load();
  }
  //carregar os dados
  load() {
    //transformando string em array(obj) atraves do JSON - localStorage - guarda os dados(API do browser)
    //nome da chave - @github-favorites:
    this.entries = JSON.parse(localStorage.getItem("@github-favorites:")) || [];
  }

  //deleta o user no upDate()
  delete(user) {
    //filtra do array de user e comparar se um é igual ao que vai ser passado(deletado)
    const filteredEntries = this.entries.filter(
      (entry) => entry.login !== user.login
    );
    //coloca um novo array dentro do entries o filteredEntries
    this.entries = filteredEntries;
    //para mostar sem a linha deletada
    this.upDate();
  }
}

//class que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
  //a leitura sai do main.js e vem para cá - o rott = #app
  constructor(root) {
    //super - passa o root para dentro, linha que liga as duas classes
    super(root);

    //console.log(this.root); = #app

    //só linhas da tabela que estão no body
    this.tbody = this.root.querySelector("table tbody");

    this.upDate();
  }

  upDate() {
    //primeiro - executa a retirada dos tr
    this.removeAllTr();

    //para cada entrada de obj de dados retorna um user
    this.entries.forEach((user) => {
      //colocar em cada linha o objeto de dados
      const row = this.createRow();
      //com a DOM muda o HTML e recebe uma src na img
      row.querySelector(
        ".user img"
      ).src = `https://github.com/${user.login}.png`;
      //mudar os outros dados(conforme obj do array)
      row.querySelector(".user img").alt = `Imagem de ${user.name}`;
      row.querySelector(".user p").textContent = user.name;
      row.querySelector(".user span").textContent = user.login;
      row.querySelector(".repositories").textContent = user.public_repos;
      row.querySelector(".followers").textContent = user.followers;

      //evento no btn (recebe uma funct)- só uma vez melhor usar "onclick" do que "addEventListener"
      row.querySelector(".remove").onclick = () => {
        const isOk = confirm("Tem certeza que deseja deletar essa linha?");
        if (isOk) {
          //para deletar o user e permanecer deletado
          this.delete(user);
        }
      };

      //para criar a alinha que foi criada (createRow()) e add na const row
      this.tbody.append(row);
    });
  }

  //recriando as linhas
  createRow() {
    //criando o tr no HTML pela DOM do JS
    const tr = document.createElement("tr");

    //foi recortado do HTML - o conteúdo do tr
    //colocando o conteúdo dentro do tr
    tr.innerHTML = `
            <td class="user">
              <img
                src="https://github.com/brunooliveira7.png"
                alt="Imagem de brunooliveira7"
              />
              <a href="https://github.com/brunooliveira7" target="_blank">
                <p>Bruno Oliveira</p>
                <span>brunooliveira7</span>
              </a>
            </td>
            <td class="repositories">76</td>
            <td class="followers">9589</td>
            <td>
              <button class="remove">&times;</button>
            </td>
        `;
    return tr;
  }

  removeAllTr() {
    //retira as linhas do body
    this.tbody.querySelectorAll("tr").forEach((tr) => {
      tr.remove();
    });
  }
}
