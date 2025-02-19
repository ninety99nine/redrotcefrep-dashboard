module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue",
        "./node_modules/flowbite/**/*.js"
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Standard grid configurations
                '1': 'repeat(1, minmax(0, 1fr))',
                '2': 'repeat(2, minmax(0, 1fr))',
                '3': 'repeat(3, minmax(0, 1fr))',
                '4': 'repeat(4, minmax(0, 1fr))',
                '5': 'repeat(5, minmax(0, 1fr))',
                '6': 'repeat(6, minmax(0, 1fr))',

                // Fractional grid layouts
                '2-5-3-5': '2fr 3fr', // Two-fifths, three-fifths
                '3-5-2-5': '3fr 2fr', // Three-fifths, two-fifths
                '1-3-2-3': '1fr 2fr', // One-third, two-thirds
                '2-3-1-3': '2fr 1fr', // Two-thirds, one-third
                '1-4-3-4': '1fr 3fr', // One-fourth, three-fourths
                '3-4-1-4': '3fr 1fr', // Three-fourths, one-fourth
                '1-4-1-2-1-4': '1fr 2fr 1fr', // One-fourth, one-half, one-fourth
                '1-5-3-5-1-5': '1fr 3fr 1fr', // One-fifth, three-fifths, one-fifth
                '1-4-1-4-1-2': '1fr 1fr 2fr', // One-fourth, one-fourth, one-half
                '1-2-1-4-1-4': '2fr 1fr 1fr', // One-half, one-fourth, one-fourth
                '1-5-1-5-3-5': '1fr 1fr 3fr', // One-fifth, one-fifth, three-fifths
                '3-5-1-5-1-5': '3fr 1fr 1fr', // Three-fifths, one-fifth, one-fifth
                '1-6-1-6-1-6-1-2': '1fr 1fr 1fr 3fr', // One-sixth, one-sixth, one-sixth, one-half
                '1-2-1-6-1-6-1-6': '3fr 1fr 1fr 1fr', // One-half, one-sixth, one-sixth, one-sixth
            },
        },
    },
    plugins: [
        require('flowbite/plugin')
    ],
};
