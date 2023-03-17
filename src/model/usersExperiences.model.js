const { query } = require('express');
const db = require('../../helper/connection')
const { v4: uuidv4 } = require('uuid');

const usersExperiencesModel = {
    // CREATE
    create: ({ id_user, company_name, job_position, day_in, day_out, description }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO hirejob_experiences (id_exp, id_user, company_name, job_position, day_in, day_out, description) VALUES ('${uuidv4()}', '${id_user}', '${company_name}','${job_position}','${day_in}','${day_out}','${description}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ id_user, company_name, job_position, day_in, day_out, description })
                    }
                }
            )
        })
    },

    // READ
    query: (search, company_name, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY company_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !company_name) {
            return orderQuery
        } else if (search && company_name) {
            return `WHERE company_name ILIKE '%${search}%' AND company_name ILIKE '${company_name}%' ${orderQuery}`
        } else if (search || company_name) {
            return `WHERE company_name ILIKE '%${search}%' OR company_name ILIKE '${company_name}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, company_name, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from hirejob_experiences ${this.query(search, company_name, sortBy, limit, offset)}`,
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
                `SELECT 
                p.id_user, p.full_name, p.job_desk, p.employment_type,
                json_agg(row_to_json(pi)) skills
                FROM hirejob_users p
                INNER JOIN hirejob_experiences pi ON p.id_user = pi.id_user
                AND p.id_user = '${id_user}'
                GROUP BY p.id_user`,
                // `SELECT * from hirejob_experiences WHERE id_exp='${id_exp}'`,
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

    update: ({ id, company_name, job_position, day_in, day_out, description }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM hirejob_experiences WHERE id_exp='${id}'`, (err, result) => {
                // console.log(result);
                if (err) {
                    return reject(err.message);
                } else {
                    db.query(
                        `UPDATE hirejob_experiences SET company_name='${company_name || result.rows[0].company_name}', job_position='${job_position || result.rows[0].job_position}', day_in='${day_in || result.rows[0].day_in}', day_out='${day_out || result.rows[0].day_out}', description='${description || result.rows[0].description}' WHERE id_exp='${id}'`,
                        (err, result) => {
                            if (err) {
                                return reject(err.message)
                            } else {
                                return resolve({ id, company_name, job_position, day_in, day_out, description })
                            }
                        }
                    )
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from hirejob_experiences WHERE id_exp='${id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve(`experience has been deleted`)
                    }
                }
            )
        })
    }
}

module.exports = usersExperiencesModel