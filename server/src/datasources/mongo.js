const { DataSource } = require('apollo-datasource');

class MongodbAPI extends DataSource {
    constructor(db) {
        super();
        this.peopleCollection = db.collection('people');
        this.departmentsCollection = db.collection('department');
    }

    initialize(config) {
        this.context = config.context;
    }
}

module.exports = MongodbAPI;