const { v4: uuid } = require('uuid')
require('colors')
const Tarea = require('./task')

class Tareas{

    _listado = {};
    //se encarga de listar las tareas
    get listadoArr(){
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea)
        });
        return listado;
    }

    constructor(){
        this._listado = {};
    }

    borrarTarea( id = '' ){
        this._listado[id] && delete this._listado[id];
    }

    cargarTareasFromArray( tareas = [] ){
        tareas.forEach((tarea) => this._listado[tarea.id] = tarea);
    }

    crearTarea( desc = '' ){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea
    }
    //id,desc,completadoEn
    listadoCompleto(){
        this.listadoArr.forEach((e,i) => {
            console.log(`\n${e.completadoEn === null ? `${i+1}`.red : `${i+1}`.green}. ${e.desc} :: ${e.completadoEn === null ? 'Pendiente'.red : 'Completado'.green}`);
        });
    }

    listarPendientesCompletadas( completadas = true){
        let cont = 1;
        this.listadoArr.forEach((e) => {
            if (completadas) {
                if (e.completadoEn) {
                    console.log(`\n${`${cont++}.`.green} ${e.desc} :: ${'Completado'.green} :: ${ e.completadoEn.green }`);
                }
            }else{
                if (!e.completadoEn) {
                    console.log(`\n${`${cont++}`.red} ${e.desc} :: ${'Pendiente'.red}`);
                }
            }
        });
    }

    toggleCompletadas( ids = [] ){
        ids.forEach((id) => {
            const tarea = this._listado[id]
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach( tarea => {
            if (!ids.includes(tarea.id)) {
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

module.exports = Tareas;