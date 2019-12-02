# Structural Challenge

This repositories 

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
Then, start up your GraphQL Playground application and run queries on the database.  Not much happens because there is no data in the database.  lets fix this...

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
I was hoping to write the test scripts for this challenge, however I spent to much time trying to learn the Apollo Server framework.  I was also hoping to write a React frontend to the challenge, I did do some research into it when I was looking at Relay and Apollo Server documentation.