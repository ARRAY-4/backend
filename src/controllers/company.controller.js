const companyModel = require("../model/company.model");
const { Pagination, formResponse } = require("../../helper/index");
const { unlink } = require("node:fs");

const bcrypt = require("bcrypt");

const companyController = {
  get: (req, res) => {
    let { company, field, sortBy, page, limit } = req.query;
    let offset = Pagination.buildOffset(page, limit);

    return companyModel
      .get(company, field, sortBy, limit, offset) //req.query dari express js
      .then((result) => {
        return formResponse(200, "success", result, res);
        //return res.status(200).send({ message: "succes", data: result });
      })
      .catch((error) => {
        //return formResponse(500, error);
        return res.status(500).send({ message: error });
      });
  },

  //
  detail: (req, res) => {
    return companyModel
      .detail(req.params.id)
      .then((result) => {
        return formResponse(200, "success show by id", result, res);

        //return res.status(200).send({ message: "succes show by id", data: result });
      })
      .catch((error) => {
        //return formResponse(500, error);
        return res.status(500).send({ message: error });
      });
  },

  //
  add: (req, res) => {
    bcrypt.hash(req.body.password, 15, function (err, hash) {
      if (err) {
        return res.status(500).send({ message: err.message });
      } else {
        const request = {
          ...req.body,
          password: hash,
          img_company: req.file.filename, //single
        };
        return companyModel
          .add(request)
          .then((result) => {
            return formResponse(201, "succes add new company", result, res);
          })
          .catch((error) => {
            //return formResponse(500, error);
            return res.status(500).send({ message: error });
          });
      }
    });
  },
  update: (req, res) => {
    const request = {
      ...req.body,
      img_company: req.file.filename, //single
      id: req.params.id,
    };

    return companyModel
      .update(request)
      .then((result) => {
        if (result[0].img_company != null) {
          for (let i = 0; i < result.length; i++) {
            unlink(`public/uploads/images/${result[i].img_company}`, (err) => {
              if (err) throw err;
            });
          }
        }
        return res
          .status(201)
          .send({ message: "succes update data profile", data: result });
      })
      .catch((error) => {
        //return formResponse(500, error);
        return res.status(500).send({ message: error });
      });
  },

  //
  remove: (req, res) => {
    return companyModel
      .remove(req.params.id)
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          unlink(`public/uploads/images/${result[i].img_company}`, (err) => {
            if (err) throw err;
          });
        }
        return formResponse(200, "company data has been delete", result, res);
      })
      .catch((error) => {
        //return formResponse(500, error);
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = companyController;
