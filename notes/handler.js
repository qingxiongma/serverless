"use strict";
const DynamoDB = require("aws-sdk/clients/dynamodb");
const client = new DynamoDB.DocumentClient({ region: "us-east-1" });
module.exports.createNote = async (event, context, cb) => {
  const data = JSON.stringify(event.body);
  try {
    const params = {
      TableName: "notes",
      Item: {
        noteid: data.id,
        title: data.title,
        body: data.body,
      },
      ConditionExpression: "attribute_not_exists(noteid)",
    };
    await client.put(params).promise();
    cb(null, {
      statusCode: 201,
      body: JSON.stringify(data),
    });
  } catch (err) {
    cb(null, { statusCode: 500, body: JSON.stringify(err.message) });
  }
};

module.exports.updateNote = async (event) => {
  let noteid = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify("A  note with id " + noteid + " has been updated!"),
  };
};

module.exports.deleteNote = async (event) => {
  let noteid = event.pathParameters.id;
  return {
    statusCode: 200,
    body: JSON.stringify("A  note with id " + noteid + " has been deleted!"),
  };
};

module.exports.getAllNotes = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify("All notes are returned!"),
  };
};
