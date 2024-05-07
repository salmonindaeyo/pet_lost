const exceljs = require("exceljs");

const exportData = (data) => {
  let workbook = new exceljs.Workbook();
  let worksheet = workbook.addWorksheet("Worksheet");

  let columns = data.reduce(
    (acc, obj) => (acc = Object.getOwnPropertyNames(obj)),
    []
  );

  worksheet.columns = columns.map((el) => {
    return { header: el, key: el, width: 20 };
  });

  worksheet.addRows(data);

  return workbook;
};

module.exports = exportData;
