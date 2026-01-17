import { defineStore } from 'pinia'

export type ThemeName = 'light' | 'dark' //typovanie pre ts

export const useThemeStore = defineStore('theme', {
  state: (): { current: ThemeName } => ({
    current: (localStorage.getItem('theme') as ThemeName) || 'light', //uklada sa do localStorage - perzistentnost (ulozisko v prehliadaci)
  }),

  getters: {
    isDark(state): boolean {
      return state.current === 'dark'
    },
  },

  actions: {
    toggleTheme(): void {
      this.current = this.isDark ? 'light' : 'dark'
      localStorage.setItem('theme', this.current) 
    }
  },
})
