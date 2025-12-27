import { defineStore } from 'pinia'

export type ThemeName = 'light' | 'dark'

export const useThemeStore = defineStore('theme', {
  state: (): { current: ThemeName } => ({
    current: 'light',
  }),

  getters: {
    isDark(state): boolean {
      return state.current === 'dark'
    },
  },

  actions: {
    toggleTheme(): void {
      this.current = this.isDark ? 'light' : 'dark'
    }
  },
})
