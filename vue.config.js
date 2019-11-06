module.exports = {
    devServer: { // 设置服务器代理
        proxy: {
            '/attendance_system': {
                target: 'http://localhost:80',
                changeOrigin: true,
            }
        }
    }
}

