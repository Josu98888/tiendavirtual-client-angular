export class Product {

    //creamos el consructor
    constructor(
        public id: number,
        public categorieID: number,
        public name: string,
        public description: string,
        public image: string,
        public priceNow: number,
        public priceBefore: number,
        public numSales: number,
        public stock: number,
    ) { }
}