import { Model } from "sequelize";

interface CollaboratorProjectAttributes {
    ProjectId: number,
    CollaboratorId: number,
    tasks:string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class CollaboratorProject extends Model<CollaboratorProjectAttributes> implements CollaboratorProjectAttributes {
        ProjectId!: number;
        CollaboratorId!: number;
        tasks!:string;

        static associate(models: any) {
            // define association here           
        }
    }
    CollaboratorProject.init({
        ProjectId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model: 'Project',
                key: 'id'
            }
        },
        CollaboratorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references:{
                model: 'Collaborator',
                key: 'id'
            }
        },
        tasks:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'CollaboratorProject'
    });
    return CollaboratorProject;
}