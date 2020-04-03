import { Clientes, Productos, Pedidos, Usuarios } from './db';
import { rejects } from 'assert';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config({path: 'variables.env'});

const crearToken = (usuarioLogin, secreto, expiresIn) => {
    const { usuario } = usuarioLogin;
    return jwt.sign({usuario}, secreto, {expiresIn});
};

export const resolvers = {
    Query: {
        // Clientes
        getClientes: (root, {limite, offset}) => {
            return Clientes.find({}).limit(limite).skip(offset);
        },
        getCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findById(id, (error, cliente) => {
                    if (error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        totalClientes : (root) => {
            return new Promise((resolve, object) => {
                Clientes.countDocuments({}, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                })
            });
        },

        // Productos
        obtenerProductos: (root, {limite, offset, stock}) => {
            let filtro = {};

            if (stock) {
                filtro = {stock: {$gt: 0}};
            }

            return Productos.find(filtro).limit(limite).skip(offset);
        },
        obtenerProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Productos.findById(id, (error, producto) => {
                    if (error) rejects(error)
                    else resolve(producto)
                });
            });
        },
        totalProductos : (root) => {
            return new Promise((resolve, object) => {
                Productos.countDocuments({}, (error, count) => {
                    if (error) rejects(error)
                    else resolve(count)
                });
            });
        },

        // Pedidos
        obtenerPedidos: (root, {cliente}) => {
            return new Promise((resolve, object) => {
                Pedidos.find({cliente: cliente}, (error, pedidos) => {
                    if (error) rejects(error)
                    else resolve(pedidos)
                });
            });
        },

        // Graficas
        topClientes: (root) => {
            return new Promise((resolve, object) => {
                Pedidos.aggregate([
                    {
                        $match: {estado: "COMPLETADO"}
                    },
                    {
                        $group: {_id: "$cliente", total: {$sum: "$total"}}
                    },
                    {
                        $lookup: {from: "clientes", localField: "_id", foreignField: "_id", as: "cliente"}
                    },
                    {
                        $sort: {total: -1}
                    },
                    {
                        $limit: 10
                    }
                ], (error, resultado) => {
                    if (error) rejects(error)
                    else resolve(resultado)
                });
            });
        },

        //Usuarios
        obtenerUsuario: (root, args, {usuarioActual}) => {
            if (!usuarioActual) {
                return null;
            }

            return Usuarios.findOne({usuario: usuarioActual.usuario});
        }
    },
    Mutation: {
        // Clientes
        crearCliente: (root, {input}) => {
            const nuevoCliente = new Clientes({
                nombre : input.nombre,
                apellido : input.apellido,
                empresa : input.empresa,
                emails : input.emails,
                edad : input.edad,
                tipo : input.tipo,
                pedidos : input.pedidos
            });

            nuevoCliente.id = nuevoCliente._id;

            return new Promise((resolve, object) => {
                nuevoCliente.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoCliente)
                });
            });
        },
        actualizarCliente: (root, {input}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndUpdate({_id: input.id}, input, {new: true}, (error, cliente) => {
                    if (error) rejects(error)
                    else resolve(cliente)
                });
            });
        },
        eliminarCliente: (root, {id}) => {
            return new Promise((resolve, object) => {
                Clientes.findOneAndDelete({_id: id}, (error) => {
                    if (error) rejects(error)
                    else resolve("Eliminado Correctamente")
                });
            });
        },

        // Productos
        nuevoProducto: (root, {input}) => {
            const nuevoProducto = new Productos({
                nombre: input.nombre,
                precio: input.precio,
                stock: input.stock
            });

            nuevoProducto.id = nuevoProducto._id;

            return new Promise((resolve, object) => {
                nuevoProducto.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoProducto)
                });
            });
        },
        actualizarProducto: (root, {input}) => {
            return new Promise((resolve, object) => {
                Productos.findOneAndUpdate({_id: input.id}, input, {new: true}, (error, producto) => {
                    if (error) rejects(error)
                    else resolve(producto)
                });
            });
        },
        eliminarProducto: (root, {id}) => {
            return new Promise((resolve, object) => {
                Productos.findOneAndDelete({_id: id}, (error) => {
                    if (error) rejects(error)
                    else resolve("Eliminado Correctamente")
                });
            });
        },

        // Pedidos
        nuevoPedido: (root, {input}) => {
            const nuevoPedido = new Pedidos({
                pedido: input.pedido,
                total: input.total,
                fecha: new Date(),
                cliente: input.cliente,
                estado: "PENDIENTE"
            });

            nuevoPedido.id = nuevoPedido._id;

            return new Promise((resolve, object) => {
                nuevoPedido.save((error) => {
                    if (error) rejects(error)
                    else resolve(nuevoPedido)
                });
            });
        },
        actualizarPedido: (root, {input}) => {
            return new Promise((resolve, object) => {
                const { estado } = input;
                let instruccion = '';

                if (estado === "COMPLETADO") {
                    instruccion = "-";
                } else if (estado === "CANCELADO") {
                    instruccion = "+";
                }

                input.pedido.forEach(pedido => {
                    Productos.updateOne({_id: pedido.id}, {
                        "$inc" : {
                            "stock" : `${instruccion}${pedido.cantidad}`
                        }
                    }, (error) => {
                        if (error) return new Error(error);
                    });
                });

                Pedidos.findOneAndUpdate({_id: input.id}, input, {new: true}, (error, pedido) => {
                    if (error) rejects(error)
                    else resolve(pedido)
                });
            });
        },

        // Usuarios
        crearUsuario: async(root, {usuario, password}) => {
            const existe = await Usuarios.findOne({usuario});

            if (existe) {
                throw new Error('El usuario ya existe');
                
            } else {
                const nuevoUsuario = await new Usuarios({
                    usuario,
                    password
                }).save();

                return "Usuario creado";
            }
        },
        autenticarUsuario: async(root, {usuario, password}) => {
            const nombreUsuario = await Usuarios.findOne({usuario});
            
            if (!nombreUsuario) {
                throw new Error('Usuario no encontrado');
            } 

            const passwordCorrecto = await bcrypt.compare(password, nombreUsuario.password);

            if (!passwordCorrecto) {
                throw new Error('Password incorrecto');
            }

            return {
                token: crearToken(nombreUsuario, process.env.SECRETO, '1hr')
            };
        }
    }
};