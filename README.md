## HireApp-Server

This is a ExpressJs-based API for [frontend project](https://github.com/ARRAY-4/frontend). It uses PostgreSQL as its database

## Getting started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/ARRAY-4/backend.git`
* `cd backend`
* `npm install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node index.js` to start the local server

## DB Structure

Open [schema](https://drawsql.app/teams/array/diagrams/copy-of-auth-db)

## Folder Structure

     ┣ 📂public
     ┃ ┗ 📂uploads
     ┃ ┃ ┗ 📂images
     ┣ 📂src
     ┃ ┣ 📂controllers
     ┃ ┃ ┣ 📜auth.controller.js
     ┃ ┃ ┣ 📜users.controller.js
     ┃ ┃ ┣ 📜usersExperiences.controller.js
     ┃ ┃ ┣ 📜usersPortfolio.controller.js
     ┃ ┃ ┗ 📜usersSkills.controller.js
     ┃ ┣ 📂middleware
     ┃ ┃ ┣ 📜checkDuplicate.js
     ┃ ┃ ┣ 📜formUpload.js
     ┃ ┃ ┣ 📜validation-company.js
     ┃ ┃ ┗ 📜validation-user.js
     ┃ ┣ 📂model
     ┃ ┃ ┣ 📜auth.model.js
     ┃ ┃ ┣ 📜users.model.js
     ┃ ┃ ┣ 📜usersExperiences.model.js
     ┃ ┃ ┣ 📜usersPortfolio.model.js
     ┃ ┃ ┗ 📜usersSkills.model.js
     ┃ ┗ 📂routes
     ┃ ┃ ┣ 📜auth.route.js
     ┃ ┃ ┣ 📜index.js
     ┃ ┃ ┣ 📜users.route.js
     ┃ ┃ ┣ 📜usersExperiences.route.js
     ┃ ┃ ┣ 📜usersPortfolio.route.js
     ┃ ┃ ┗ 📜usersSkills.route.js
    
## Endpoints
users endpoint

    GET      /api/users
    GET      /api/users/:id
    PATCH    /api/users/:id
    DEL      /api/users/:id

portfolio endpoint

    GET      /api/users-portfolio
    GET      /api/users-portfolio/:id
    POST     /api/users-portfolio
    PATCH    /api/users-portfolio/:id
    DEL      /api/users-portfolio/:id
    
experiences endpoint

    GET      /api/users-experiences
    GET      /api/users-experiences/:id
    POST     /api/users-experiences
    PATCH    /api/users-experiences/:id
    DEL      /api/users-experiences/:id
    
user_skills endpoint

    GET      /api/users-skills
    GET      /api/users-skills/:id
    POST     /api/users-skills
    PATCH    /api/users-skills/:id
    DEL      /api/users-skills/:id

when put under a domain with `prefix`, it would look like:

    https://www.example.com/api/users
 
Documentation : [Postman Collection](https://documenter.getpostman.com/view/24646334/2s935kP673)
 
