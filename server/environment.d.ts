declare global {
    namespace NodeJs {
        interface ProcessEnv{
            MONGODB_URI: string;
            NODE_ENV: 'development' | 'production';
            PORT? : string;
            PWD: string;
        }
    }
}

export {};