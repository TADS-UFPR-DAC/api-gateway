module.exports = {
    clientAccess(req, res, next) {
        if (req.type != 'client')
            return res.status(403).json({msg: "Não Autorizado"});
        else
            next();
    },

    managerAccess(req, res, next) {
        if (req.type != 'manager')
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