module.exports = {
  plugins: {
    tailwindcss: './src/apps/legal-tech-provider-directory/tailwind.config.js',
    autoprefixer: {},
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  },
}
