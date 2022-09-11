var request = require("request");
const crypto = require('crypto');

module.exports = {
  async autocadastro(req, res) {
    login = req.body.usuario;
    password = req.body.senha;
    nome = req.body.nome;
    email = req.body.email;
    cpf = req.body.cpf;
    salario = req.body.salario;
    tipo = req.body.endereco.tipo;
    logradouro = req.body.endereco.logradouro;
    numero = req.body.endereco.numero;
    complemento = req.body.endereco.complemento;
    cep = req.body.endereco.cep;
    cidade = req.body.endereco.cidade;
    estado = req.body.endereco.estado;
    perfil = "cliente";
    statusAprocavao = "PENDENTE";
    gerenteIdConta = -1;
    senha = crypto.createHash('md5').update(`${password}`).digest("hex");

    var urlCriarUsuario = `http://localhost:5003/usuarios`;

    var urlCriarCliente = `http://localhost:5001/`;

    var urlCriarContaCliente = `http://localhost:5000/`;

    var urlConsultarGerentes = `http://localhost:5002/`;

    const sendDataClienteService = {
      cpf: cpf,
      nome: nome,
      email: email,
      status: statusAprocavao,
      endereco: {
        tipo: tipo,
        logradouro: logradouro,
        numero: numero,
        complemento: complemento,
        cep: cep,
        cidade: cidade,
        estado: estado,
      },
    };
    const jsonSendDataClienteService = JSON.stringify(sendDataClienteService);

    console.log(sendDataClienteService);
    console.log(jsonSendDataClienteService);

    await request(
      {
        url: urlCriarCliente,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonSendDataClienteService,
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          const cliente = JSON.parse(body);
          const idCliente = cliente.id;
          const sendDataAuthService = {
            idPessoa: idCliente,
            nome: nome,
            login: login,
            senha: senha,
            perfil: perfil,
          };
          const jsonSendDataAuthService = JSON.stringify(sendDataAuthService);

          console.log(sendDataAuthService);
          request(
            {
              url: urlCriarUsuario,
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: jsonSendDataAuthService,
            },
            function (error, response, body) {
              if (!error) {
                console.log(body);
                const usuario = JSON.parse(body);
                const sendDataContaService = {
                  idCliente: idCliente,
                  idGerente: gerenteIdConta,
                  numero: idCliente,
                  salario: salario,
                };
                const jsonSendDataContaService =
                  JSON.stringify(sendDataContaService);

                console.log(jsonSendDataContaService);
                request(
                  {
                    url: urlCriarContaCliente,
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: jsonSendDataContaService,
                  },
                  function (error, response, body) {
                    if (!error) {
                      console.log(body);
                      const conta = JSON.parse(body);
                      const jsonBody = { cliente, conta, usuario };
                      return res.status(response.statusCode).json(jsonBody);
                    } else {
                      console.log("error: " + error);
                      console.log(
                        "response.statusCode: " + response.statusCode
                      );
                      console.log(
                        "response.statusText: " + response.statusText
                      );
                      return res.status(500).json({ msg: "error" });
                    }
                  }
                );
              } else {
                console.log("error: " + error);
                console.log("response.statusCode: " + response.statusCode);
                console.log("response.statusText: " + response.statusText);
                return res.status(500).json({ msg: "error" });
              }
            }
          );
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },

  async depositar(req, res) {
    const clienteId = req.params.id;
    const valor = req.body.valor;
    var urlClienteDepositar = `http://localhost:5000/deposito/${clienteId}?valor=${valor}`;
    console.log(urlClienteDepositar);

    await request(
      {
        url: urlClienteDepositar,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          if (body) {
            var jsonBody = JSON.parse(body);
          }
          return res.status(response.statusCode).json(jsonBody);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },

  async sacar(req, res) {
    const clienteId = req.params.id;
    const valor = req.body.valor;
    var urlClienteSacar = `http://localhost:5000/saque/${clienteId}?valor=${valor}`;
    console.log(urlClienteSacar);

    await request(
      {
        url: urlClienteSacar,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          if (body) {
            var jsonBody = JSON.parse(body);
          }
          return res.status(response.statusCode).json(jsonBody);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },

  async transferir(req, res) {
    const clienteId1 = req.params.id1;
    const clienteId2 = req.params.id2;
    const valor = req.body.valor;
    var urlClienteTransferir = `http://localhost:5000/saque/${clienteId1}/${clienteId2}?valor=${valor}`;
    console.log(urlClienteTransferir);

    await request(
      {
        url: urlClienteTransferir,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          if (body) {
            var jsonBody = JSON.parse(body);
          }
          return res.status(response.statusCode).json(jsonBody);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },

  async extrato(req, res) {
    const clienteId = req.params.id;
    var urlClienteExtrato = `http://localhost:5000/extrato/${clienteId}`;
    console.log(urlClienteExtrato);

    await request(
      {
        url: urlClienteExtrato,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
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
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },

  async saldo(req, res) {
    const clienteId = req.params.id;
    var urlAcharContaById = `http://localhost:5000/${clienteId}`;
    console.log(urlAcharContaById);

    await request(
      {
        url: urlAcharContaById,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          const jsonBody = JSON.parse(body);
          const saldo = jsonBody.saldo;
          const limite = jsonBody.limite;
          const sendDataClienteService = {
            saldo: saldo,
            limite: limite,
          };
          return res.status(response.statusCode).json(sendDataClienteService);
        } else {
          console.log("error: " + error);
          console.log("response.statusCode: " + response.statusCode);
          console.log("response.statusText: " + response.statusText);
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },
};
