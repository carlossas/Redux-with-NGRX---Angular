


export class User {

    public nombre: string;
    public email: string;
    public uid: string;

    constructor(data: DataObj) {
        this.nombre = data && data.nombre || null;
        this.uid = data && data.uid || null;
        this.email = data && data.email || null;
    }

}

interface DataObj {
    uid: string;
    email: string;
    nombre: string;
}

