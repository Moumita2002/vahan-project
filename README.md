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


- Overview of Frontend -
  - State Management: React's useState and useEffect hooks manage the application state and side effects. States such as entities, currentEntity, records, newRecord, editingRecordId, and 
    editingRecordData keep track of entities, selected entity records, new record inputs, and records being edited.

  - Fetching Data:
    - fetchEntities: This function fetches all entities from the backend using the getEntities API call and updates the entities state.
    - handleEntitySelect: Fetches records for the selected entity and updates the currentEntity and records states.

  - Creating Entities and Records:
    - handleCreateEntity: Prompts the user for entity details and creates a new entity by calling the createEntity API. It then refreshes the list of entities.
    - handleCreateRecord: Adds a new record to the currently selected entity using the createRecord API, then refreshes the list of records for that entity.

  - Updating and Deleting Records:
    - handleEditRecord: Sets the selected record into edit mode by updating the editingRecordId and editingRecordData states.
    - handleSaveUpdate: Saves updates to the record by calling the updateRecord API and then exits the edit mode by resetting the editingRecordId and editingRecordData states.
    - handleDeleteRecord: Deletes a record using the deleteRecord API and refreshes the list of records.

  - Dynamic Form Generation:
    The form for creating new records is generated dynamically based on the fields defined in the currentEntity. Inputs are generated for each field, allowing users to enter data conforming       to the entity's schema.
