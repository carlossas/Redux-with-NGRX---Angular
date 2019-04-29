export class IngresoEgreso {

    descripcion: string;
    monto: number;
    tipo: string;
    uid?: string;

    constructor(data: DataObj) {
        this.descripcion = data && data.descripcion || null;
        this.monto = data && data.monto || null;
        this.tipo = data && data.tipo || null;
        // this.uid = data && data.uid || null;
    }

}

interface DataObj {
    descripcion: string;
    monto: number;
    tipo: string;
    uid: string;

}