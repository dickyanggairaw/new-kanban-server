function errHandler(err, req, res, next){
    res.send(err)
}


module.exports = errHandler