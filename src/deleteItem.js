"use strict";

const AWS = require("aws-sdk");

const deleteItem = async(event) => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    let itemToBeRemoved;

    try {
        const result = await dynamoDB.delete({
            TableName: "ItemTableNew",
            Key: {id},
        }).promise();

        itemToBeRemoved = result.Item;
    } catch (error) {
        console.log(error);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(
            {
                message: `Item ${id} deleted`
            }
        )
    }
}

module.exports = {
    handler:deleteItem
}