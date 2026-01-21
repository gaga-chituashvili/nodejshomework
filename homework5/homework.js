const http = require("http");

// სიმულირებული მომხმარებლების მონაცემები
const users = [
  { id: 1, name: "John Johnson" },
  { id: 2, name: "Lika Beridze" },
  { id: 3, name: "Luka Shengelia" },
];

// სერვერის სექმნა
const server = http.createServer((req, res) => {
  // მოთხოვნის დამუშავება
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === "GET") {
    if (url.pathname === "/userInfo") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(users));
    } else if (url.pathname.startsWith("/userInfo/")) {
      console.log(url.pathname);
      const userId = Number(url.pathname.substring(10));
      if (isNaN(userId)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Error: userId must be a number!",
          }),
        );
      } else {
        const user = users.find((user) => user.id === userId);
        if (user) {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(user));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message: "User with given Id could not be found",
            }),
          );
        }
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } else if (req.method === "POST") {
    if (url.pathname === "/addUser") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const newUser = JSON.parse(body);
        const ids = users.map((user) => user.id);
        const maxId = Math.max(...ids);
        newUser.id = maxId + 1;
        users.push(newUser);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newUser));
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } else if (req.method === "PUT") {
    if (url.pathname.startsWith("/updateUser/")) {
      const userId = Number(url.pathname.substring(12));
      if (isNaN(userId)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Error: userId must be a number!",
          }),
        );
      } else {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const updateUser = JSON.parse(body);
          const userIndex = users.findIndex((user) => user.id === userId);
          if (userIndex !== -1) {
            users[userIndex] = updateUser;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(updateUser));
          } else {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(
              JSON.stringify({
                success: false,
                message: "User with given Id could not be found",
              }),
            );
          }
        });
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } else if (req.method === "DELETE") {
    if (url.pathname.startsWith("/deleteUser/userId")) {
      const userId = Number(url.pathname.substring(12));
      if (isNaN(userId)) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            success: false,
            message: "Error: userId must be a number!",
          }),
        );
      } else {
        const userIndex = users.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
          users.splice(userIndex, 1);
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: true,
              message: `User with id ${userId} deleted successfully`,
            }),
          );
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: false,
              message: `User with id ${userId} not found`,
            }),
          );
        }
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  } else {
    res.writeHead(405, { "Content-Type": "text/plain" });
    res.end("Method Not Allowed");
  }
});

// სერვერის გაშვება 3000 პორტზე
const hostname = "0.0.0.0";
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});