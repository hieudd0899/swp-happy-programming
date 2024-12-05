/** @type {import('postcss-load-config').Config} */
const config = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
        'postcss-antd-fixes': {
            prefixes: ['vp-antd', 'ant'],
        },
    },
};

export default config;
