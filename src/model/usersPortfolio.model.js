const { query } = require('express');
const db = require('../../helper/connection');
const { v4: uuidv4 } = require('uuid');

const usersPortfolioModel = {
    // CREATE
    create: ({ project_name, link_repository, img_portfolio }) => {
        // console.log({ project_name, link_repository, img_portfolio });
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO portfolio (id_portfolio, project_name, link_repository) VALUES ('${uuidv4()}','${project_name}','${link_repository}') RETURNING id_portfolio`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        for (let index = 0; index < img_portfolio.length; index++) {
                            // console.log(img_portfolio[index]);
                            db.query(`INSERT INTO portfolio_images (id_img, id_portfolio, project_name, filename) VALUES($1, $2 ,$3 , $4)`, [uuidv4(), result.rows[0].id_portfolio, project_name, img_portfolio[index].filename])
                        }
                        return resolve({ project_name, link_repository, images: img_portfolio })
                    }
                }
            )
        })
    },

    // READ
    query: (search, sortBy, limit, offset) => {
        let orderQuery = `ORDER BY project_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`
        if (!search) {
            return orderQuery
        } else if (search) {
            return `WHERE project_name ILIKE '%${search}%' ${orderQuery}`
        } else {
            return orderQuery
        }
    },

    whereClause: (search) => {
        // console.log("whereclause", { search, category })
        if (search) {
            return `WHERE project_name ILIKE '%${search}%'`
        } else {
            return ""
        }
    },

    orderAndGroupClause: (sortBy, limit, offset) => {
        return `GROUP BY p.id_portfolio ORDER BY project_name ${sortBy} LIMIT ${limit} OFFSET ${offset}`
    },

    read: function (search, sortBy = 'ASC', limit = 25, offset = 0) {
        // console.log("where", this.whereClause(search))
        // console.log("order", this.orderAndGroupClause(sortBy, limit, offset))
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT 
                  p.id_portfolio, p.id_user, p.project_name, p.link_repository,
                  json_agg(row_to_json(pi)) images 
                FROM portfolio p
                INNER JOIN portfolio_images pi ON p.id_portfolio = pi.id_portfolio
                ${this.whereClause(search)}
                ${this.orderAndGroupClause(sortBy, limit, offset)}
                `,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        console.log(result);
                        return resolve(result.rows)
                    }
                }
            )
        })
    },

    readDetail: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT * from portfolio WHERE id_portfolio='${id}'`,
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

    // UPDATE
    // ({ id, productname, price, category, description, size, delivery, file })
    update: ({ id_portfolio, project_name, link_repository, img_portfolio }) => {
        // console.log(id_portfolio);
        return new Promise((success, failed) => {
            db.query(`SELECT * FROM portfolio WHERE id_portfolio='${id_portfolio}'`, (error, dataRes) => {
                if (error) {
                    return failed(error.message)
                } else {
                    if (dataRes.rows.length == 0) {
                        return failed('Id not found!')
                    } else {
                        db.query(`UPDATE portfolio SET project_name='${project_name || dataRes.rows[0].project_name}', link_repository='${link_repository || dataRes.rows[0].link_repository}' WHERE id_portfolio='${id_portfolio}'`, (error) => {
                            if (error) {
                                return failed(error.message)
                            } else {
                                if (img_portfolio.length == 0) {
                                    db.query(`UPDATE portfolio_images SET project_name=$1 WHERE id_portfolio=$2`, [project_name || dataRes.rows[0].project_name, id_portfolio], (err) => {
                                        if (err) {
                                            return failed(err.message)
                                        }
                                    })
                                    return success({ id_portfolio, project_name, link_repository })
                                }
                                db.query(`SELECT id_img,filename FROM portfolio_images WHERE id_portfolio='${id_portfolio}'`, (errOld, resultOld) => {
                                    if (errOld) return failed(error.message)
                                    // console.log(resultOld.rows.length);
                                    for (let i = 0; i < img_portfolio.length; i++) {
                                        if (i >= resultOld.rows.length) {
                                            // console.log(`file ${i}`);
                                            db.query(`INSERT INTO portfolio_images (id_img, id_portfolio, project_name, filename) VALUES ($1, $2, $3, $4)`, [uuidv4(), id_portfolio, project_name || dataRes.rows[0].project_name, img_portfolio[i].filename], (err) => {
                                                if (err) return failed(err.message)
                                            })
                                        } else {
                                            // console.log(`file ${i}`);
                                            db.query(`UPDATE portfolio_images SET project_name=$1, filename=$2 WHERE id_img=$3`, [project_name || dataRes.rows[0].project_name, img_portfolio[i].filename, resultOld.rows[i].id_img], (err) => {
                                                if (err) return failed(err.message)
                                                // console.log(resultOld.rows);
                                                return success({ id_portfolio, project_name, link_repository, oldImages: resultOld.rows, portfolio_image: img_portfolio })
                                            })
                                        }
                                    }
                                })
                            }
                        })
                    }
                }
            })
        })
    },

    // DELETE
    // untuk remove tergantung paramnya saja, untuk kasus dibawah ini yaitu id.
    remove: (id) => {
        return new Promise((resolve, reject) => {
            db.query(
                `DELETE from portfolio WHERE id_portfolio='${id}'`,
                (err, result) => {
                    if (err) {
                        return reject(err.message)
                    } else {
                        db.query(`DELETE FROM portfolio_images WHERE id_portfolio='${id}' RETURNING filename`, (err, result) => {
                            if (err) return reject({ message: 'Failed to remove image!' })
                            return resolve(result.rows)
                        })
                        // return resolve(`Products ${id} has been deleted`)
                    }
                }
            )
        })
    },
}

module.exports = usersPortfolioModel