import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.status(401).send("You need to login");

    jwt.verify( token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(401).send("You need to login");
        
        req.user = user;
        next();
    })
}