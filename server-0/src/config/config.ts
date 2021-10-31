export const config = {
    port: 4000,
    host: "localhost",
    token: {
        issuer: "issuer",
        expireTime: 3600,
        secret: "superencryptedsecret",
    },
    mongoURI: "mongodb://localhost:27017/codebook",
    mongoOptions: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        socketTimeoutMS: 30000,
        keepAlive: true,
        autoIndex: false,
    },
    saltWorkFactor: 9,
};
