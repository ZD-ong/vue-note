# vue-note
## 操作步骤
### 1. 初始化项目
```
npm install -g express-generator
express vue-note
cd vue-note
npm install
```

### 2. 环境和工具配置
生成 eslint 配置文件
```
npm install -g eslint
eslint --init
```

配置 ES6环境

```
npm install --save-dev babel-cli babel-preset-env
```
创建 .babelrc
```
{
  "presets": ["env"]
}
```

安装 onchange 模块，每次更改后端文件会实现自动重启
```
npm install --save-dev onchange
```

修改 package.json

```
  "scripts": {
    "start": "babel-node ./bin/www",
    "dev": "onchange \"./**/*.js\" -- npm start "
  },
```

### 3. 单元测试

```
npm install --save-dev mocha chai request
```

创建文件

```
- ...
- app.js
- tests
  |---- models
  |---- routes
     |---- auth.js
     |---- notebooks.js
```

执行

```
./node_modules/.bin/mocha tests/**/*.js
```

把命令加入到 package.json

```
  "scripts": {
    "start": "babel-node ./bin/www",
    "dev": "onchange \"./models/*.js\" \"./routes/*.js\" -- npm start ",
    "test": "./node_modules/.bin/mocha tests/**/*.js"
  }
```

执行

```
npm test
```

### 模型与数据库

```
npm install --save-dev sequelize-cli

./node_modules/.bin/sequelize init

npm install --save sqlite3
npm install --save sequelize
```



增加 seed

```
node_modules/.bin/sequelize seed:generate --name demo-user

```




## 后端接口
### 登录
POST /auth/login

### 注册
POST /auth/register

### 注销
GET /auth/logout

### 列出所有笔记本
GET /notebooks

### 新建一个笔记本
POST /notebooks

### 获取某个笔记本的笔记信息
GET /notebooks/:notebookID

### 更新某个笔记本的信息
PATCH /notebooks/:notebookID

### 删除某个笔记本
DELETE /notebooks/:notebookID

### 列出某个指定笔记本下的笔记列表
GET /notebooks/:notebookID/notes

### 删除某个指定笔记本下的指定笔记
DELETE /notebooks/:notebookID/notes/:noteID

### 在指定笔记本下新建笔记
POST /notebooks/:notebookID/notes

### 更新指定笔记本下指定笔记的信息
PATCH /notebooks/:notebookID/notes/:noteID

## 数据库

user 表

|  字段  | 类型 | 解释 |
| ----  | ---- | ---- |
| username | String |用户名|
| encryptPassword |  String | 密码加密后的值 |



notebook 表
| 字段 | 类型 | 解释 |
| ---- | ---- | ---- |
| title | String | 笔记本标题|


note 表

| 字段 | 类型 | 解释 |
| ---- | ---- | ---- |
| title | String | 笔记标题|
| content | Text | 笔记内容 |







