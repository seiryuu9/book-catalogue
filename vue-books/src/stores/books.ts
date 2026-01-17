import { defineStore } from 'pinia'
import booksData from '../data/books.json'
import type { Book, Review } from '../types/booksTypes.ts'

export const useBooksStore = defineStore('books', { // books je nazov store
  state: () => {
    const stored = localStorage.getItem('books') // skusi nacitat data z localStorage

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
        state.books.flatMap(book => // z kazdeho book berie len review
          book.reviews.filter(r => r.user === username)
        )
    },
  },

  actions: {
    addReview(slug: string, review: Review): boolean {
      const book = this.books.find(b => b.slug === slug)
      if (!book) return false

      const exists = book.reviews.some(r => r.user === review.user)
      if (exists) return false // vracia false, aby vyskocil dialog v komponentne, ak user uz recenziu pridal

      book.reviews.push(review)
      localStorage.setItem('books', JSON.stringify(this.books)) // aktualizuje localStorage
      return true
    },

    deleteReview(slug: string, reviewToRemove: Review) {
      const book = this.books.find(b => b.slug === slug)
      if (!book) return

      book.reviews = book.reviews.filter(r => 
        !(r.user === reviewToRemove.user) // review nema id, tak porovnavame podla usera - nove pole
      )
      
    localStorage.setItem('books', JSON.stringify(this.books)) // localStorage berie len stringy
  }
}
})
