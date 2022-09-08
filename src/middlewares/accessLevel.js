module.exports = {
    clientAccess(req, res, next) {
        if (req.type != 'cliente')
            return res.status(403).json({msg: "Não Autorizado"});
        else
            next();
    },

    managerAccess(req, res, next) {
        if (req.type != 'gerente')
            return res.status(403).json({msg: "Não Autorizado"});
        else
            next();
    },

    adminAccess(req, res, next) {
        if (req.type != 'admin')
            return res.status(403).json({msg: "Não Autorizado"});
        else
            next();
    }
}