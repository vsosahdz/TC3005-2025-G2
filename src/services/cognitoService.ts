import AWS,{SecretsManager} from 'aws-sdk';
import crypto from 'node:crypto';
import {
    AWS_REGION,
    COGNITO_CLIENT_ID,
    COGNITO_CLIENT_SECRET
} from '../config';
import User from '../modelsNOSQL/User';

type CognitoAttributes = 'email';

class CognitoService {
    //Atributos
    private config:AWS.CognitoIdentityServiceProvider.Types.ClientConfiguration;
    private cognitoIdentity:AWS.CognitoIdentityServiceProvider;
    //Atributos para conectar con el cliente de Cognito
    private clientId:string=COGNITO_CLIENT_ID;
    private secretHash:string=COGNITO_CLIENT_SECRET;

    //Atributos de clase
    private static _instance:CognitoService;
    //Singleton
    public static get instance():CognitoService{
        return this._instance || (this._instance = new this());
    }
    //Constructor
    public constructor(){
        this.config = {
            region:AWS_REGION,
        };
        this.cognitoIdentity = new AWS.CognitoIdentityServiceProvider(this.config);
    }
    //Metodo para gestionar usuarios

    public async signUpUser(
        email:string,
        password:string,
        userAttributes:{
            Name:CognitoAttributes,
            Value:string
        }[]){
                const params = {
                    ClientId: this.clientId,
                    Password: password,
                    Username: email, 
                    SecretHash:this.hashSecret(email),
                    userAttributes:userAttributes
                }
                try{
                    //Registrar el usuario en Cognito sin validar
                    return await this.cognitoIdentity.signUp(params).promise();
                }catch(error){
                    console.error('Error al registrar el usuario:', error);
                }
    }

    //Verificar el usuario
    public async verifyUser(email:string, code:string){
        const params = {
            ClientId: this.clientId,
            ConfirmationCode: code,
            Username: email,
            SecretHash:this.hashSecret(email)
        }
        try{
            //Verificar el usuario en Cognito
            return await this.cognitoIdentity.confirmSignUp(params).promise();
        }catch(error){
            console.error('Error al verificar el usuario:', error);
        }
    }

    //Metodo auxiliar para obtener el hash del cliente
    private hashSecret(username:string):string{
        return crypto
            .createHmac('SHA256', this.secretHash)
            .update(username+this.clientId)
            .digest('base64')
    }
    
    
}