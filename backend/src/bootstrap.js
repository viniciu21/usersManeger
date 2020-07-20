require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
}); //file that will receive our environment variables

