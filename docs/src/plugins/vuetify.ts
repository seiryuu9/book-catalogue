import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#503118',
          background: '#dddddd',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#706055',
          background: '#1c1c1c',
        },
      },
    },
  },
})
