const { mongoose } = require('mongoose')

const {
  MONGO_URI,
  MONGO_USER,
  MONGO_HOST,
  MONGO_DB_PORT,
  MONGO_DB_NAME,
  MONGO_PASSWORD,
} = process.env;

const ENCODED_MONGO_PASSWORD = MONGO_URI
  ? ''
  : encodeURIComponent(MONGO_PASSWORD)

// ✅ Initialize Mongoose
const APP_MONGO_URI = MONGO_URI || `mongodb://${MONGO_USER}:${ENCODED_MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_DB_PORT}/${MONGO_DB_NAME}`;

module.exports = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(APP_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then(() => {
      console.log('✅ Connected to MongoDB');
      resolve(true);
    }).catch((error) => {
      console.error('❌ Error connecting to MongoDB:', error.message);
      reject(error);
      process.exit(1); // Exit if the database connection fails
    });
  });
};
