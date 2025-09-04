import { Request,Response } from "express";
import authService  from "./auth.service";
import { z } from "zod";
const registerSchema = z.object({
  name: z.string(),
email: z.string().email(),  
  password: z.string().min(6),
});

const loginSchma = z.object({
    email : z.string().email(),
      password: z.string(),

})
export async function register(req: Request, res: Response) {
  try {
   
    const data = registerSchema.parse(req.body);

    
    const user = authService.register(data);

   
    res.json({ user });
  } catch (err: any) {
   
    res.status(400).json({ message: err.message });
  }
}
export async function login(req: Request, res: Response) {
  try {
 
    const data = loginSchma.parse(req.body);

  
    const result = authService.login(data.email, data.password);

   
    res.json(result);
  } catch (err: any) {
    
    res.status(400).json({ message: err.message });
  }
}