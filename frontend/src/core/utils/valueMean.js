export function translateEducation(input) {
  switch (input) {
    case 'edu_primary':
      return 'ประถมศึกษา'
    case 'edu_seconday':
      return 'มัธยมศึกษา'
    case 'edu_bachelor':
      return 'ปริญญาตรี'
    case 'edu_master':
      return 'ปริญญาโท'
    case 'edu_phd':
      return 'ปริญญาเอก'
    default:
      return 'อื่นๆ'
  }
}

export function translateStatus(input) {
  switch (input) {
    case 1:
      return 'เพิ่งกรอกเข้ามา'
    case 2:
      return 'approved'

    default:
      return 'อื่นๆ'
  }
}

export function translatePrefix(input) {
  switch (input) {
    case 'mr':
      return 'นาย'
    case 'mrs':
      return 'นาง'
    case 'miss':
      return 'นางสาว'
    default:
      return 'อื่นๆ'
  }
}

export function translateJob(input) {
  switch (input) {
    case 'job_gov':
      return 'รับราชการ'
    case 'job_busi':
      return 'ธุรกิจส่วนตัว'
    case 'job_stu':
      return 'นักศึกษา'
    default:
      return 'อื่นๆ'
  }
}
