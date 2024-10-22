const AWS = require('aws-sdk');

class DB {
    constructor() {
        // Initialize the DynamoDB DocumentClient
        this.dynamoDb = new AWS.DynamoDB.DocumentClient();
    }

    // Get all data from a table
    async getAllDatabaseData(tableName) {
        const params = {
            TableName: tableName
        };

        try {
            const data = await this.dynamoDb.scan(params).promise();
            return data.Items;
        } catch (error) {
            throw error;
        }
    }

    // Get all data from a specific table (alias for getAllDatabaseData)
    async getAllData(tableName) {
        return await this.getAllDatabaseData(tableName);
    }

    // Get data by ID
    async getDataById(dataId, tableName) {
        const params = {
            TableName: tableName,
            IndexName: 'id-index', // Ensure the table has a GSI on 'id'
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": dataId
            }
        };

        try {
            const data = await this.dynamoDb.query(params).promise();
            return data.Items;
        } catch (error) {
            throw error;
        }
    }

    // Get data by type
    async getDataByType(dataType, tableName) {
        const params = {
            TableName: tableName,
            IndexName: 'type-index', // Ensure the table has a GSI on 'type'
            KeyConditionExpression: "#type = :type",
            ExpressionAttributeNames: {
                "#type": "type"
            },
            ExpressionAttributeValues: {
                ":type": dataType
            }
        };

        try {
            const data = await this.dynamoDb.query(params).promise();
            return data.Items;
        } catch (error) {
            throw error;
        }
    }

    // Create new data entry
    async create(data, tableName) {
        const params = {
            TableName: tableName,
            Item: data
        };

        try {
            await this.dynamoDb.put(params).promise();
        } catch (error) {
            throw error;
        }
    }

    // Update data by ID
    async update(dataId, updateData, tableName) {
        if (!dataId) {
            throw new Error('Data ID is required');
        }

        const params = {
            TableName: tableName,
            Key: { id: dataId },  // Assuming 'id' is the primary key
            UpdateExpression: "set #data = :data",
            ExpressionAttributeNames: {
                "#data": "data" // replace with the actual fields you want to update
            },
            ExpressionAttributeValues: {
                ":data": updateData
            },
            ReturnValues: "UPDATED_NEW"
        };

        try {
            const data = await this.dynamoDb.update(params).promise();
            return data;
        } catch (error) {
            throw error;
        }
    }

    // Update data by date
    async updateDataByDate(tableName, date, newData) {
        if (!date) {
            throw new Error('Data date is required');
        }

        const params = {
            TableName: tableName,
            IndexName: 'date-index', // Ensure the table has a GSI on 'date'
            KeyConditionExpression: "#date = :date",
            ExpressionAttributeNames: {
                "#date": "date"
            },
            ExpressionAttributeValues: {
                ":date": date
            }
        };

        try {
            const data = await this.dynamoDb.query(params).promise();
            if (data.Items.length === 0) {
                throw new Error('Data not found');
            }
            const key = data.Items[0].id; // assuming 'id' is a primary key
            return await this.update(key, newData, tableName);
        } catch (error) {
            throw error;
        }
    }

    // Delete data by ID
    async deleteById(dataId, tableName) {
        if (!dataId) {
            throw new Error('Data ID is required');
        }

        const params = {
            TableName: tableName,
            Key: { id: dataId }  // Assuming 'id' is the primary key
        };

        try {
            await this.dynamoDb.delete(params).promise();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = DB;
