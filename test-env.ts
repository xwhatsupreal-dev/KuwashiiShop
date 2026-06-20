import fs from 'fs';
import dotenv from 'dotenv';
console.log(dotenv.parse(fs.readFileSync('.env')));
