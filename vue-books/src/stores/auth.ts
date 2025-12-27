import { defineStore } from 'pinia'
import type { User } from '../types/userTypes'

interface AuthState {
  currentUser: User | null
  isLoggedIn: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => {
    // nacita user z localStorage ak existuje
    const storedUser = localStorage.getItem('currentUser')
    const user: User | null = storedUser ? JSON.parse(storedUser) : null // ak existuje, premeni na objekt

    return {
      currentUser: user,
      isLoggedIn: user !== null, 
    }
  },

  actions: {
    login(username: string, password: string) {
      // demo user bez backendu
      const demoUser: User = {
        username: 'demo',
        password: 'demo',
        avatar: 'images/cat.jpg',
        bio: 'I love reading and books and words and and and',
      }

      if (username === demoUser.username && password === demoUser.password) {
        this.currentUser = demoUser
        this.isLoggedIn = true

        // ulozi user do localStorage
        localStorage.setItem('currentUser', JSON.stringify(demoUser)) // premeni na string

        return true
      }

      return false
    },

    logout() {
      this.currentUser = null
      this.isLoggedIn = false

      localStorage.removeItem('currentUser')
    },
  },
})
