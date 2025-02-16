const express = require('express');
const createError = require('http-errors');
const dotenv = require('dotenv').config();
const path = require("path");
const axios = require('axios');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize DB
require('./initDB')();

app.use(express.static(path.join(__dirname, "public")));

// app.get('/',(req, res, next) => {
//   res.json({message: 'It works...', env_name: process.env.NAME})
//   })


// db設定
const UserRoute = require('./Routes/User.route');
const BoardRoute = require('./Routes/Board.route');
const ImageRoute = require('./Routes/Image.route');
const ImageEditRoute = require('./Routes/ImageEdit.route');
const ImageTagRoute = require('./Routes/ImageTag.route');
const LikeRoute = require('./Routes/Like.route');
const TagRoute = require('./Routes/Tag.route');

// 各ルーターを使用
app.use('/users', UserRoute);
app.use('/boards', BoardRoute);
app.use('/images', ImageRoute);
app.use('/imageedits', ImageEditRoute);
app.use('/imagetags', ImageTagRoute);
app.use('/likes', LikeRoute);
app.use('/tags', TagRoute);



// HTMLページの表示
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/design", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "design.html"));
});



//404 handler and pass to error handler
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

//Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message
    }
  });
});


// 画像生成API
// app.post("/api/generate", async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) {
//     return res.status(400).json({ error: "Prompt is required" });
//   }

//   try {
//     const response = await axios.post("http://127.0.0.1:7860/sdapi/v1/txt2img", {
//       prompt: prompt,
//       steps: 20,
//     });

//     if (response.status === 200) {
//       let imagePath = response.data.images[0];

//       // クエリパラメータを取り除く
//       imagePath = imagePath.split('?')[0];

//       // ファイルパスを正規化
//       const cleanImagePath = path.normalize(imagePath);

//       return res.json({ image: cleanImagePath });
//     } else {
//       return res.status(500).json({ error: "Failed to generate image" });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Error generating image" });
//   }
// });



const PORT = process.env.PORT || 3030;

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + '...');
});
