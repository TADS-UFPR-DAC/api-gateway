var request = require("request");

module.exports = {
  async listarGerentes(req, res) {
    var urlListarGerentes = `http://localhost:5002/`;
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

  async listarGerente(req, res) {
    const gerenteId = req.params.id;
    var urlAcharGerenteById = `http://localhost:5002/${gerenteId}`;
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

  async inserirGerente(req, res) {
    login = req.body.login;
    senha = req.body.senha;
    nome = req.body.nome;
    email = req.body.email;
    cpf = req.body.cpf;
    perfil = "gerente";

    var urlCriarUsuario = `http://localhost:5003/usuarios`;

    var urlCriarGerente = `http://localhost:5002/`;

    const sendDataCriarGerente = {
      cpf: cpf,
      nome: nome,
      email: email,
    };
    const jsonSendDatasendDataCriarGerente =
      JSON.stringify(sendDataCriarGerente);

    console.log(sendDataCriarGerente);
    console.log(jsonSendDatasendDataCriarGerente);

    await request(
      {
        url: urlCriarGerente,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonSendDatasendDataCriarGerente,
      },
      function (error, response, body) {
        if (!error) {
          console.log(body);
          const gerente = JSON.parse(body);
          const gerenteId = gerente.id;
          const sendDataAuthService = {
            clienteId: gerenteId,
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
                const jsonBody = { gerente, usuario };
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
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },

  async editarGerente(req, res) {
    id = req.params.id;
    login = req.body.login;
    senha = req.body.senha;
    nome = req.body.nome;
    email = req.body.email;
    cpf = req.body.cpf;

    var urlEditarUsuario = `http://localhost:5003/usuarios/${id}`;

    var urlEditarGerente = `http://localhost:5002/${id}`;

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
        if (!error) {
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
              if (!error) {
                console.log(body);
                const usuario = JSON.parse(body);
                const jsonBody = { gerente, usuario };
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
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },

  async deletarGerente(req, res) {
    id = req.params.id;

    var urlDeletarUsuario = `http://localhost:5003/usuarios/${id}`;

    var urlDeletarGerente = `http://localhost:5002/${id}`;

    await request(
      {
        url: urlDeletarGerente,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
      function (error, response, body) {
        if (!error) {
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
              if (!error) {
                console.log(body);
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
          return res.status(500).json({ msg: "error" });
        }
      }
    );
  },
};
