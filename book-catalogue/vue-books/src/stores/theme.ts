import { defineStore } from 'pinia'
import { useTheme } from 'vuetify'

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
      const vuetifyTheme = useTheme()

      this.current = this.isDark ? 'light' : 'dark'
      vuetifyTheme.global.name.value = this.current
    }
  },
})
