import express from "express";
import authRoutes from "./auth/auth.routes";
import userRoutes from "./users/users.routes";
import courseRoutes from "./courses/courses.routes";

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.listen(3000, () => console.log("Server running on http://localhost:3000"));