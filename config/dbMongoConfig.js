const conn = {
    username: "root",
    password: "",
    hostname: 'localhost',
    port: "27017",
    database: "hospitalDB"
  };

  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
  };

  // mongoose.connect(uri, options);
  
  // CON autentificacion
  // const url = `mongodb://${conn.username}:${conn.password}@${conn.hostname}:${conn.port}/${conn.database}?authSource=admin`;
  
  // SIN autentificación
  const url = `mongodb://${conn.hostname}:${conn.port}/${conn.database}?authSource=admin`;
  
  // module.exports = dbMongoConfig.url;
  module.exports = url;
  