const http = require("http");
const fs = require("fs");
let indexData = fs.readFileSync("./index.html", "utf-8");
console.log(indexData);
let tempData = "";
fetch("https://fantasy.premierleague.com/api/bootstrap-static/")
  .then(res => res.json())
  .then(data => {
    let gameList = [];
    for (let i = 0; i < data.teams.length; i++) {
      gameList[i] = data.teams[i].name;
    }
    tempData = indexData.replace("$$근수짱$$", gameList);
    // 동기처리
    console.log(tempData);
    let object = {};
    object = { gameList };
    console.log(object.gameList);
    object = JSON.stringify(object);
  });
const app = http.createServer((req, res) => {
  let url = req.url;
  if ((req.method === "GET", "POST")) {
    if (url === "/") {
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(tempData);
      res.end();
    }
  }
});
app.listen(5000, () => {
  console.log("서버 오픈");
});
