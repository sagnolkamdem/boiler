export const config = () => ({
    port: Number(process.env.APP_PORT), 
    database: 
        {
            type: "postgres",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: ["dist/**/*.entity.js"],
            synchronize: true
        }
})