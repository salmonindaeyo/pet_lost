export interface ManageInterface {
  id: number
  user_id: number
  lang: string
  prefix: string
  fname: string
  lname: string
  mname: string
  lineid: string
  status: number
  created_at: string
  updated_at: string | null
  approved_at: string | null
  document_no: string | null
  convert_data: ConvertData[]
}

export interface ConvertData {
  id: number
  user_id: number
  birthday: string
  f_religion: string
  nation: string
  nation2: string
  card_no: string
  card_date: string
  card_exp: string
  card_addr: string
  phone: string
  cur_addr: string
  marrystatus: string
  job: string
  job_other: string
  edu_level: string
  edu_level_other: string
  created_at: string
  updated_at: string | null
}

export type ManageType = ManageInterface[]
