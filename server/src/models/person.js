const Department = require('./department');

class Person {
    constructor(id, firstName, lastName, jobTitle) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
    }

    async department() {
        const personJSON = await peopleCollection.findOne({ id: this.id });
        const departmentJSON = await departmentsCollection.findOne({ id: personJSON.departmentId });
        return new Department(departmentJSON.id, departmentJSON.name);
    }

    async manager() {
        const personJSON = await peopleCollection.findOne({ id: this.id });
        if (personJSON.managerId === undefined) return null;
        const managerJSON = await peopleCollection.findOne({ id: personJSON.managerId });
        return new Person(
            managerJSON.id, 
            managerJSON.firstName, 
            managerJSON.lastName, 
            managerJSON.jobTitle
        );
    }
}

module.exports = Person;