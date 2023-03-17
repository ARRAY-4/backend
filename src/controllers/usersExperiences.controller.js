const usersExperiencesModel = require("../model/usersExperiences.model.js")
const { Pagination } = require("../../helper")
const { unlink } = require('node:fs')

const usersExperiencesController = {
    create: (req, res) => {
        // console.log(req.file);
        const request = {
            ...req.body,
        }
        // console.log(request);
        return usersExperiencesModel.create(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    read: (req, res) => {
        let { search, company_name, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return usersExperiencesModel.read(search, company_name, sortBy, limit, offset)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    readDetail: (req, res) => {
        return usersExperiencesModel.readDetail(req.params.id)
            .then((result) => {
                if (result != null) {
                    return res.status(200).send({ message: "Success", data: result })
                } else {
                    return res.status(404).send({ message: "Sorry data not found! Please check your input ID!" })
                }
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    update: (req, res) => {
        const request = {
            ...req.body,
            id: req.params.id
        }
        return usersExperiencesModel.update(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    remove: (req, res) => {
        return usersExperiencesModel.remove(req.params.id)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    }
}

module.exports = usersExperiencesController