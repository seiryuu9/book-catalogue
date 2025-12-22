export interface Review {
  user: string
  text: string
  rating: number
  title?: string
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

export interface UserReview extends Review {
  bookSlug: string
}

// struktury pre ts