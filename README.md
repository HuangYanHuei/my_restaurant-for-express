# 我的餐廳清單

一個使用 Node.js + Express 打造的餐廳美食網站

## 專案畫面

![image](https://github.com/HuangYanHuei/my_restaurant-for-express/blob/main/public/img/index.png?raw=true)

## Features - 產品功能

1. 使用者可以新增一家餐廳
2. 使用者可以瀏覽一家餐廳的詳細資訊
3. 使用者可以瀏覽全部所有餐廳
4. 使用者可以修改一家餐廳的資訊
5. 使用者可以刪除一家餐廳

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/)
2. [Express](https://www.npmjs.com/package/express) 
3. [Express-Handlebars](https://www.npmjs.com/package/express-handlebars)

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone https://github.com/HuangYanHuei/my_restaurant-for-express.git
```

2. 開啟終端機，進入存放此專案的資料夾

```
cd my_restaurant-for-express
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install 指令
```

4. 安裝 nodemon 套件

```
在 Terminal 輸入 nodemon app.js 指令
```

5. 匯入種子檔案

```
node models/seeds/restaurantSeeder.js
```

6. 啟動伺服器，執行 app.js 檔案

```
nodemon app.js
```

7. 當 terminal 出現以下字樣，表示伺服器已啟動並成功連結

```
The Express server is running on http://localhost:3000
```

8. 開啟任一瀏覽器瀏覽器輸入 [http://localhost:3000](http://localhost:3000) 

## Contributor - 專案開發人員

[HuangYanHuei](https://github.com/HuangYanHuei)