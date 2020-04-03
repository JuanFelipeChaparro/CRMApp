import mongoose, { mongo } from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/clientes', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

const clientesSchema = new mongoose.Schema({
    nombre : String,
    apellido : String,
    empresa : String,
    emails : Array,
    edad : Number,
    tipo : String,
    pedidos : Array
});

const productosSchema = new mongoose.Schema({
    nombre : String,
    precio : Number,
    stock : Number
});

const pedidosSchema = new mongoose.Schema({
    pedido : Array,
    total : Number,
    fecha : Date,
    cliente : String,
    estado : String
});

const Clientes = mongoose.model('clientes', clientesSchema);
const Productos = mongoose.model('productos', productosSchema);
const Pedidos = mongoose.model('pedidos', pedidosSchema);

export { Clientes, Productos, Pedidos };