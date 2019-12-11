# mongo-homework

### Installation
1. Clone repo
2. Open project directory
3. Import all data from articles.json into articles collection
4. Import all data from users.json into users collection
5. run ```npm install``` command
6. run ```npm start``` command

### Task

1. CRUD for users were implemented
  - 1.1 Used user schema, model, controller, route

#### User Schema

```
{
  firstName: type string, min length 4, max length 50, required field,
  lastName: type string, min length 3, max length 60, required field
  role: type string, only valid values is [admin, writer, guest],
  createdAt: type Datetime, with default value,
  numberOfArticles: type number, default value 0, not required,
  nickname: type string, not required
}
```

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users (POST)**, new user document was created
to have possibility to find it in mongodb users collection

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (PUT)**, I created possibility 
to edit required user document fields, so that I would have possibility to easily update general user information

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (GET)**, I created possibility
to get information about any user just by passing specific user mongo id as an api parameter.
(Response also contains all articles that user created)

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId (DELETE)**, I created possibility
to remove specific user from mongodb and all articles that had been created.

* Using [Postman](https://www.getpostman.com/), and api endpoint **/users/:userId/articles (GET)**, I created possibility
to get all articles that had been created by specific user.


2. CRUD for articles was implemented 
  - 2.1 Created schema, model, controller, routes

#### Article Schema

```
{
  title: type string, min length 5, max length 400, required field, add text index
  subtitle: type string, min length 5, not required field,
  description: type string, min length 5, max length 5000, required,
  owner: user reference, required field,
  category: valid options [sport, games, history], required
  createdAt: type datetime, required field
  updatedAt: type datetime, required field
}
```

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles (POST)**, I created new article,
so that I could have possibility to find it in mongodb articles collection. 
Before creating new article, I checked if owner exists. 
(All articles have reference to specific user - ***owner*** field, and also after creating new article, increment ***numberOfArticles*** field for that user)

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles/:articleId (PUT)**, I created possibility
to edit any article document. Before making update action, I checked if article / user exists, and only
after that I started updating document.

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles (GET)**,
I created possibility to search for articles using next filters **title, subtitle, description, owner, category,
createdAt, updatedAt**. If I request endpoint without setting filter criteria, I should get all articles from database.
(Owner field was populated)

* Using [Postman](https://www.getpostman.com/), and api endpoint **/articles/:articleId (DELETE)**,
I created possibility to delete any article from database. (At the moment of deleting article, ***numberOfArticles*** field for user that created this article decrements)




