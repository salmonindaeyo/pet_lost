function changeEdu(edu) {
  const educationLevels = {
    edu_primary: "ประถมศึกษา",
    edu_secondary: "มัธยมศึกษา",
    edu_bachelor: "ปริญญาตรี",
    edu_master: "ปริญญาโท",
    edu_phd: "ปริญญาเอ",
  };

  const thaiEducationLevel = educationLevels[edu] || "ไม่ระบุระดับการศึกษา";

  return thaiEducationLevel;
}

module.exports = changeEdu;
