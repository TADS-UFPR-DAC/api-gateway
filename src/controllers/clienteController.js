var request = require("request");
const crypto = require("crypto");
const rabbit = require("../services/queue");

module.exports = {
  async autocadastro(req, res) {
    try {
      login = req.body.login;
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
      senha = crypto.createHash("md5").update(`${password}`).digest("hex");

      console.log(req.body);

      console.log(login);
      console.log(req.body.usuario);

      var urlCriarUsuario = `http://${process.env.CONTA_AUTH}:5003/usuarios`;

      var urlCriarCliente = `http://${process.env.CONTA_CLIENTE}:5001/`;

      var urlCriarContaCliente = `http://${process.env.CONTA_SERVICE}:5000/`;

      var urlConsultarGerentes = `http://${process.env.CONTA_GERENTE}:5002/`;

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
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
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
                if (!error && (response.statusCode.valueOf() < 299 ) ) {
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
                      if (!error && (response.statusCode.valueOf() < 299 ) ) {
                        console.log(body);
                        const conta = JSON.parse(body);
                        const jsonBody = { cliente, conta, usuario };
                        console.log("3");
                        return res.status(response.statusCode).json(jsonBody);
                      } else {
                        console.log("33");
                        rabbit.publish("auth", "deletarUsuario", usuario);
                        rabbit.publish("cliente", "deletarCliente", cliente);
                        console.log("error: " + error);
                        console.log("response.statusCode: " + response.statusCode);
                        console.log("response.statusText: " + response.statusText);
                        return res.status(response.statusCode).json({ msg: "error" });
                      }
                    }
                  );
                } else {
                  console.log("aqui");
                  console.log("error: " + error);
                  rabbit.publish("cliente", "deletarCliente", cliente);
                  console.log("response.statusCode: " + response.statusCode);
                  console.log("response.statusText: " + response.statusText);
                  return res.status(response.statusCode).json({ msg: "error" });
                }
              }
            );
          } else {
            console.log("aqui22");
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(response.statusCode).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async depositar(req, res) {
    try {
      const clienteId = req.params.id;
      const valor = req.body.valor;
      var urlClienteDepositar = `http://${process.env.CONTA_SERVICE}:5000/deposito/${clienteId}?valor=${valor}`;
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
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
            console.log(body);
            if (body) {
              var jsonBody = JSON.parse(body);
            }
            return res.status(response.statusCode).json(jsonBody);
          } else {
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(response.statusCode).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async sacar(req, res) {
    try {
      const clienteId = req.params.id;
      const valor = req.body.valor;
      var urlClienteSacar = `http://${process.env.CONTA_SERVICE}:5000/saque/${clienteId}?valor=${valor}`;
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
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
            console.log(body);
            if (body) {
              var jsonBody = JSON.parse(body);
            }
            return res.status(response.statusCode).json(jsonBody);
          } else {
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(response.statusCode).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async transferir(req, res) {
    try {
      const clienteId1 = req.params.id1;
      const clienteId2 = req.params.id2;
      const valor = req.body.valor;
      var urlClienteTransferir = `http://${process.env.CONTA_SERVICE}:5000/transferencia/${clienteId1}/${clienteId2}?valor=${valor}`;
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
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
            console.log(body);
            if (body) {
              var jsonBody = JSON.parse(body);
            }
            return res.status(response.statusCode).json(jsonBody);
          } else {
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(response.statusCode).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async extrato(req, res) {
    try {
      const clienteId = req.params.id;
      var urlClienteExtrato = `http://${process.env.CONTA_SERVICE}:5000/extrato/${clienteId}`;
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
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
            console.log(body);
            const jsonBody = JSON.parse(body);
            return res.status(response.statusCode).json(jsonBody);
          } else {
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(response.statusCode).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async saldo(req, res) {
    try {
      const clienteId = req.params.id;
      var urlAcharContaById = `http://${process.env.CONTA_SERVICE}:5000/${clienteId}`;
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
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
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
            return res.status(response.statusCode).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },
};
