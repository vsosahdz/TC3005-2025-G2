import Table from './Table';
import attribute from 'dynamode/decorators';
import TableManager from 'dynamode/table';

class User extends Table {
    private static GeneralManager = new TableManager(Table,{
        tableName:'User',
        partitionKey:'pk',
        sortKey:'sk',
    });
    private static _UserManager = User.GeneralManager.entityManager(User);

    // Definir atributos de la tabla
    @attribute.string()
    name: string;
    @attribute.number()
    activeYears: number;

    constructor(props: { pk: string, sk: string,
         name: string, activeYears: number }) {
        super(props);
        this.name = props.name;
        this.activeYears = props.activeYears;
    }

    // método para crear la tabla en AWS
    public static async init(){
        try{
            await User.GeneralManager.createTable();
            console.log('Tabla User creada');
        }catch (error){
            console.error('Error creando la tabla User:', error);
        }
    }
    //getters
    public static get UserManager() {
        return User._UserManager;
    }
}
// Run once
//User.init();

export default User;