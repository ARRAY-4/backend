const hireModel = require("../model/hire.model");
const { Pagination, formResponse } = require("../../helper/index");

const hireController = {
  detail: (req, res) => {
    return hireModel
      .detail(req.body.id_company)
      .then((result) => {
        return formResponse(200, "success show by id", result, res);

        //return res.status(200).send({ message: "succes show by id", data: result });
      })
      .catch((error) => {
        //return formResponse(500, error);
        return res.status(500).send({ message: error });
      });
  },
  add: (req, res) => {
    const request = {
      id_user: req.params.id,
      id_company: req.body.id_company,
      subject: req.body.subject,
      message: req.body.message,
    };

    return hireModel
      .add(request)
      .then((result) => {
        return formResponse(201, "succes hiring", result, res);
      })
      .catch((error) => {
        //return formResponse(500, error);
        return res.status(500).send({ message: error });
      });
  },
  remove: (req, res) => {
    return hireModel
      .remove(req.params.id)
      .then((result) => {
        return formResponse(200, "data hiring has been delete", result, res);
      })
      .catch((error) => {
        //return formResponse(500, error);
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = hireController;
