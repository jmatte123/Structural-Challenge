const Person = require('./person');

class Department {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    async people() {
        const peopleJSON = await peopleCollection.find({ departmentId: this.id }).toArray();
        return peopleJSON.map((person) => {
            return new Person(person.id, person.firstName, person.lastName, person.jobTitle);
        });
    }
}

module.exports = Department;