var request = require("request");

module.exports = {
  async listarAutocadastro(req, res) {
    try {
      var urlListarAutocadastro = `http://${process.env.CONTA_CLIENTE}:5001/autocadastro/`;

      await request(
        {
          url: urlListarAutocadastro,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        function (error, response, body) {
          console.log(body);
          const clientes = JSON.parse(body);
          if (!error && response.statusCode.valueOf() < 299) {
            return res.status(response.statusCode).json(clientes);
          } else {
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(500).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async aprovarAutocadastro(req, res) {
    try {
      const id = req.params.id;
      var urlAprovarAutocadastro = `http://${process.env.CONTA_CLIENTE}:5001/aprovar?id=${id}`;

      await request(
        {
          url: urlAprovarAutocadastro,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
        function (error, response, body) {
          console.log(body);
          if (!error && response.statusCode.valueOf() < 299) {
            return res.status(response.statusCode).json(body);
          } else {
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(500).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async reprovarAutocadastro(req, res) {
    try {
      const id = req.params.id;
      var urlReprovarAutocadastro = `http://${process.env.CONTA_CLIENTE}:5001/reprovar?id=${id}`;

      await request(
        {
          url: urlReprovarAutocadastro,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        },
        function (error, response, body) {
          if (!error && response.statusCode.valueOf() < 299) {
            console.log(body);
            return res.status(response.statusCode).json(body);
          } else {
            console.log("error: " + error);
            console.log("response.statusCode: " + response.statusCode);
            console.log("response.statusText: " + response.statusText);
            return res.status(500).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async consultarClientes(req, res) {
    try {
      var urlConsultarClientes = `http://${process.env.CONTA_CLIENTE}:5001/listar`;

      await request(
        {
          url: urlConsultarClientes,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        function (error, response, body) {
          if (!error && response.statusCode.valueOf() < 299) {
            console.log(body);
            const clientes = JSON.parse(body);
            var urlListarContas = `http://${process.env.CONTA_SERVICE}:5000/`;
            request(
              {
                url: urlListarContas,
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              },
              function (error, response, body) {
                if (!error && response.statusCode.valueOf() < 299) {
                  console.log(body);
                  const contas = JSON.parse(body);
                  // var mergedList = _.map(clientes, function(item){
                  //     return _.extend(item, _.findWhere(contas, { id: item.idCliente }));
                  // });
                  const clientesConta = clientes.map((t1) => ({
                    ...t1,
                    ...contas.find((t2) => t2.idCliente === t1.id),
                  }));
                  const jsonBody = { clientesConta };
                  return res.status(response.statusCode).json(jsonBody);
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
            return res.status(response.statusCode).json({ msg: "error" });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  },

  async consultaCliente(req, res) {
    try {
      const clienteCpf = req.params.cpf;
      var urlConsultarClienteCpf = `http://${process.env.CONTA_CLIENTE}:5001/cpf/${clienteCpf}`;

      await request(
        {
          url: urlConsultarClienteCpf,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        function (error, response, body) {
          if (!error && response.statusCode.valueOf() < 299) {
            console.log(body);
            const cliente = JSON.parse(body);
            const clienteId = cliente.id;
            var urlListarContaByIdCliente = `http://${process.env.CONTA_SERVICE}:5000/${clienteId}`;
            request(
              {
                url: urlListarContaByIdCliente,
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              },
              function (error, response, body) {
                if (!error && response.statusCode.valueOf() < 299) {
                  console.log(body);
                  const conta = JSON.parse(body);
                  var urlListarAuthByIdCliente = `http://${process.env.CONTA_AUTH}:5003/usuarios/${clienteId}`;
                  request(
                    {
                      url: urlListarAuthByIdCliente,
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    },
                    function (error, response, body) {
                      if (!error && response.statusCode.valueOf() < 299) {
                        console.log(body);
                        const usuario = JSON.parse(body);
                        const jsonBody = { cliente, usuario, conta };
                        return res.status(response.statusCode).json(jsonBody);
                      } else {
                        console.log("error: " + error);
                        console.log(
                          "response.statusCode: " + response.statusCode
                        );
                        console.log(
                          "response.statusText: " + response.statusText
                        );
                        return res
                          .status(response.statusCode)
                          .json({ msg: "error" });
                      }
                    }
                  );
                } else {
                  console.log("error: " + error);
                  console.log("response.statusCode: " + response.statusCode);
                  console.log("response.statusText: " + response.statusText);
                  return res.status(response.statusCode).json({ msg: "error" });
                }
              }
            );
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

  async consultaTopClientes(req, res) {
    try {
      const urlListarClientes = `http://${process.env.CONTA_CLIENTE}:5001/listar/`;

      console.log(urlListarClientes);

      console.log("aqui");

      await request(
        {
          url: urlListarClientes,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
        function (error, response, body) {
          if (!error && response.statusCode.valueOf() < 299) {
            console.log(body);
            const clientes = JSON.parse(body);
            const urlListarTopContas = `http://${process.env.CONTA_SERVICE}:5000/top/`;
            request(
              {
                url: urlListarTopContas,
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              },
              function (error, response, body) {
                if (!error && response.statusCode.valueOf() < 299) {
                  console.log(body);
                  const contas = JSON.parse(body);
                  const urlListarUsuarios = `http://${process.env.CONTA_AUTH}:5003/usuarios/`;
                  request(
                    {
                      url: urlListarUsuarios,
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      },
                    },
                    function (error, response, body) {
                      if (!error && response.statusCode.valueOf() < 299) {
                        console.log(body);
                        const usuarios = JSON.parse(body);
                        const contasClientes = contas.map((t1) => ({
                          ...t1,
                          ...clientes.find((t2) => t2.id === t1.idCliente),
                        }));
                        const contasTop = contasClientes.map((t1) => ({
                          ...t1,
                          ...usuarios.find((t2) => t2.idPessoa === t1.id),
                        }));
                        const jsonBody = { contasTop };
                        return res.status(response.statusCode).json(jsonBody);
                      } else {
                        console.log("error: " + error);
                        console.log(
                          "response.statusCode: " + response.statusCode
                        );
                        console.log(
                          "response.statusText: " + response.statusText
                        );
                        return res
                          .status(response.statusCode)
                          .json({ msg: "error" });
                      }
                    }
                  );
                } else {
                  console.log("error: " + error);
                  console.log("response.statusCode: " + response.statusCode);
                  console.log("response.statusText: " + response.statusText);
                  return res.status(response.statusCode).json({ msg: "error" });
                }
              }
            );
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
