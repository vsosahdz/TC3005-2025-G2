import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { 
    AWS_REGION,AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN }
from "../config";

//Inicializa el cliente de DynamoDB
const dynamodb = new DynamoDB({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        //Unicamente para AWS Academy u otro entorno que requiera session token
        sessionToken: AWS_SESSION_TOKEN
    }
});

export default dynamodb;