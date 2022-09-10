var request = require("request");

module.exports = {
  async autocadastro(req, res) {
    login = req.body.usuario;
    senha = req.body.senha;
    nome = req.body.nome;
    email = req.body.email;
    cpf = req.body.cpf;
    tipo = req.body.endereco.tipo;
    logradouro = req.body.endereco.logradouro;
    numero = req.body.endereco.numero;
    complemento = req.body.endereco.complemento;
    cep = req.body.endereco.cep;
    cidade = req.body.endereco.cidade;
    estado = req.body.endereco.estado;
    perfil = "cliente";

    var urlCriarUsuario = `http://localhost:5003/usuarios`;

    const sendDataAuthService = {
      nome:nome,
      login:login,
      senha:senha,
      perfil:perfil
    }

    const jsonSendDataAuthService = JSON.stringify(sendDataAuthService);

    await request(
      {
        url: urlCriarUsuario,
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonSendDataAuthService
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          return res.status(response.statusCode).json(body);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({"msg": "error"});
        }
      }
    );

    const sendDataClienteService = {
      cpf:cpf,
      nome:nome,
      email:email,
      endereco:{
        tipo:tipo,
        logradouro:logradouro,
        numero:numero,
        complemento:complemento,
        cep:cep,
        cidade:cidade,
        estado:estado
      }
    }

    const jsonSendDataClienteService = JSON.stringify(sendDataClienteService);

    console.log(jsonSendDataClienteService);

    var urlCriarCliente = `http://localhost:5001/cliente`;
    await request(
      {
        url: urlCriarCliente,
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: jsonSendDataClienteService
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          return res.status(response.statusCode).json(body);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({"msg": "error"});
        }
      }
    );
  },

  async depositar(req, res) {
    clienteId = req.params.id;
    valor = req.body.valor;
    var urlClienteDepositar = `http://localhost:5000/deposito/${clienteId}?valor=${valor}`;
    console.log(urlClienteDepositar);

    await request(
      {
        url: urlClienteDepositar,
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          return res.status(response.statusCode).json(body);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({"msg": "error"});
        }
      }
    );
  },

  async sacar(req, res) {
    clienteId = req.params.id;
    valor = req.body.valor;
    var urlClienteSacar = `http://localhost:5000/saque/${clienteId}?valor=${valor}`;
    console.log(urlClienteSacar);

    await request(
      {
        url: urlClienteSacar,
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          return res.status(response.statusCode).json(body);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({"msg": "error"});
        }
      }
    );
  },

  async transferir(req, res) {
    clienteId1 = req.params.id1;
    clienteId2 = req.params.id2;
    valor = req.body.valor;
    var urlClienteTransferir = `http://localhost:5000/saque/${clienteId1}/${clienteId1}?valor=${valor}`;
    console.log(urlClienteTransferir);

    await request(
      {
        url: urlClienteTransferir,
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          return res.status(response.statusCode).json(body);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({"msg": "error"});
        }
      }
    );
  },

  async extrato(req, res) {
    clienteId = req.params.id;
    var urlClienteExtrato = `http://localhost:5000/extrato/${clienteId}`;
    console.log(urlClienteExtrato);

    await request(
      {
        url: urlClienteExtrato,
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          return res.status(response.statusCode).json(body);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({"msg": "error"});
        }
      }
    );
  },

  async saldo(req, res) {
    clienteId = req.params.id;
    var urlAcharContaById = `http://localhost:5000/${clienteId}`;
    console.log(urlAcharContaById);

    await request(
      {
        url: urlAcharContaById,
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          jsonBody = JSON.parse(body)
          saldo = jsonBody.saldo;
          const sendDataClienteService = {
            saldo:saldo
          }
          const jsonSendDataClienteService = JSON.stringify(sendDataClienteService);
          return res.status(response.statusCode).json(jsonSendDataClienteService);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({"msg": "error"});
        }
      }
    );
  },
};
