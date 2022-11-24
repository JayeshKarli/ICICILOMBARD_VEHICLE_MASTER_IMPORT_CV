const { Client } = require("pg");

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "root",
    database: "master_tool_db",
});

module.exports.client = client;