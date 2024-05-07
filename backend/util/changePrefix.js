function changePrefix(prefix) {
  switch (prefix) {
    case "miss":
      return "นางสาว";
      break;
    case "mr":
      return "นาย";
      break;
    case "mrs":
      return "นาง";
      break;
    default:
      // กรณีไม่ตรงกับเงื่อนไขใด ๆ
      return "ไม่ระบุคำนำหน้า";
  }
}

module.exports = changePrefix;
