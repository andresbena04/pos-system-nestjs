import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: any; // Puedes definir mejor el tipo en función de los datos del token
}
