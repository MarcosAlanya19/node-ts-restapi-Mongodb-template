import { Request } from 'express';
import { Document } from 'mongoose';
import { encrypt } from '../helpers';
import { IUserGet, IUserPost } from '../interface';
import { User } from '../models';

/**
 * Obtiene una lista de todos los usuarios
 * @param req Objeto Request de Express
 * @returns Una tupla con el número total de usuarios y un arreglo de usuarios
 */
export const getAllUsers = async (req: Request): Promise<[number, IUserGet[]]> => {
  // Obtiene los parámetros de paginación de la petición
  const { limit = 2, from = 0 } = req.query;

  // Ejecuta dos consultas en paralelo: una para obtener el número total de usuarios
  // y otra para obtener un arreglo de usuarios paginados
  const response = await Promise.all([
    User.countDocuments({ state: true }),
    User.find({ state: true }).skip(+from).limit(+limit),
  ]);

  return response;
};

/**
 * Crea un nuevo usuario en la base de datos
 * @param req Objeto IUserPost con los datos del usuario a crear
 * @returns El objeto IUserPost del usuario creado
 */
export const createNewUser = async (req: IUserPost): Promise<IUserPost> => {
  // Extrae los datos del usuario del objeto IUserPost recibido
  const { email, name, password, role } = req;

  // Crea un nuevo objeto User con los datos del usuario
  const user = new User({ email, name, password, role });

  // Encripta la contraseña del usuario y la asigna al objeto User
  user.password = await encrypt(password);

  // Guarda el objeto User en la base de datos
  await user.save();

  return user;
};

/**
 * Actualiza un usuario existente en la base de datos
 * @param req Objeto Request de Express con los datos del usuario a actualizar
 * @returns El objeto Document del usuario actualizado o null si no se encuentra
 */
export const updateUserById = async (req: Request): Promise<Document | null> => {
  // Extrae el ID del usuario de los parámetros de la petición
  const { id } = req.params;

  // Extrae los datos del usuario a actualizar del objeto Request
  const { _id, password, google, correo, ...rest } = req.body;

  // Si se ha proporcionado una nueva contraseña, la encripta y la asigna al objeto User
  if (password) {
    rest.password = await encrypt(password);
  }

  // Busca y actualiza el usuario en la base de datos
  const response = await User.findByIdAndUpdate(id, rest);

  return response;
};

/**
 * Elimina un usuario de la base de datos
 * @param req Objeto Request de Express con el ID del usuario a eliminar
 */
export const deleteUserById = async (req: Request) => {
  // Extrae el ID del usuario de los parámetros de la petición
  const { id } = req.params;

  // Actualiza el estado del usuario a 'false' para indicar que ha sido eliminado
  const user = await User.findByIdAndUpdate(id, { state: false });
  return user;
};
