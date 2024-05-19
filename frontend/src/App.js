import React, { useState, useEffect } from 'react';
import { createEntity, getEntities, createRecord, getRecords, updateRecord, deleteRecord } from './services/api';
import "./App.css"
function App() {
    const [entities, setEntities] = useState([]);
    const [currentEntity, setCurrentEntity] = useState(null);
    const [records, setRecords] = useState([]);
    const [newRecord, setNewRecord] = useState({});
    const [editingRecordId, setEditingRecordId] = useState(null);
    const [editingRecordData, setEditingRecordData] = useState({});

    useEffect(() => {
        fetchEntities();
    }, []);

    const fetchEntities = async () => {
        const { data } = await getEntities();
        setEntities(data);
    };

    const handleCreateEntity = async () => {
        const name = prompt('Enter entity name:');
        const fields = prompt('Enter fields (comma separated, format: name:type):').split(',').map(field => {
            const [fieldName, fieldType] = field.split(':');
            return { fieldName, fieldType: fieldType.charAt(0).toUpperCase() + fieldType.slice(1) };
        });
        await createEntity({ name, fields });
        fetchEntities();
    };

    const handleEntitySelect = async (entity) => {
        setCurrentEntity(entity);
        const { data } = await getRecords(entity.name);
        setRecords(data);
    };

    const handleCreateRecord = async () => {
        await createRecord(currentEntity.name, newRecord);
        setNewRecord({});
        handleEntitySelect(currentEntity);
    };

    const handleSaveUpdate = async (id) => {
        await updateRecord(currentEntity.name, id, editingRecordData);
        setEditingRecordId(null);
        setEditingRecordData({});
        handleEntitySelect(currentEntity);
    };

    const handleEditRecord = (record) => {
        setEditingRecordId(record._id);
        setEditingRecordData(record);
    };

    const handleDeleteRecord = async (id) => {
        await deleteRecord(currentEntity.name, id);
        handleEntitySelect(currentEntity);
    };

    return (
        <div className='app'>
            <h1>Headless CMS</h1>
            <div className='btn'>
            <button  onClick={handleCreateEntity}>Click me to Create Entity</button>

            </div>
            <div className='entity'>
                <h1>ENTITIES YOU HAVE CREATED</h1>
                <ul>
                    {entities.map(entity => (
                        <li key={entity._id} onClick={() => handleEntitySelect(entity)}>
                            {entity.name}
                        </li>
                    ))}
                </ul>
            </div>
            {currentEntity && (
                <div className='curentity'>
                    <h2>Entity name: {currentEntity.name}</h2>
                    <div className='eninput'>
                        {currentEntity.fields.map(field => (
                            <input
                                key={field.fieldName}
                                placeholder={field.fieldName}
                                value={newRecord[field.fieldName] || ''}
                                onChange={(e) => setNewRecord({ ...newRecord, [field.fieldName]: e.target.value })}
                            />
                        ))}
                        <button onClick={handleCreateRecord}>Add Record</button>
                    </div>
                    <div className='record'>
                        <h2>Records</h2>
                        <table>
                            <thead>
                                <tr>
                                    {currentEntity.fields.map(field => (
                                        <th key={field.fieldName}>{field.fieldName}</th>
                                    ))}
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map(record => (
                                    <tr key={record._id}>
                                        {currentEntity.fields.map(field => (
                                            <td key={field.fieldName}>
                                                {editingRecordId === record._id ? (
                                                    <input
                                                        type="text"
                                                        value={editingRecordData[field.fieldName] || ''}
                                                        onChange={(e) =>
                                                            setEditingRecordData({
                                                                ...editingRecordData,
                                                                [field.fieldName]: e.target.value,
                                                            })
                                                        }
                                                    />
                                                ) : (
                                                    record[field.fieldName]
                                                )}
                                            </td>
                                        ))}
                                        <td>
                                            {editingRecordId === record._id ? (
                                                <button onClick={() => handleSaveUpdate(record._id)}>Save</button>
                                            ) : (
                                                <>
                                                    <button onClick={() => handleEditRecord(record)}>Edit</button>
                                                    <button onClick={() => handleDeleteRecord(record._id)}>Delete</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
