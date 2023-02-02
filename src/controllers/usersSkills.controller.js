const usersSkillsModel = require("../model/usersSkills.model.js")
const { Pagination } = require("../../helper")
const { unlink } = require('node:fs')

const usersSkillsController = {
    create: (req, res) => {
        const request = {
            ...req.body,
        }
        return usersSkillsModel.create(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },
    read: (req, res) => {
        let { search, skill_name, sortBy, page, limit } = req.query
        let offset = Pagination.buildOffset(page, limit)
        return usersSkillsModel.read(search, skill_name, sortBy, limit, offset)
            .then((result) => {
                return res.status(200).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    readDetail: (req, res) => {
        return usersSkillsModel.readDetail(req.params.id)
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
        return usersSkillsModel.update(request)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    },

    remove: (req, res) => {
        return usersSkillsModel.remove(req.params.id)
            .then((result) => {
                return res.status(201).send({ message: "Success", data: result })
            }).catch((error) => {
                return res.status(500).send(error)
            })
    }
}

module.exports = usersSkillsController