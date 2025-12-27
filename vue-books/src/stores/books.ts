import { defineStore } from 'pinia'
import booksData from '../data/books.json'
import type { Book, Review } from '../types/booksTypes.ts'

export const useBooksStore = defineStore('books', {
  state: () => {
    const stored = localStorage.getItem('books')

    const sourceBooks: Book[] = stored ? JSON.parse(stored) as Book[] : structuredClone(booksData)

    return {
      books: sourceBooks,
    }
  },

  getters: {
    getBookBySlug: (state) => {
      return (slug: string): Book | undefined =>
        state.books.find(book => book.slug === slug)
    },

    reviewsByUser: (state) => {
      return (username: string): Review[] =>
        state.books.flatMap(book =>
          book.reviews.filter(r => r.user === username)
        )
    },
  },

  actions: {
    addReview(slug: string, review: Review): boolean {
    const book = this.books.find(b => b.slug === slug)
    if (!book) return false

    const exists = book.reviews.some(r => r.user === review.user)
    if (exists) return false // vracia false, aby vyskocil dialog v komponentne

    book.reviews.push(review)
    localStorage.setItem('books', JSON.stringify(this.books))
    return true
  },

    deleteReview(slug: string, reviewToRemove: Review) {
      const book = this.books.find(b => b.slug === slug)
      if (!book) return

    // filtruje sa podla obsahu, aby sa predislo chybam napr pri mazani, ked je zapnuty filter
      book.reviews = book.reviews.filter(r => 
        !(r.user === reviewToRemove.user)
      )
      
    localStorage.setItem('books', JSON.stringify(this.books)) // localStorage berie len stringy
  }
}
})
