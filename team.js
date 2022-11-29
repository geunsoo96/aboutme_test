// const team = document.createElement("li");
// const root = document.getElementById("root");
// team.innerHTML = "hi";
// root.appendChild(team);
// console.log(data);
const http = require("http");
const fs = require("fs");
const head = fs.readFileSync("./head.txt");
const main = fs.readFileSync("./main.txt");
fs.writeFileSync("index.html", head + main, (encodeURI = "utf8"));
fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
  .then(res => res.json())
  .then(data => {
    let gameList = [];
    for (let i = 0; i < data.teams.length; i++) {
      gameList[i] = data.teams[i].name;
    }
    let object = {};
    object = { gameList };
    console.log(object.gameList);
    object = JSON.stringify(object);
    fs.writeFileSync("list.json", object);
  });
const app = http.createServer((req, res) => {
  let url = req.url;
  if ((req.method === "GET", "POST")) {
    if (url === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      let data = fs.readFileSync("./index.html");
      res.write(data);
      res.end();
    }
  }
});
app.listen(5000, () => {
  console.log("서버 오픈");
});
