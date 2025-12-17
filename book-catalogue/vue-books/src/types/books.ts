export interface Review {
  user: string
  text: string
  rating: number
}

export interface Book {
  id: number
  title: string
  slug: string
  author: string
  description: string
  image: string
  genre: string[]
  reviews: Review[]
  source: string
}
