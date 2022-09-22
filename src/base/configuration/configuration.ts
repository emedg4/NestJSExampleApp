export default () => ({
    app: {
        port: parseInt(process.env.APP_PORT, 10) || 50161
    },
    app_name: process.env.APP_NAME,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    },
    sso: {
        colaborador_digital: {
            host: process.env.SSO_CD_HOST,
            path:{
                login: process.env.SSO_CD_PATH_LOGIN,
                validate: process.env.SSO_CD_PATH_VALIDATE,
            },
            loginType: parseInt(process.env.SSO_CD_LOGIN_TYPE, 10) || 10
        },
        
        aplicativos: {
            host: process.env.SSO_APP_HOST,
            path: {
                login: process.env.SSO_APP_PATH_LOGIN,
                validate: process.env.SSO_APP_PATH_VALIDATE
            },
            appId: process.env.SSO_APP_APPID,
            appKey: process.env.SSO_APP_APPKEY
        },     
    },
    detalle_empleado:{
        de:{
            host:process.env.DE_HOST,
            path:process.env.DE_PATH
        },
    },
    env_prod : process.env.PROD,
    tracking_url: process.env.TRACKING_URL,
    soap_config: {
        url: process.env.SOAP_URL,
        namespace:process.env.SOAP_NAMESPACE
    }
});