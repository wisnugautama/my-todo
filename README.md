# my-todo
## Documentation

### List of User Routes :

Route          | Method | Description            | Attributes                   |
-------------- | ------ | ---------------------- | ---------------------------- |
users/register | POST   | register user          | name,email,username,password |
users/login    | POST   | login user manual      | email & password             |
users/loginfb  | POST   | login using fb         | email                        |



### List of Task Routes : 

Route                 | Method | Description                             | Attributes                   |
--------------------- | ------ | --------------------------------------- | ---------------------------- |
tasks/notdone/:token  | GET    | get all user tasks with status not done | user token id                |
tasks/done/:token     | GET    | get all user tasks with status done     | user token id                |
tasks/:id             | GET    | get specific user task                  | id                           |
tasks/priority/:token | GET    | get specific user task                  | user token id                |
tasks/                | POST   | create task                             | task_name, due_date, priority|
tasks/:id             | PUT    | update task user                        | id                           |
tasks/done/:id        | PUT    | update status user with done            | id task                      |
tasks/:id             | DELETE | delete task user                        | id                           |



### List of Weather Routes :

Route           | Method | Description                        | Attributes                   |
--------------- | ------ | ---------------------------------- | ---------------------------- |
/weathers/:city | POST   | get weathers api by city name      | city_name                    |

## USAGE
```
npm install
npm run dev
```

Access via http://localhost:3000