let env: string = process.env.NODE_ENV || 'local';
let config: any = require('../config/config.' + env);

export = config;
