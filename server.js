const express = require('express');
const path = require('path');
const app = express();

// 開発環境 LiveReload有効化
if (process.env.NODE_ENV !== 'production') {
  const livereload = require('livereload');
  const connectLiveReload = require('connect-livereload');
  const liveReloadServer = livereload.createServer();
  liveReloadServer.watch(path.join(__dirname, 'public'));
  liveReloadServer.server.once('connection', () => {
    setTimeout(() => {
      liveReloadServer.refresh('/');
    }, 100);
  });
  app.use(connectLiveReload());
}

// EJS設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));

// 公開フォルダ設定
app.use(express.static(path.join(__dirname, 'public')));

// ルート
app.get('/', (req, res) => {
  res.render('index');
});

// 起動
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;