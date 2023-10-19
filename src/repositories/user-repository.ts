import AWS from "aws-sdk";

export const createUserDynamodb = async (
  username: string,
  password: string
): Promise<any> => {
  AWS.config.update({ region: "ap-southeast-2" });

  const ddb = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    endpoint: "http://localhost:8000/",
  });

  const params = {
    TableName: "User",
    Item: {
      id: { S: "Prikey" },
      Username: { S: username },
      password: { S: password },
    },
  };

  return new Promise((resolve, reject) => {
    ddb.putItem(params, function (err, data) {
      if (err) {
        console.log("Error", err);
        reject(err);
      } else {
        console.log("Success", data);
        resolve("Success");
      }
    });
  });
};
