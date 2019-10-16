/*
 * GET users listing.
 */
exports.list = function (req, res) {
  res.send('respond with a resource');
};


/*
 * GET login page.
 */
exports.login = function (req, res, next) {
  res.render('login');
};

/*
 * GET logout route.
 */
exports.logout = function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
};


/*
 * POST authenticate route.
 * 注意在几乎任何情况下，我们都不应该储存用户的明文密码，而是储存原始密码"加盐"
 * (指通过在密码任意固定位置插入特定的字符串，让散列后的结果和使用原始密码的散列结果不相符)后的散列值。
 * 这样，即便以后数据库被泄露，用户的真实密码也不会被暴露。加密过程可以借助Node.js 的核心模块crypto实现。
 */
exports.authenticate = function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res.render('login', {
      error: "Please enter your email and password."
    });
  }
  /*
  req.collections.users.findOne({
    email: req.body.email,
    password: req.body.password
  }, function (error, user) {
    if (error) return next(error);
    if (!user) return res.render('login', {
      error: "Incorrect email&password combination."
    });
    req.session.user = user;
    req.session.admin = user.admin;
    res.redirect('/admin');
  });
  */
  req.models.User.findOne({
    email: req.body.email,
    password: req.body.password
  }, function (error, user) {
    if (error) return next(error);
    if (!user) return res.render('login', {
      error: 'Incorrect email&password combination.'
    });
    req.session.user = user;
    req.session.admin = user.admin;
    res.redirect('/admin');
  });
};