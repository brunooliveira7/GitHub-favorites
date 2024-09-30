//class com a lógica dos dados - como os dados serão estruturados
export class Favorites {
  //o root é a #app
  constructor(root) {
    //colocando a #app e colocando dentro do this.root
    this.root = document.querySelector(root);
    //até aqui os dados estão vazios

    //aqui carrega os dados
    this.load();
  }
  //carregar os dados
  load() {
    //dados - array contendo objects
    this.entries = [
      {
        login: "brunooliveira7",
        name: "Bruno Oliveira",
        public_repos: "76",
        followers: "120000",
      },
      {
        login: "maykbrito",
        name: "Mayk Brito",
        public_repos: "76",
        followers: "120000",
      },
    ];
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
