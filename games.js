const hubUrl = "https://093ea463-09fe-4391-baff-1f6d9f47a3e9-00-2qpko3yenr5cv.spock.replit.dev/";

const games = [
  {
    name: "Game Hub",
    code: "0000",
    icon: "HUB",
    url: hubUrl
  }
];

const frame = document.getElementById("gameFrame");
const title = document.getElementById("viewerTitle");
const openNewTab = document.getElementById("openNewTab");
const gameList = document.getElementById("gameList");
const search = document.getElementById("search");
const showLibrary = document.getElementById("showLibrary");

function loadGame(game) {
  frame.src = game.url;
  title.textContent = game.name;
  openNewTab.href = game.url;
}

function render(filter = "") {
  const f = filter.toLowerCase();
  gameList.innerHTML = "";

  games
    .filter(game => game.name.toLowerCase().includes(f) || game.code.includes(f))
    .forEach(game => {
      const button = document.createElement("button");
      button.className = "game-button";
      button.innerHTML = `
        <span class="mini-thumb">${game.icon}</span>
        <span>
          <strong>${game.name}</strong>
          <small>${game.code}</small>
        </span>
      `;
      button.addEventListener("click", () => loadGame(game));
      gameList.appendChild(button);
    });
}

search.addEventListener("input", () => render(search.value));
showLibrary.addEventListener("click", () => loadGame(games[0]));

render();
loadGame(games[0]);
