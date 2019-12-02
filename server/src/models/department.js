const Person = require('./person');

/**
 * This class is our custom resolver for the type Department in our schema.
 */
module.exports = class Department {
    /**
     * The constructor instanciates all the base properties
     * 
     * @param id 
     * @param name 
     */
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    /**
     * This returns all the people that work in a given department
     */
    async people() {
        // get all the people with the same departmentId
        const peopleJSON = await global.peopleCollection.find({ departmentId: this.id }).toArray();
        return peopleJSON.map((person) => {
            return new Person(person.id, person.firstName, person.lastName, person.jobTitle);
        });
    }
}