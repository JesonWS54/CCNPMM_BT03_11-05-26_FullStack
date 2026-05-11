import express from "express";
import {
  postCreateUser,
  postLogin,
  getUsers,
  getAccount,
} from "../controllers/userController";

const routerAPI = express.Router();

// Các API cũ
routerAPI.post("/register", postCreateUser);
routerAPI.post("/login", postLogin);

// THÊM MỚI: API lấy danh sách người dùng và thông tin tài khoản
// Lưu ý: Route này thường cần Middleware xác thực (auth), nhưng để test trước bạn có thể viết thế này:
routerAPI.get("/user", getUsers);

export default routerAPI;
