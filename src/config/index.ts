export const PORT:number = process.env.PORT ? parseInt(process.env.PORT) : 8080;
export const NODE_ENV:string = process.env.NODE_ENV || 'development';
export const PREFIX_NAME:string = NODE_ENV === 'production' ? '' : '-DEV';
export const DB_NAME:string = process.env.DB_NAME || 'test2';
export const DB_HOST:string = process.env.DB_HOST || 'localhost';
export const DB_USER:string = process.env.DB_USER || 'root';
export const DB_PASSWORD:string = process.env.DB_PASSWORD || 'password';