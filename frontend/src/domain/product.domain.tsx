export interface productColor {
  ID: number
  Name: string
  CreatedAt: string
  UpdatedAt: string
}

export interface ProductColorResponse {
  productColors: productColor[]
}

interface ProductColor {
  ID: number
  Name: string
  CreatedAt: string
  UpdatedAt: string
}
