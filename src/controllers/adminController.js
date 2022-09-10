const httpProxy = require("express-http-proxy");

module.exports = {
    async listarGerentes(req, res) {

    },

    async listarGerente(req, res) {
        const gerenteId = req.params.id;
        var urlAcharGerenteById = `http://localhost:5002/${gerenteId}`;
        console.log(urlAcharGerenteById);
    
        await request(
          {
            url: urlAcharGerenteById,
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
          },
          function (error, response, body) {
            if (!error) {
              console.log(body);
              const jsonBody = JSON.parse(body);
              return res.status(response.statusCode).json(jsonBody);
            } else {
              console.log("error: " + error);
              console.log("response.statusCode: " + response.statusCode);
              console.log("response.statusText: " + response.statusText);
              return res.status(500).json({"msg": "error"});
            }
          }
        );
    },

    async inserirGerente(req, res) {

    },

    async editarGerente(req, res) {

    },

    async deletarGerente(req, res) {

    },

}