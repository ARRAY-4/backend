const { query } = require('express');
const db = require('../../helper/connection')
const { v4: uuidv4 } = require('uuid');

const usersModel = {
    // CREATE
    create: ({ full_name, img_profile, email, password, phone, job_desk, employment_type, domicile, ig_account, github_account, gitlab_account, description }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO users (id_user, full_name, img_profile, email, password, phone, job_desk, employment_type, domicile, ig_account, github_account, gitlab_account, description) VALUES ('${uuidv4()}','${full_name}','${img_profile}','${email}','${password}','${phone}','${job_desk}','${employment_type}','${domicile}', '${ig_account}', '${github_account}', '${gitlab_account}', '${description}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ full_name, img_profile, email, password, phone, job_desk, employment_type, domicile, ig_account, github_account, gitlab_account, description })
                    }
                }
            )
        })
    },

    // READ
    query: (search, employment_type, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY full_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !employment_type) {
            return orderQuery
        } else if (search && employment_type) {
            return `WHERE full_name ILIKE '%${search}%' AND employment_type ILIKE '${employment_type}%' ${orderQuery}`
        } else if (search || employment_type) {
            return `WHERE full_name ILIKE '%${search}%' OR employment_type ILIKE '${employment_type}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, employment_type, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from users ${this.query(search, employment_type, sortBy, limit, offset)}`,
                (err, result) => {
                    // console.log(result);
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
                }
            )
        })
    },

    readDetail: (id_user) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from users WHERE id_user='${id_user}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows[0])
                    }
                }
            );
        })
    },

    // SINGLE
    update: function(req, id) {
        return new Promise((success, failed) => {
            const { full_name, img_profile, email, password, phone, job_desk, employment_type, domicile, ig_account, github_account, gitlab_account, description } = req.body
            db.query(`SELECT * FROM users WHERE id_user='${id}'`, (error, result) => {
                if (error) {
                    return failed(error.message)
                } else {
                    // console.log(result);
                    if (result.rows.length < 1) {
                        return failed('Id not found!')
                    } else {
                        db.query(`UPDATE users SET full_name='${full_name || result.rows[0].full_name}', img_profile='${(req.file != undefined) ? req.file.filename : result.rows[0].img_profile}', email='${email || result.rows[0].email}', password='${password || result.rows[0].password}', phone='${phone || result.rows[0].phone}', job_desk='${job_desk || result.rows[0].job_desk}', employment_type='${employment_type || result.rows[0].employment_type}', domicile='${domicile || result.rows[0].domicile}', ig_account='${ig_account || result.rows[0].ig_account}', github_account='${github_account || result.rows[0].github_account}', gitlab_account='${gitlab_account || result.rows[0].gitlab_account}', description='${description || result.rows[0].description}' WHERE id_user='${id}'`, (error) => {
                            if (error) {
                                return failed(error.message)
                            } else {
                                return success(result.rows)
                            }
                        })
                    }
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id_user) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from users WHERE id_user='${id_user}' RETURNING img_profile`,
                (err, result) => {
                    console.log(result);
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(result.rows)
                    }
                }
            )
        })
    }
}

module.exports = usersModel