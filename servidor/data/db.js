import mongoose, { mongo } from 'mongoose';
import bcrypt from 'bcrypt';

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
    cliente : mongoose.Types.ObjectId,
    estado : String
});

const usuariosSchema = new mongoose.Schema({
    usuario: String,
    password: String
});

usuariosSchema.pre('save', function(next) {

    if(!this.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(this.password, salt, (error, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
    
});

const Clientes = mongoose.model('clientes', clientesSchema);
const Productos = mongoose.model('productos', productosSchema);
const Pedidos = mongoose.model('pedidos', pedidosSchema);
const Usuarios = mongoose.model('usuarios', usuariosSchema);

export { Clientes, Productos, Pedidos, Usuarios };