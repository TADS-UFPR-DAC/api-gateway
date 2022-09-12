var request = require("request");
const crypto = require("crypto");

module.exports = {
  async listarGerentes(req, res) {
    try {
      var urlListarGerentes = `http://${process.env.CONTA_GERENTE}:5002/`;
      console.log(urlListarGerentes);

      await request(
        {
          url: urlListarGerentes,
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

  async listarGerente(req, res) {
    try {
      const gerenteId = req.params.id;
      var urlAcharGerenteById = `http://${process.env.CONTA_GERENTE}:5002/${gerenteId}`;
      console.log(urlAcharGerenteById);

      await request(
        {
          url: urlAcharGerenteById,
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

  async inserirGerente(req, res) {
    try {
      login = req.body.login;
      password = req.body.senha;
      nome = req.body.nome;
      email = req.body.email;
      cpf = req.body.cpf;
      perfil = "gerente";

      var senha = crypto.createHash("md5").update(`${password}`).digest("hex");

      var urlCriarUsuario = `http://${process.env.CONTA_AUTH}:5003/usuarios`;

      var urlCriarGerente = `http://${process.env.CONTA_GERENTE}:5002/`;      

        const sendDataAuthService = {
          nome: nome,
          login: login,
          senha: senha,
          perfil: perfil,
        };

      const jsonSendDataAuthService = JSON.stringify(sendDataAuthService);

      console.log(sendDataAuthService);

      await request(
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
            const gerente = JSON.parse(body);

            const sendDataCriarGerente = {
              id: gerente.id,
              cpf: cpf,
              nome: nome,
              email: email,
            };
            const jsonSendDatasendDataCriarGerente =
              JSON.stringify(sendDataCriarGerente);

            request(
              {
                url: urlCriarGerente,
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: jsonSendDatasendDataCriarGerente,
              },
              function (error, response, body) {
                if (!error && (response.statusCode.valueOf() < 299 ) ) {
                  console.log(body);
                  const usuario = JSON.parse(body);
                  const jsonBody = { gerente, usuario };
                  return res.status(response.statusCode).json(jsonBody);
                } else {
                  rabbit.publish("auth", "deletarUsuario", usuario);
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

  async editarGerente(req, res) {
    try {
      id = req.params.id;
      login = req.body.login;
      password = req.body.senha;
      nome = req.body.nome;
      email = req.body.email;
      cpf = req.body.cpf;

      senha = crypto.createHash("md5").update(`${password}`).digest("hex");

      var urlEditarUsuario = `http://${process.env.CONTA_AUTH}:5003/usuarios/${id}`;

      var urlEditarGerente = `http://${process.env.CONTA_GERENTE}:5002/${id}`;

      const sendDataEditarGerente = {
        cpf: cpf,
        nome: nome,
        email: email,
      };
      const jsonsendDataEditarGerente = JSON.stringify(sendDataEditarGerente);

      console.log(sendDataEditarGerente);
      console.log(jsonsendDataEditarGerente);

      await request(
        {
          url: urlEditarGerente,
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: jsonsendDataEditarGerente,
        },
        function (error, response, body) {
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
            console.log(body);
            const gerente = JSON.parse(body);
            const gerenteId = gerente.id;
            const sendDataAuthService = {
              nome: nome,
              login: login,
              senha: senha,
            };
            const jsonSendDataAuthService = JSON.stringify(sendDataAuthService);

            console.log(sendDataAuthService);
            request(
              {
                url: urlEditarUsuario,
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: jsonSendDataAuthService,
              },
              function (error, response, body) {
                if (!error && (response.statusCode.valueOf() < 299 ) ) {
                  console.log(body);
                  const usuario = JSON.parse(body);
                  const jsonBody = { gerente, usuario };
                  return res.status(response.statusCode).json(jsonBody);
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

  async deletarGerente(req, res) {
    try {
      id = req.params.id;

      var urlDeletarUsuario = `http://${process.env.CONTA_AUTH}:5003/usuarios/${id}`;

      var urlDeletarGerente = `http://${process.env.CONTA_GERENTE}:5002/${id}`;

      await request(
        {
          url: urlDeletarGerente,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
        function (error, response, body) {
          if (!error && (response.statusCode.valueOf() < 299 ) ) {
            console.log(body);

            request(
              {
                url: urlDeletarUsuario,
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
              },
              function (error, response, body) {
                if (!error && (response.statusCode.valueOf() < 299 ) ) {
                  console.log(body);
                  return res.status(response.statusCode).json(jsonBody);
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
