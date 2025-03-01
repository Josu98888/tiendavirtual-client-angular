export class User {
    //creaamos el constructor
    constructor(
        public id: number,
        public name: string,
        public lastname: string,
        public email: string,
        public password: string,
        public role: string,
        public image: string,
    ){}
}