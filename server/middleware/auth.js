import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.body.token;
    if(!token) return res.status(401).json({message: 'Invalid token', success: false});

    jwt.verify( token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(401).json({message: 'Invalid token', success: false})

        req.user = user;
        next();
    })
}