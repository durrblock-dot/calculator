const hubUrl = "https://browlu27.github.io/gamessite.github.io/";

const games = [
  { name: "All Games Hub", code: "0000", icon: "ALL", url: hubUrl },
  { name: "Geometry Dash", code: "1034", icon: "GD", url: "https://browlu27.github.io/gamessite.github.io/projects/geodash/index.html" },
  { name: "Retro Bowl", code: "1050", icon: "RB", url: "https://browlu27.github.io/gamessite.github.io/projects/retro-bowl/index.html" },
  { name: "Subway Surfers Menu", code: "1061", icon: "SS", url: "https://browlu27.github.io/gamessite.github.io/subway-surfers.html" },
  { name: "1v1.lol", code: "1001", icon: "1v1", url: "https://browlu27.github.io/gamessite.github.io/projects/1v1-lol/index.html" },
  { name: "2048", code: "1002", icon: "2048", url: "https://browlu27.github.io/gamessite.github.io/projects/2048/index.html" },
  { name: "Among Us", code: "1003", icon: "AU", url: "https://browlu27.github.io/gamessite.github.io/projects/among-us/index.html" },
  { name: "Baldi's Basics", code: "1004", icon: "BB", url: "https://browlu27.github.io/gamessite.github.io/projects/baldis-basics/index.html" },
  { name: "Bitlife", code: "1005", icon: "BL", url: "https://browlu27.github.io/gamessite.github.io/projects/bitlife/index.html" },
  { name: "Cookie Clicker", code: "1006", icon: "CC", url: "https://browlu27.github.io/gamessite.github.io/projects/cookie-clicker/index.html" },
  { name: "Doodle Jump", code: "1007", icon: "DJ", url: "https://browlu27.github.io/gamessite.github.io/projects/doodle-jump/index.html" },
  { name: "Drift Boss", code: "1008", icon: "DB", url: "https://browlu27.github.io/gamessite.github.io/projects/drift-boss/index.html" },
  { name: "Duck Life 4", code: "1009", icon: "DL4", url: "https://browlu27.github.io/gamessite.github.io/projects/ducklife4/index.html" },
  { name: "Flappy Bird", code: "1010", icon: "FB", url: "https://browlu27.github.io/gamessite.github.io/projects/flappy-bird/index.html" },
  { name: "Google Snake", code: "1011", icon: "SN", url: "https://browlu27.github.io/gamessite.github.io/projects/google-snake/index.html" },
  { name: "Hextris", code: "1012", icon: "HX", url: "https://browlu27.github.io/gamessite.github.io/projects/hextris/index.html" },
  { name: "Minecraft Classic", code: "1013", icon: "MC", url: "https://browlu27.github.io/gamessite.github.io/projects/minecraft-classic/index.html" },
  { name: "Pac-Man", code: "1014", icon: "PM", url: "https://browlu27.github.io/gamessite.github.io/projects/pacman/index.html" },
  { name: "Paper.io 2", code: "1015", icon: "P2", url: "https://browlu27.github.io/gamessite.github.io/projects/paperio2/index.html" },
  { name: "Rooftop Snipers", code: "1016", icon: "RS", url: "https://browlu27.github.io/gamessite.github.io/projects/rooftop-snipers/index.html" },
  { name: "Slope", code: "1017", icon: "SL", url: "https://browlu27.github.io/gamessite.github.io/projects/slope/index.html" },
  { name: "Smash Karts", code: "1018", icon: "SK", url: "https://browlu27.github.io/gamessite.github.io/projects/smash-karts/index.html" },
  { name: "Stickman Hook", code: "1019", icon: "SH", url: "https://browlu27.github.io/gamessite.github.io/projects/stickman-hook/index.html" },
  { name: "Temple Run 2", code: "1020", icon: "TR2", url: "https://browlu27.github.io/gamessite.github.io/projects/temple-run-2/index.html" },
  { name: "Tunnel Rush", code: "1021", icon: "TNR", url: "https://browlu27.github.io/gamessite.github.io/projects/tunnel-rush/index.html" },
  { name: "Vex 3", code: "1022", icon: "V3", url: "https://browlu27.github.io/gamessite.github.io/projects/vex3/index.html" },
  { name: "Vex 4", code: "1023", icon: "V4", url: "https://browlu27.github.io/gamessite.github.io/projects/vex4/index.html" },
  { name: "Vex 5", code: "1024", icon: "V5", url: "https://browlu27.github.io/gamessite.github.io/projects/vex5/index.html" },
  { name: "Vex 6", code: "1025", icon: "V6", url: "https://browlu27.github.io/gamessite.github.io/projects/vex6/index.html" }
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
