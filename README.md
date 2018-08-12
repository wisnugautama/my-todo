# my-todo
## Documentation

### List of User Routes :

Route          | Method | Description            | Attributes                   |
-------------- | ------ | ---------------------- | ---------------------------- |
users/register | POST   | register user          | name,email,username,password |
users/login    | POST   | login user manual      | email & password             |
users/loginfb  | POST   | login using fb         | email                        |



### List of Task Routes : 

Route          | Method | Description            | Attributes                   |
-------------- | ------ | ---------------------- | ---------------------------- |
tasks/         | GET    | get all user tasks     | -                            |
tasks/:id      | GET    | get specific user task | id                           |
tasks/         | POST   | create task            | task_name, due_date          |
tasks/:id      | PUT    | update task user       | id                           |
tasks/:id      | DELETE | delete task user       | id                           |



### List of Weather Routes :

Route          | Method | Description            | Attributes                   |
-------------- | ------ | ---------------------- | ---------------------------- |
/weathers      | POST   | get weathers api       | city_name                    |

