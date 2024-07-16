var express = require("express");
const mongoose = require("mongoose");
var router = express.Router();
const { MongoClient, ServerApiVersion } = require("mongodb");
const { DataSchema } = require("./fetch");
const uri =
  "mongodb+srv://feskovaksu:DUNKPX9yDnKAiwQu@lampscluster.fpqf2y9.mongodb.net/?retryWrites=true&w=majority&appName=LampsCluster";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const DataModel = mongoose.model("Data", DataSchema);

const sendObject = async (data) => {
  try {
    await client.connect( {
      // retry to connect for 2 times
      reconnectTries: 2,
      // wait 1 second before retrying
      reconnectInterval: 1000
  });
    const newData = new DataModel(data);
    await client
      .db("Lamps")
      .collection("levels")
      .insertOne(data, function (err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });
    return newData;
  } catch (error) {
    client.close();
  } finally {
    client.close();
  }
};

const getLevel = async (data) => {
  try {
    await client.connect({
        // retry to connect for 2 times
        reconnectTries: 2,
        // wait 1 second before retrying
        reconnectInterval: 1000
    });
    console.log("Query: "+data);
    const query = { numberId: data };
    responseData = await client.db("Lamps").collection("levels").findOne(query);
    console.log("Response: "+responseData);
    return responseData;
  } catch (error) {
    client.close();
  } finally {
    client.close();
  }
};
const getMaxCount = async () => {
  try {
    await client.connect({  // retry to connect for 2 times
      reconnectTries: 2,
      // wait 1 second before retrying
      reconnectInterval: 1000});
    let collectionSize = await client
      .db("Lamps")
      .collection("levels")
      .estimatedDocumentCount();
    return collectionSize;
  } catch (error) {
    client.close();
  } finally {
    client.close();
  }
};

module.exports = router;
module.exports = { sendObject, getMaxCount, getLevel };
