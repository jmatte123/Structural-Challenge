import Department from './department';

/**
 * This class is our custom resolver for the type Person in our schema.
 */
export default class Person {
    /**
     * The constructor instanciates all the base properties
     * 
     * @param id 
     * @param firstName 
     * @param lastName 
     * @param jobTitle 
     */
    constructor(id, firstName, lastName, jobTitle) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.jobTitle = jobTitle;
    }

    /**
     * This returns the department property based on the current user being quried.
     */
    async department() {
        // grab the person from the database
        const personJSON = await global.peopleCollection.findOne({ id: this.id });
        // then grab the deparment based on the persons departmentId.
        const departmentJSON = await global.departmentsCollection.findOne({ id: personJSON.departmentId });
        return new Department(departmentJSON.id, departmentJSON.name);
    }

    /**
     * This returns the manager property based on the current user being quried.
     */
    async manager() {
        // grab the person from the database
        const personJSON = await global.peopleCollection.findOne({ id: this.id });
        // make sure there is a manger because it is not required
        if (personJSON.managerId === undefined) return null;
        // grab the manager based on the persons managerId property
        const managerJSON = await global.peopleCollection.findOne({ id: personJSON.managerId });
        return new Person(
            managerJSON.id, 
            managerJSON.firstName, 
            managerJSON.lastName, 
            managerJSON.jobTitle
        );
    }
}
