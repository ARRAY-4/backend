const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/images");
  },
  filename: function (req, file, cb) {
    //const filename = file.originalname.split(".");//split memishakan nama dan format nantinya di panggil sesuai array
    //cb(null, `${filename[0]}-${new Date().getTime()}.${filename[1]}`);
    //ketika ada 2 titik pada file maka split tidak bekerja dengan baik

    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const formUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    //console.log(file);
    let formatType = path.extname(file.originalname);
    if (formatType == ".png" || formatType == ".jpg" || formatType == ".jpeg") {
      cb(null, true);
    } else {
      cb("image not valid", false);
    }
  },
  limits: {
    fileSize: 1048576 * 2, //2 mb
  },
  //dest: './public/data/uploads/'
});

module.exports = formUpload;
