require('module-alias/register')

import config from './config';
import app from './app';
import { connectDB } from './lib/db';


async function main(){
    await connectDB();
    app.listen(config.port);
    console.log(`Server is listen on port: ${config.port}`)
}

main();

