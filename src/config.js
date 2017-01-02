// App Config Variables
export default {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB || 'mongodb://mongo:27017',
  SECRET_TOKEN: 'thisismytoken'
};
