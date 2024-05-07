const { Router } = require("express");
const router = Router();
const express = require("express");
const exceljs = require("exceljs");
const fs = require("fs");
const changePrefix = require("../util/changePrefix");
const changeEdu = require("../util/changeEdu");
const exportData = require("../util/exportData");
const dayjs = require("dayjs");
const { initMySQL } = require("../configs/db");

// router.get("/", express.json(), async (req, res) => {
//   const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss.SSSSSS");

//   try {
//     const [resultConvertData] = await conn.query(`
//       SELECT convert_main.*, convert_data.*
//       FROM convert_main
//       LEFT JOIN convert_data ON convert_main.user_id = convert_data.user_id

//     `);

//     const convertMainData = resultConvertData;

//     res.json(convertMainData);
//   } catch (error) {
//     console.log("error", error);
//     initMySQL();
//     res.status(500).json({ error: "Something went wrong. Please try again." });
//   }
// });

router.get("/", express.json(), async function (req, res, next) {
  try {
    const [resultConvertMain] = await conn.query("SELECT * from convert_main");

    const convertMainData = resultConvertMain;
    if (!convertMainData) {
      throw {
        errorMessage: "round not found",
      };
    } else {
      for (const convertMainItem of convertMainData) {
        const [resultConvertData] = await conn.query(
          "SELECT * from convert_data WHERE user_id = ?",
          [convertMainItem.user_id]
        );

        if (resultConvertData.length > 0) {
          for (const convertDataItem of resultConvertData) {
            Object.assign(convertMainItem, convertDataItem);
          }
        }
      }

      res.json(convertMainData);
    }
  } catch (error) {
    console.log("error", error);
    initMySQL();
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

router.post("/approve", express.json(), async function (req, res, next) {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ error: "Missing 'id' in the request body." });
    }

    const [resultConvertMain] = await conn.query(
      "SELECT * from convert_main WHERE id = ?",
      [id]
    );

    if (resultConvertMain.length === 0) {
      return res.status(404).json({ error: "Record not found." });
    }

    const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    await conn.query(
      "UPDATE convert_main SET approved_at = ?, status = 2, document_no = ? WHERE id = ?",
      [currentDate, await generateDocumentNo(), id]
    );

    res.json({ message: "Record approved successfully." });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

async function generateDocumentNo() {
  const currentDate = new Date();
  const year = currentDate.getFullYear().toString().slice(-2);
  const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const [resultCount] = await conn.query(
    "SELECT COUNT(*) AS count FROM convert_main WHERE document_no LIKE ?",
    [`%${year}${month}%`]
  );

  const count = resultCount[0].count + 1;
  const documentNo = `${year}${month}${count.toString().padStart(4, "0")}`;
  return documentNo;
}

router.put("/person", express.json(), async (req, res) => {
  const { credentials } = req.body;
  console.log(credentials);
  if (!credentials) {
    return res.status(400).json({ error: "please send a body" });
  }

  if (!credentials.user_id) {
    return res.status(400).json({ error: "please send a user id" });
  }
  const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss.SSSSSS");

  try {
    const [resultConvertData] = await conn.query(`
    SELECT convert_main.*, convert_data.*
    FROM convert_main
    LEFT JOIN convert_data ON convert_main.user_id = convert_data.user_id
    WHERE convert_main.user_id = ${credentials.user_id}
  `);
    const convertMainData = resultConvertData[0];
    if (!convertMainData.user_id) {
      return res
        .status(400)
        .json({ message: "ผู้สมัคกรอกยังข้อมูลไม่ครบถ้วน" });
    }
    const dataToUpdateMain = {
      lang: credentials.lang || convertMainData.lang,
      prefix: credentials.prefix || convertMainData.prefix,
      fname: credentials.fname || convertMainData.fname,
      lname: credentials.lname || convertMainData.lname,
      mname: credentials.mname || convertMainData.mname,
      lineid: credentials.lineid || convertMainData.lineid,
      updated_at: currentDate,
    };
    try {
      const result = await conn.query(
        "UPDATE convert_main SET ? WHERE user_id = ?",
        [dataToUpdateMain, credentials.user_id]
      );
    } catch (error) {
      res.status(400).json({
        message: "update fail",
        error,
      });
    }

    const dataToUpdateData = {
      birthday: credentials.birthday || convertMainData.birthday,
      f_religion: credentials.f_religion || convertMainData.f_religion,
      nation: credentials.nation || convertMainData.nation,
      nation2: credentials.nation2 || convertMainData.nation2,
      card_no: credentials.card_no || convertMainData.card_no,
      card_date: credentials.card_date || convertMainData.card_date,
      card_exp: credentials.card_exp || convertMainData.card_exp,
      card_addr: credentials.card_addr || convertMainData.card_addr,
      phone: credentials.phone || convertMainData.phone,
      cur_addr: credentials.cur_addr || convertMainData.cur_addr,
      marrystatus: credentials.marrystatus || convertMainData.marrystatus,
      job: credentials.job || convertMainData.job,
      job_other: credentials.job_other || convertMainData.job_other,
      edu_level: credentials.edu_level || convertMainData.edu_level,
      edu_level_other:
        credentials.edu_level_other || convertMainData.edu_level_other,
    };
    console.log(dataToUpdateData);
    try {
      const result = await conn.query(
        "UPDATE convert_data SET ? WHERE user_id = ?",
        [dataToUpdateData, credentials.user_id]
      );
    } catch (error) {
      res.status(400).json({
        message: "update fail",
        error,
      });
    }

    res.status(200).json({ message: "Update susscessfully" });
    // res.json(convertMainData);
  } catch (error) {
    console.log("error", error);
    initMySQL();
    res.status(500).json({ error: "Something went wrong. Please try again." });
  }
});

module.exports = router;
