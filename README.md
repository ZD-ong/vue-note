# vue-note

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