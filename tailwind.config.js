/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontSize: {
                '9xl': '15.052rem',
            },
            colors: {
                'yellow-shmellow': 'rgb(255,247,226)',
                'yellow-shmellow-dark': 'rgb(255,246,216)'
            }
        },
    },
    plugins: [],
}