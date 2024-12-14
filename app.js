// console.log("Hello");
// console.log("World");

// console.log(Math.min(1000000, 1000000));

// console.log("Boshlandi");

// function heavyOperation(start, end, step = 1000000000) {
//   return new Promise((resolve) => {
//     let current = start;

//     function processChunk() {
//       // Ma'lum qismini bajaramiz
//       const target = Math.min(current + step, end);
//       console.log(target);
//       for (let i = current; i < target; i++) {
//         // operatsiya
//       }
//       current = target;

//       if (current < end) {
//         // Keyingi qismni Event Loop-ning keyingi aylanishiga qoldiramiz
//         setTimeout(processChunk, 0);
//       } else {
//         resolve("Tayyor");
//       }
//     }

//     processChunk();
//   });
// }

// Ishlatish
// heavyOperation(0, 100000000000).then(() => {
//   console.log("Hisob-kitob tugadi");
// });

// console.log("Tugadi");

// const { Worker } = require("worker_threads");

// const worker = new Worker("./worker.js");

// worker.on("message", (result) => {
//   console.log(result);
// });

// worker.postMessage(10000000000000);

// console.log("ishladi");

// const os = require("os");

// console.log(os.cpus().length);

// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;

// if (cluster.isMaster) {
//   console.log(`Master process ${process.pid} is running`);
//   console.log(`Kompyuterda ${numCPUs} ta yadro bor`);

//   // Har bir yadro uchun worker yaratish
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   // Worker tugatgani haqida xabar
//   cluster.on("exit", (worker) => {
//     console.log(`Worker ${worker.process.pid} tugadi`);
//   });
// } else {
//   // Worker process
//   console.log(`Worker ${process.pid} ishga tushdi`);

//   // Og'ir hisob-kitob
//   let sum = 0;
//   for (let i = 0; i < 25000000000; i++) {
//     // 100 mlrd / 4 = 25 mlrd
//     sum += i;
//   }

//   console.log(`Worker ${process.pid}: ${sum}`);
//   process.exit();
// }

// const cluster = require("cluster");
// const numCPUs = require("os").cpus().length;

// // 100 milliard / CPU yadrolar soni = har bir yadroga tushadigan sikl
// const totalLoop = 100000000000;
// const loopPerCPU = Math.floor(totalLoop / numCPUs);
// let sum = 0;

// if (cluster.isMaster) {
//   console.log(`Master process ishga tushdi`);
//   console.log(`Kompyuterda ${numCPUs} ta yadro bor`);
//   console.log(`Har bir yadroga ${loopPerCPU} ta sikl beriladi`);

//   // Har bir yadro uchun worker yaratish
//   for (let i = 0; i < numCPUs; i++) {
//     cluster.fork();
//   }

//   let completedWorkers = 0;

//   cluster.on("exit", (worker) => {
//     completedWorkers++;
//     console.log(`${worker.process.pid} yadroda sikl tugadi`);

//     if (completedWorkers === numCPUs) {
//       console.log("Barcha sikl tugadi!");
//       console.log(sum);
//       process.exit();
//     }
//   });
// } else {
//   // Worker process
//   console.log(`${process.pid} yadro ishga tushdi`);
//   for (let i = 0; i < loopPerCPU; i++) {
//     sum += i;
//   }

//   console.log(`${process.pid} yadro natijasi: ${sum}`);
//   process.exit();
// }

// import express from "express";
// import fs from "fs";
// import path from "path";
// const app = express();
// const videoPath = path.join(process.cwd(), "123.mp4");
// const stat = fs.statSync(videoPath);
// const fileSize = stat.size;

// console.log(fileSize);

// app.get("/videos", async (req, res) => {
//   const videoPath = path.join(process.cwd(), "123.mp4");
//   const video = fs.createReadStream(videoPath);
//   res.writeHead(200, {
//     "Content-Length": fileSize,
//     "Content-Type": "video/mp4",
//     "Content-Disposition": "attachment;filename=123.mp4",
//   });
//   video.pipe(res);
// });

// app.listen(4000, () => {
//   console.log("run");
// });

// import express from "express";

// const app = express();

// app.use(express.static("src/public"));

// app.set("view engine", "ejs");
// app.set("views", "./src/views");

// app.get("/", (req, res) => {
//   res.render("index", {
//     title: "hello",
//   });
// });

// app.listen(4000, () => {
//   console.log("run");
// });

// import express from "express";
// import winston from "winston";

// const logger = winston.createLogger({
//   // Qaysi darajadagi loglarni yozishni belgilaydi
//   level: "info",

//   // Loglar JSON formatida yoziladi
//   format: winston.format.json(),

//   // Loglarni qayerga saqlash
//   transports: [
//     // Xatolar uchun alohida fayl
//     new winston.transports.File({
//       filename: "error.log", // fayl nomi
//       level: "error", // faqat error darajasidagi loglar
//     }),

//     // Barcha loglar uchun umumiy fayl
//     new winston.transports.File({
//       filename: "combined.log", // barcha darajadagi loglar
//     }),
//   ],
// });

// const app = express();

// app.use((req, res, next) => {
//   logger.info("yangi so'rov", {
//     method: req.method,
//     url: req.url,
//     ip: req.ip,
//   });
//   next();
// });

// app.get("/", async (req, res) => {
//   try {
//     throw new Error("xatolik bo'ldi");
//   } catch (error) {
//     const cleanStack = error.stack
//       .split("\n")
//       .filter((line) => !line.includes("node_modules"))
//       .join("\n");

//     logger.error("Server xatosi", {
//       error: error.message,
//       stack: cleanStack,
//       timestamp: new Date(),
//     });
//     res.send("hello world");
//   }
// });

// app.listen(4000, () => {
//   console.log("run", 4000);
// });

// async function getUserPosts(postId) {
//   try {
//     const response = await fetch(
//       `https://jsonplaceholder.typicode.com/posts/${postId}`
//     );
//     const userPosts = await response.json();
//     return { userPosts, totalPosts: userPosts.length };
//   } catch (error) {
//     console.error("Xatolik yuz berdi:", error);
//   }
// }

// getUserPosts(1).then((data) => console.log(data));

// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("done");
//   }, 3000);
// });

// async function getData() {
//   const response = await promise;
//   return {
//     response,
//   };
// }

// getData().then((value) => {
//   console.log(value);
// });

// const set = new Set();

// set.add("doss");
// set.add("doss");

// set.add("doss");

// console.log(set);

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
// }

let array = [];

array.forEach((element) => {});

// while (true) {}

const a = 23;
