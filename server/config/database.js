var Database = {
    Development: {
        db: "mongodb://localhost/dev-db",
        app: {
            name: "MEAN Stack - Development"
        },
    },
    Production: {
        db: "mongodb://localhost/prod-db",
        app: {
            name: "MEAN Stack - Production"
        },
    }
};

module.exports.database = Database;

