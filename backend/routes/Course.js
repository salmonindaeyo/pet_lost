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

router.get("/round", express.json(), async function (req, res, next) {
  try {
    const [result] = await conn.query("SELECT * from course_round");
    console.log(result);
    const selectedRound = result;
    if (!selectedRound) {
      throw {
        errorMessage: "round not found",
      };
    } else {
      for (let index = 0; index < selectedRound.length; index++) {
        const countPerson = await conn.query(
          "SELECT COUNT(*) as count FROM course_main WHERE round_id = ?",
          selectedRound[index].id
        );
        selectedRound[index].count = countPerson[0][0].count;
      }
      res.json(selectedRound);
    }
  } catch (error) {
    console.log("error", error);
    initMySQL();
    res.status(500).json({ error: "Something went wrong Please try again." });
  }
});
router.get("/round/person", express.json(), async function (req, res, next) {
  if (!req.query.id) {
    res.status(400).json({ error: "please send content" });
  } else {
    try {
      const [result] = await conn.query(
        "SELECT * from course_main  WHERE round_id = ?",
        req.query.id
      );

      const selectedRound = result;
      if (!selectedRound) {
        throw {
          errorMessage: "round not found",
        };
      } else {
        res.json(selectedRound);
      }
    } catch (error) {
      console.log("error", error);
      initMySQL();
      res.status(500).json({ error: "Something went wrong Please try again." });
    }
  }
});
router.post("/round", express.json(), async (req, res) => {
  const { roundDetail } = req.body;
  console.log(roundDetail);
  const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss.SSSSSS");

  try {
    const data = {
      course_title_th: roundDetail.course_title_th,
      course_title_en: roundDetail.course_title_en,
      course_description: roundDetail.course_description,
      registration_end: roundDetail.registration_end,
      // created_at: roundDetail.created_at,
      created_at: currentDate,
      updated_at: null,
      status: roundDetail.status,
      registration_start: roundDetail.registration_start,
    };

    try {
      const result = await conn.query("INSERT INTO course_round SET ?", data);
      res.status(201).send({ status: 201, message: "add round successfully" });
    } catch (error) {
      res.status(400).json({
        message: "insert fail",
        error,
      });
    }
  } catch (error) {
    initMySQL();
    res.status(500).json({ error: "Something went wrong Please try again." });
  }
});

router.get("/export", express.json(), async function (req, res, next) {
  const id = req.query.id;
  try {
    const [result] = await conn.query(
      "SELECT * from course_main WHERE round_id = ?",
      id
    );
    let dataInsert = [];
    for (let index = 0; index < result.length; index++) {
      let prefix;

      data = {
        คำนำหน้าชื่อ: changePrefix(result[index].prefix),
        ชื่อ: result[index].fname,
        นามสกุล: result[index].lname,
        ชื่อมุสลิมหรือชื่อเล่น: result[index].mname,
        อายุ: result[index].age,
        เบอร์โทรศัพท์: result[index].phone,
        LineId: result[index].lineid,
        วุฒิการศึกษา: changeEdu(result[index].edu_level),
        อาชีพ: result[index].job,
        วันที่กรอก: result[index].created_at,
      };
      dataInsert.push(data);
    }

    const workbook = exportData(dataInsert);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=" + "data.xlsx");

    return workbook.xlsx.write(res).then(function () {
      res.status(200).end();
    });
  } catch (err) {
    initMySQL();
    res.status(500).json({ error: "Something went wrong Please try again." });
  }
});

router.put("/round", express.json(), async (req, res) => {
  const { credentials } = req.body;
  console.log(req.body);
  const currentDate = dayjs().format("YYYY-MM-DD HH:mm:ss.SSSSSS");

  try {
    const dataToUpdate = {
      course_title_th: credentials.course_title_th,
      course_title_en: credentials.course_title_en,
      course_description: credentials.course_description,
      registration_end: credentials.registration_end,
      updated_at: currentDate,
      created_at: credentials.created_at,
      status: credentials.status,
      registration_start: credentials.registration_start,
    };

    try {
      const result = await conn.query(
        "UPDATE course_round SET ? WHERE id = ?",
        [dataToUpdate, credentials.id]
      );
      res
        .status(200)
        .send({ status: 200, message: "update round successfully" });
    } catch (error) {
      res.status(400).json({
        message: "update fail",
        error,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong Please try again." });
    initMySQL();
  }
});

module.exports = router;
