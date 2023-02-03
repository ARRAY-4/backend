const { query } = require('express');
const db = require('../../helper/connection')
const { v4: uuidv4 } = require('uuid');

const usersSkillsModel = {
    // CREATE
    create: ({ skill_name, level }) => {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO user_skills (id_skill, skill_name, level) VALUES ('${uuidv4()}','${skill_name}','${level}')`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        return resolve({ skill_name, level })
                    }
                }
            )
        })
    },

    // READ
    query: (search, skill_name, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY skill_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`

        if (!search && !skill_name) {
            return orderQuery
        } else if (search && skill_name) {
            return `WHERE skill_name ILIKE '%${search}%' AND skill_name ILIKE '${skill_name}%' ${orderQuery}`
        } else if (search || skill_name) {
            return `WHERE skill_name ILIKE '%${search}%' OR skill_name ILIKE '${skill_name}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    read: function (search, skill_name, sortBy = 'ASC', limit = 25, offset = 0) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from user_skills ${this.query(search, skill_name, sortBy, limit, offset)}`,
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
                p.id_user, p.full_name, p.email,
                json_agg(row_to_json(pi)) skills
                FROM users p
                INNER JOIN user_skills pi ON p.id_user = pi.id_user
                AND p.id_user = '${id_user}'
                GROUP BY p.id_user`,
                // `SELECT * from user_skills WHERE id_user='${id_user}'`,
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

    update: ({ id, skill_name, level }) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM user_skills WHERE id_skill='${id}'`, (err, result) => {
                // console.log(result);
                if (err) {
                    return reject(err.message);
                } else {
                    db.query(
                        `UPDATE user_skills SET skill_name='${skill_name || result.rows[0].skill_name}', level='${level || result.rows[0].level}' WHERE id_skill='${id}'`,
                        (err, result) => {
                            if (err) {
                                return reject(err.message)
                            } else {
                                return resolve({ id, skill_name, level })
                            }
                        }
                    )
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id_skill) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from user_skills WHERE id_skill='${id_skill}'`,
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

module.exports = usersSkillsModel