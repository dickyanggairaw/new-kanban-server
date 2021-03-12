function errHandler(err, req, res, next){
    if(err.name == 'SequelizeValidationError'){
        res.status(400).json({message: err.errors[0].message})
    }else if(err.code == 404){
        res.status(err.code).json({message: err.message})
    }
    else{
        res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = errHandler