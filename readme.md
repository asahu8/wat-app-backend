
# WAT-APP-BACKEND : RESTful API app using nodeJS

### Connect to PG
  ```npm i express pg```

  Mention your DB crendentials at: ormconfig.json
### Connect to MySQL
  ```npm i mysql```

  Mention your DB credentials at: ormconfig.json

###  ORM configuration
  Create ```ormconfig.json``` at project root. Please mind: it's gitignored.
  ```
  {
    "type": "mysql",
    "port": "3306",
    "username": "",
    "password": "",
    "host": "localhost",
    "database": "wat_app_dev",
    "synchronize": true,
    "logging": false,
    "entities": [
        "src/entity/**/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
    "cli": {
        "entitiesDir": "src/entity",
        "migrationsDir": "src/migration",
        "subscribersDir": "src/subscriber"
    }
  }
```
###  Let's fly
```
  npm install
  npm start // will create/update tables at run time
  💃🏻 Server started on port 3000! 🕺
  npm run migration:run // execute pending migrations
```

### Let's try

// 20200524144236
// http://localhost:4001/contributors

[
  {
    "id": 1,
    "username": "admin",
    "firstName": "Sean",
    "lastName": "Alexander",
    "email": "salexander@watpp.com",
    "dateOfBirth": "10-10-1990",
    "phoneNumber": "9875-482-495",
    "contributionAmount": 2000,
    "livesUplifted": 5,
    "fundsLives": 5,
    "companyName": "act corp",
    "designation": "nodJS dev",
    "location": "SFO",
    "areasOfInterest": "basket ball",
    "active": true,
    "isAdmin": true,
    "role": "ADMIN"
  }
]
```




 ### App Flow
  ![Image description](https://camo.githubusercontent.com/a9a794ecd9bceb39a850d625b60aaf2241568e51/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323131362f312a63596e6544686a7a6b414b444a4254454a3472446f672e706e67)

