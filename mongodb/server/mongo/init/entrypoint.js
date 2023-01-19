var db = connect("mongodb://admin:sandip123@localhost:27017/db");

db = db.getSiblingDB('db'); // we can not use "use" statement here to switch db

db.createUser(
    {
        user: "sandip",
        pwd: "sandip123",
        roles: [ { role: "readWrite", db: "db"} ],
        passwordDigestor: "server",
    }
)