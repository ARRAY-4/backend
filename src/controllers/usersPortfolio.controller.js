const usersPortfolioModel = require("../model/usersPortfolio.model")
const { Pagination, formResponse } = require("../../helper")
const { unlink } = require('node:fs')

const usersPortfolioController = {
    create: (req, res) => {
        const request = {
            ...req.body,
            img_portfolio: req.files, //uncomment if multiple
        }
        // console.log(request);
        return usersPortfolioModel.create(request)
            .then((result) => {
                return res.status(201).send({ message: "succes", data: result })
            }).catch((error) => {
                return res.status(500).send({ message: error })
            })
    },
    read: (req, res) => {
        // console.log(req.query);
        let { search, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return usersPortfolioModel.read(search, sortBy, limit, offset)
            .then((result) => {
                return res.status(201).send({ message: "succes", data: result })
                // return formResponse(200, "success", result, res)
            }).catch((error) => {
                return res.status(500).send({ message: error })
                // return formResponse(500, error)
            })
    },
    readDetail: (req, res) => {
        return usersPortfolioModel.readDetail(req.params.id)
            .then((result) => {
                if (result != null) {
                    return formResponse(201, "success", result, res)
                    // return res.status(200).send({ message: "Success", data: result })
                } else {
                    return res.status(404).send({ message: "Sorry data not found! Please check your input ID!" })
                }
            }).catch((error) => {
                return formResponse(500, error)
            })
    },
    update: (req, res) => {
        const request = {
            ...req.body,
            id_portfolio: req.params.id,
            img_portfolio: req.files
        }
        // console.log(request);
        return usersPortfolioModel.update(request)
            .then((result) => {
                // console.log(result[0].img_profile);
                if (typeof result.oldImages != "undefined") {
                    for (let i = 0; i < result.oldImages.length; i++) {
                        // console.log(result.oldImages[i].filename)
                        unlink(`public/uploads/images/${result.oldImages[i].filename}`, (err) => {
                            if (err) throw err;
                            // console.log(`successfully deleted ${result.oldImages[i].filename}`)
                        });
                    }
                }
                return res.status(201).send({ message: "succes", data: result })
                // return formResponse(201, "success", result, res)
            }).catch((error) => {
                return res.status(500).send({ message: error })
                // return formResponse(500, error)
            })
    },
    remove: (req, res) => {
        return usersPortfolioModel.remove(req.params.id)
            .then((result) => {
                // Looping untuk setiap index pada data result
                for (let i = 0; i < result.length; i++) {
                    unlink(`public/uploads/images/${result[i].filename}`, (err) => {
                        if (err) throw err;
                        // console.log(`Product has been deleted! ${result[i].filename}`);
                    });
                }
                return res.status(201).send({ message: "succes deleted", data: result })
                // return formResponse(201, "success", result, res)
            }).catch((error) => {
                return res.status(500).send({ message: error })
                // return formResponse(500, error)
            })
    }
}

module.exports = usersPortfolioController