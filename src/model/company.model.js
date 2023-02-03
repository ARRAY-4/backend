const { query } = require("express");
const db = require("../../helper/connection");

const { v4: uuidv4 } = require("uuid");

const companyModel = {
  query: (company, field, sortBy, limit, offset) => {
    let orderQuery = `ORDER BY name_company ${sortBy} LIMIT ${limit} OFFSET ${offset}`;

    if (!company && !field) {
      return orderQuery;
    } else if (company && field) {
      return `WHERE name_company ILIKE '%${company}%' AND field_company ILIKE '${field}%' ${orderQuery}`;
    } else if (company || field) {
      return `WHERE name_company ILIKE '%${company}%' OR field_company ILIKE '${field}%' ${orderQuery}`;
    } else {
      return orderQuery;
    }
  },

  get: function (company, field, sortBy = "ASC", limit = 5, offset = 0) {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from company ${this.query(
          company,
          field,
          sortBy,
          limit,
          offset
        )}`, // model

        (err, result) => {
          //controller
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },

  detail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from company where id_company='${id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows[0]);
          }
        }
      );
    });
  },
  add: ({
    admin_company,
    email,
    password,
    name_company,
    img_company,
    field_company,
    phone,
    address,
    description,
    ig_account,
    linkedin,
  }) => {
    //kenapa digunakan destructuring
    return new Promise((resolve, reject) => {
      db.query(
        `insert into company values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) `, //jika varchar perlu string ''
        [
          uuidv4(),
          admin_company,
          email,
          password,
          name_company,
          img_company,
          field_company,
          phone,
          address,
          description,
          ig_account,
          linkedin,
        ],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({
              admin_company,
              email,
              password,
              name_company,
              img_company,
              field_company,
              phone,
              address,
              description,
              ig_account,
              linkedin,
            });
          }
        }
      );
    });
  },
  update: ({
    id,
    admin_company,
    email,
    password,
    name_company,
    img_company,
    field_company,
    phone,
    address,
    description,
    ig_account,
    linkedin,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM company WHERE id_company='${id}'`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else if (result.rows.length < 1) {
            return reject("Id not found!");
          } else {
            db.query(
              `UPDATE company SET 
                  admin_company='${
                    admin_company || result.rows[0].admin_company
                  }', 
                  email='${email || result.rows[0].email}', 
                  password='${password || result.rows[0].password}', 
                  name_company='${name_company || result.rows[0].name_company}',
                  img_company='${
                    result.rows[0].img_company == undefined
                      ? img_company
                      : img_company || result.rows[0].img_company
                  }', 
                  field_company='${
                    field_company || result.rows[0].field_company
                  }',
                  phone='${phone || result.rows[0].phone}', 
                  address='${address || result.rows[0].address}', 
                  description='${description || result.rows[0].description}', 
                  ig_account='${ig_account || result.rows[0].ig_account}', 
                  linkedin='${linkedin || result.rows[0].linkedin}' 
                  WHERE id_company='${id}'`,
              (error) => {
                if (error) {
                  return reject(error.message);
                } else {
                  return resolve(result.rows);
                }
              }
            );
          }
        }
      );
    });
  },
  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE from company WHERE id_company='${id}' returning img_company`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve(result.rows);
          }
        }
      );
    });
  },
};

module.exports = companyModel;
