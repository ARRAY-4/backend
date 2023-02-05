const { query } = require("express");
const db = require("../../helper/connection");

const { v4: uuidv4 } = require("uuid");

const hireModel = {
  detail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from hiring where id_company='${id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else if (result.rows.length < 1) {
            return reject("Id not found!");
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
  add: ({ id_company, id_user, subject, message }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select id_user,full_name from users where id_user = '${id_user}'`,
        (err, res) => {
          if (err) {
            return reject(err.message);
          } else {
            db.query(
              `insert into hiring (id_hiring,id_company,id_user,name_user,subject,message)
              values ($1,$2,$3,$4,$5,$6)`,
              [
                uuidv4(),
                id_company,
                id_user,
                res.rows[0].full_name,
                subject,
                message,
              ],
              (error, result) => {
                if (error) {
                  return reject(error.message);
                } else {
                  resolve({
                    id_company,
                    id_user,
                    subject,
                    message,
                  });
                }
              }
            );
          }
        }
      );
    });
  },
  remove: (id_hiring) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE from hiring WHERE id_hiring='${id_hiring}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else if (result.rows.length < 1) {
            return reject("Id not found!");
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
};
module.exports = hireModel;
