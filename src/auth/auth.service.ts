import { User } from "../shared/types";
import { GenericRepository } from "../shared/generic.repository";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

const SECRET = "JWT_SECRET_KEY";

class AuthService extends GenericRepository<User> {
  constructor() {
    super();
    const now = new Date();
    this.create({
      id: uuid(),
      name: "Admin",
      email: "admin@no.com",
      password: bcrypt.hashSync("admin123", 10),
      role: "ADMIN",  
     createdAt: now,
      updatedAt: now,
    });
  }

  register(data: Partial<User>) {
    const now = new Date();
    const user: User = {
      id: uuid(),
      name: data.name!,
      email: data.email!,
      password: bcrypt.hashSync(data.password!, 10),
      role: "STUDENT",
      createdAt: now,
      updatedAt: now,
    };
    return this.create(user);
  }

  login(email: string, password: string) {
    const user = this.items.find(u => u.email === email);
    if (!user) throw new Error("Invalid credentials");
    if (!bcrypt.compareSync(password, user.password)) throw new Error("Invalid credentials");
    const token = jwt.sign({ ...user, password: undefined }, SECRET, { expiresIn: "1h" });
    return { token, user };
  }
}

export default new AuthService();
