# Structural Challenge

This repositories 

## Installation

To start, clone the repository into a folder.

```bash
git clone https://github.com/jmatte123/Structural-Challenge.git
```

Next, install docker via brew

```bash
brew cask install docker
```

Go into the server folder and execute the following commands to build the server-side docker images and run the images 

```bash
cd server/
docker build -t server ./server 
docker-compose up
```

### Populating the MongoDB Database

Run the following commands, in a new terminal, to populate the databases with the given dataset

```bash
cd ..
docker cp ./people.json structural_mongo_1:/
docker cp ./departments.json structural_mongo_1:/
docker exec 01317a4f187e mongoimport --db company --collection people --file ./people.json --jsonArray
docker exec 01317a4f187e mongoimport --db company --collection departments --file ./departments.json --jsonArray
```

## Usage

```python
import foobar

foobar.pluralize('word') # returns 'words'
foobar.pluralize('goose') # returns 'geese'
foobar.singularize('phenomena') # returns 'phenomenon'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.