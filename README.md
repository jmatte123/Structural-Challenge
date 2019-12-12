# Structural Challenge

This repositories holds my submission for the coding challenge at Structural.  In this reposititory, I use GraphQL, Node.js, Express.js, and MongoDB to create an API for the given dataset of people and departments in a fake company.  Follow the installation process to create a docker-compose container with MongoDB and all the data inside of it where you can use GraphQL Playground and run quiers on it.

## Installation

To start, clone the repository into a folder.

```bash
git clone https://github.com/jmatte123/Structural-Challenge.git
```

Next, install docker via brew (if not already installed) and make sure that it is running.

```bash
brew cask install docker
```

Execute the following commands to build the server-side docker images and run the images.

```bash
docker build -t server ./server 
docker-compose up
```
Next, we will be creating the database and the corresponding collections in the database. We will also be populating the database collections with data provided in the dataset.

### Populating the MongoDB Database

Start out by heading over to either MongoDB shell or MongoDB Compass.  Once there create a database named ***company***, and two collections named ***people*** and ***departments***.

Next, run the following commands, in a new terminal, to populate the databases with the given dataset.

```bash
docker cp ./people.json structural_mongo_1:/
docker cp ./departments.json structural_mongo_1:/
docker exec structural_mongo_1 mongoimport --db company --collection people --file ./people.json --jsonArray
docker exec structural_mongo_1 mongoimport --db company --collection departments --file ./departments.json --jsonArray
```

There, there should now be some test data to test out the GraphQL API.

## Usage

Now run some Queries and Mutations in GraphQL Playground.

For example: 
```graphql
query people{
  getPeople{
    firstName
    manager{
      firstName
      department{
        name
      }
    }
  }
}
```

## Work Done
I spent a lot of time on this, probably over 20 hours.  The reason why it took so long is because I had never worked with GraphQL or Docker before, let alone connecting everything together.  I also did a ton of research into Facebook's Relay framework along with Apollo Server. You can see on the other branch that I tried porting over my code to work with Apollo Server, however, I found out that the queries do not run the same as before, so I rolled back.

This is exactly what I expected going into this project. I was hoping to be challenged this hard as I imagine that is what this position would require.  I had a lot fun learning everything during this challenge, and I will definitly use it on my school project.

## Future work
I was hoping to do the following for future work: 
* Write more and better automated testing scripts.
* Write a React frontend, either using Apollo Server or Relay.js.  
* Implement Mongoose to take out the MongoClient global variables.
* Do some verification in the resolver functions.
