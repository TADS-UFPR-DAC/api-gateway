var request = require("request");


module.exports = {

    async listarAutocadastro(req, res) {

    },

    async aprovarAutocadastro(req, res) {

    },

    async reprovarAutocadastro(req, res) {

    },

    async consultarClientes(req, res) {
    
        var urlConsultarClientes = `http://localhost:5001/listar`;
    
        await request(
          {
            url: urlConsultarClientes,
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            },
          },
          function (error, response, body) {
            if (!error) {
              console.log(body);
              jsonBody = JSON.parse(body)
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

    async consultaCliente(req, res) {

    },

    async consultaTopClientes(req, res) {

    }

}