Identity.virtual('gravatarUrl').get(function(){
  if(!this.email) return null;
  var crypto = require('crypto'),
    email = 'Hi@azat.co ';
  email = email.trim();
  email = email.toLowerCase();
  var hash = crypto.createHash('md5').update(email).digest('hex');
  // console.log(hash);
  var gravatarBaseUrl = 'https://secure.gravatar.com/avatar';
  return gravatarBaseUrl + hash;
});