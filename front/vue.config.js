// let publicPath = process.env.VUE_APP_PUBLIC_PATH || '/';
// const port = process.env.port || process.env.npm_config_port || 8080; // dev port
module.exports = {
    // publicPath,
    // lintOnSave: process.env.NODE_ENV === 'development',
    // productionSourceMap: false,
    devServer: {
        proxy: 'http://localhost:5000/proxy',
        // proxy: {
        //
        //     // '/proxy': {
        //     //     target: 'http://192.168.4.225:5000/proxy',
        //     //     ws: true,
        //     //     changeOrigin: true,
        //     //     secure: false,
        //     //     pathRewrite: {
        //     //         '^/proxy': '',
        //     //     },
        //     // },
        // },
    },
};
