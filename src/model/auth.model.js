const { query } = require("express");
const db = require("../../helper/connection");

const { v4: uuidv4 } = require("uuid");

const bcrypt = require("bcrypt");

const authModel = {
  loginuser: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query("select * from user where email=$1", [email], (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          if (result.rows.length == 0) {
            return reject("email or password wrong"); ///ketika username tidak ada
          } else {
            bcrypt.compare(
              password,
              result.rows[0].password,
              function (err, hashingResult) {
                if (err) {
                  // kesalahan hashing misal dari server(bcrypt)
                  return reject("email or password wrong");
                } else if (!hashingResult) {
                  return reject("email or password wrong"); //ketika password salah
                } else {
                  return resolve(result.rows[0]);
                }
              }
            );
          }
        }
      });
    });
  },
  logincompay: ({ email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "select * from company where email=$1",
        [email],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            if (result.rows.length == 0) {
              return reject("email or password wrong"); ///ketika username tidak ada
            } else {
              bcrypt.compare(
                password,
                result.rows[0].password,
                function (err, hashingResult) {
                  if (err) {
                    // kesalahan hashing misal dari server(bcrypt)
                    return reject("email or password wrong");
                  } else if (!hashingResult) {
                    return reject("username or password salah"); //ketika password salah
                  } else {
                    return resolve(result.rows[0]);
                  }
                }
              );
            }
          }
        }
      );
    });
  },
  registeruser: ({ full_name, email, phone, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        //postgresql
        `insert into user (id_users,email,password,full_name,phone) values ($1,$2,$3,$4,$5)`,
        //jika mysql menggukanan='?' dan urutannya wajib urut
        [uuidv4(), email, password, full_name, phone],
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve("Register success"); //jgn ditampilkan hasil regis nya agar nanti jwt nya aman
          }
        } //jika varchar perlu string ''
      );
    });
  },
  registercompany: ({
    user_company,
    email,
    name_company,
    field_company,
    phone,
    password,
  }) => {
    return new Promise((resolve, reject) => {
      db.query(
        //postgresql
        `insert into users (id_company,user_company,email,password,name_company,phone,field_company) values ($1,$2,$3,$4,$5,$6,$7)`,
        //jika mysql menggukanan='?' dan urutannya wajib urut
        [
          uuidv4(),
          user_company,
          email,
          password,
          name_company,
          phone,
          field_company,
        ],
        (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve("Register success"); //jgn ditampilkan hasil regis nya agar nanti jwt nya aman
          }
        } //jika varchar perlu string ''
      );
    });
  },
};

module.exports = authModel;
