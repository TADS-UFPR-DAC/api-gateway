var request = require("request");
var clienteId;
var valor;


module.exports = {
  async depositar(req, res) {
    clienteId = req.params.id;
    valor = req.body.valor;
    var urlClienteDepositar = `http://localhost:5001/deposito/${clienteId}?valor=${valor}`;
    console.log(urlClienteDepositar);

    await request(
      {
        url: urlClienteDepositar,
        method: "POST",
        json: true,
        multipart: {
          chunked: false,
          data: [
            {
              "content-type": "application/json",
            },
          ],
        },
      },
      function (error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
        }
      }
    );
  },
};
