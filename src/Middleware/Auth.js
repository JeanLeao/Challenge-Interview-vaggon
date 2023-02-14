import jwt from "jsonwebtoken"

export function auth(req,res,next){
    const AuthToken = req.headers['authorization'] 
    if (AuthToken != undefined){
        var bearer = AuthToken.split(' ');
        var token = bearer[1];
        
        jwt.verify(token,"tokensecret",(err,data) =>{
            var payload = jwt.decode(token);
                  if (err){
                    console.log(err)
                    res.sendStatus(401);
                    }else{
                        console.log(data);
                        req.token = token; 
                        req.log = {slug: data.slug};
                        next()
                    }
        })
        }else{
            res.sendStatus(401);
        }
    }

