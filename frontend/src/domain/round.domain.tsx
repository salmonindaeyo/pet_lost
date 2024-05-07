export interface RoundInterface {
  id: number
  course_title_th: string
  course_title_en: string
  course_description: string
  created_at: string
  updated_at: string
  deleted_at: string
  status: number
  count: number
}

export type RoundType = RoundInterface[]
