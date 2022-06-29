function userLogged(req, res, next) {
  if (req.session?.logged == true) {
        console.log("LOGEADO");
        return next();
  }else{
        console.log("Error")
    }
}

module.exports = { userLogged };