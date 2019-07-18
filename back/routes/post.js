const express = require("express");
const multer = require("multer");
const router = express();

const upload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, done) {
      done(null, "uploads/");
    },
    filename: function(req, file, done) {
      const fileName = file.originalname.replace(/ /gi, ""); // 공백제거
      const extension = fileName.slice(-4); // 확장자
      const baseName = fileName.slice(0, -4); // 확장자 제거된 파일명
      done(null, baseName + new Date().valueOf() + extension);
    }
  })
});

router.post("/image", upload.array("image"), (req, res) => {
  const files = req.files.map(v => {
    return v.filename;
  });

  res.json(files);
});

module.exports = router;
