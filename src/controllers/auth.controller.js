const authModel = require("../model/auth.model.js");
const { formResponse } = require("../../helper/index");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const { PRIVATE_KEY } = process.env;
const authController = {
  loginuser: (req, res) => {
    return authModel
      .loginuser(req.body) //req.query dari express js
      .then((result) => {
        let token = jwt.sign(
          { id: result.id_users },
          PRIVATE_KEY, //buat jadi env
          { expiresIn: "1d" },
          (err, token) => {
            return formResponse(
              200,
              "success",
              {
                token,
                user: {
                  id_user: result.id_user,
                  username: result.full_name,
                  image: result.img_profile,
                  role: result.role,
                },
              },
              res
            );
          }
        );
      })
      .catch((error) => {
        //return formResponse(500, error, res);

        return res.status(500).send({ message: error });
      });
  },
  logincompany: (req, res) => {
    return authModel
      .logincompany(req.body) //req.query dari express js
      .then((result) => {
        let token = jwt.sign(
          { id: result.id_company },
          PRIVATE_KEY, //buat jadi env
          { expiresIn: "1d" },
          (err, token) => {
            return formResponse(
              200,
              "success",
              {
                token,
                user: {
                  id: result.id_company,
                  username: result.user_company,
                  image: result.img_company,
                  role: result.role,
                },
              },
              res
            );
          }
        );
      })
      .catch((error) => {
        //return formResponse(500, error, res);

        return res.status(500).send({ message: error });
      });
  },

  registeruser: (req, res) => {
    bcrypt.hash(req.body.password, 15, function (err, hash) {
      //default saltrune=15 atau 10,
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          full_name: req.body.full_name,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
        }
        console.log(request);
        return authModel
          .registeruser(request)
          .then((result) => {
            return formResponse(201, "succes register user", result, res);
          })
          .catch((error) => {
            //return formResponse(500, error);
            if (error.code == "23505") {
              return res.status(500).send({ message: "email already exist" });
            }
            return res.status(500).send({ message: error });
          });
      }
    });
  },
  registercompany: (req, res) => {
    bcrypt.hash(req.body.password, 15, function (err, hash) {
      //default saltrune=15 atau 10,
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          admin_company: req.body.admin_company,
          email: req.body.email,
          company: req.body.company,
          field: req.body.field,
          phone: req.body.phone,
          password: hash,
        };
        console.log(request);

        return authModel
          .registercompany(request)
          .then((result) => {
            return formResponse(201, "succes register company", result, res);
          })
          .catch((error) => {
            //return formResponse(500, error);
            if (error.code == "23505") {
              return res.status(500).send({ message: "email already exists" });
            }
            return res.status(500).send({ message: error });
          });
      }
    });
  },

  //
};

module.exports = authController;
