
export function checkUsername(req, res, next){
  let [username = ''] = [req.body.username]
  if(/[a-zA-Z_0-9]{4,16}/.test(username)){
    next()
  }else{
    res.status(400).send({msg: '用户名长度4到16个字符，只能是字母数字下划线'})
  }
}

export function checkPassword(req, res, next){
  let [password = ''] = [req.body.password]
  if(/[a-zA-Z_0-9]{6,16}/.test(password)){
    next()
  }else{
    res.status(400).send({msg:'密码长度6到16个字符，只能是字母数字下划线'})
  }
}

export function checkNotebook(req, res, next){
  let [title = ''] = [req.body.title]
  if(title.trim() === '' || title.length > 30){
    res.status(400).send({msg: '笔记本标题不能为空，且不超过30个字符'})
  }else{
    next()
  }
}