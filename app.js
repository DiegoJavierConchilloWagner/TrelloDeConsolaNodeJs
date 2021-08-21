require('colors');
const Tareas = require('./models/tasks');
const { inquirerMenu,
    pause,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList } = require('./helpers/inquirer');
const { guardarDb , leerDb } = require('./helpers/guardarArchivo')

const main = async () => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDb();

    //establecer las tareas
    tareasDb && tareas.cargarTareasFromArray( tareasDb );

    do {
        // Imprimir el menu
        opt = await inquirerMenu();
        // ejecuta la opcion a realizar
        switch (opt) {
            case '1': //Crear opcion
                const desc = await leerInput('Descripcion: ');
                tareas.crearTarea( desc );
                break;
            case '2': //Listar todos
                tareas.listadoCompleto();
                break;
            case '3': //Listar completadas
                tareas.listarPendientesCompletadas(completadas = true);
                break;
            case '4': //Listar pendientes
                tareas.listarPendientesCompletadas(completadas = false);
                break;
            case '5': //Completado | Pendiente
                const ids = await mostrarListadoCheckList( tareas.listadoArr );
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr )
                if (id !== '0' ) {
                    const ok = await confirmar('¿Estas seguro?')
                    ok && (tareas.borrarTarea( id ),console.log('\nTarea Borrada Correctamente'.green));
                }
                break;
        }


        guardarDb( tareas.listadoArr );

        await pause();
    } while (opt !== '0');

}
main()