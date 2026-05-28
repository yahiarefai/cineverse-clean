import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        signin: resolve(__dirname, 'signin.html'),
        signup: resolve(__dirname, 'signup.html'),
        profile: resolve(__dirname, 'profile.html'),
        payment: resolve(__dirname, 'payment.html'),
        bookings: resolve(__dirname, 'bookings.html'),
        details: resolve(__dirname, 'details.html'),
        seats: resolve(__dirname, 'seats.html'),
        reset: resolve(__dirname, 'reset-password.html'),
        confirm: resolve(__dirname, 'confirm-email.html'),
      }
    }
  }
})