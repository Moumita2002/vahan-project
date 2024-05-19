# vahan-project


![2024-05-20](https://github.com/Moumita2002/vahan-project/assets/102172188/f3071d89-cc24-4d22-bff5-70d341418cdb)

- Overview of Backend:-
  - Middleware:
    ensureModelExists: This middleware ensures that a Mongoose model corresponding to the requested entity name exists. If not, it dynamically creates the model using the entity definition   
    fetched from the database.

  - CRUD Operations:
    The router handles CRUD operations (POST, GET, PUT, DELETE) for the dynamic entities. Each operation is facilitated by dynamically created Mongoose models, enabling the application to 
    handle various entity types and structures.

  - Utility Functions:
    Utility functions (formatDate and formatDateToUTC) are used to handle date fields, ensuring that dates are stored and retrieved in a consistent format.
