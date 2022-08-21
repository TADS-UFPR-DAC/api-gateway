const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    if ( req.type == 'admin') next();
    else {
        const token = req.headers["x-access-token"];
        if (!token) {
            return res.status(401).json({ msg: "Token indefinido." });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ msg: "Falha na autenticação do token." });
            }

            if (decoded.type === "motoboy") req.motoboyId = decoded.id;
            else req.associateId = decoded.id;
            req.type = decoded.type;
            
            next();
        });
    }
}

module.exports = verifyJWT;