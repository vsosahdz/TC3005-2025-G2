import { Model } from "sequelize";

interface CollaboratorAttributes {
    id: number,
    name: string,
    email: string,
    role: string
}

export enum CollaboratorRole {
    ADMIN = 'ADMIN',
    SUPERVISOR = 'SUPERVISOR',
    DEVELOPER = 'DEVELOPER',
    TESTER = 'TESTER',
    CLIENT = 'CLIENT'
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Collaborator extends Model<CollaboratorAttributes> implements CollaboratorAttributes {
        id!: number;
        name!: string;
        email!: string;
        role!: string;

        static associate(models: any) {
            // define association here
            Collaborator.belongsToMany(models.Project, {
                through: 'CollaboratorProject'
            }); 
        }
    }
    Collaborator.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM(...Object.values(CollaboratorRole)),
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Collaborator'
    });
    return Collaborator;
}