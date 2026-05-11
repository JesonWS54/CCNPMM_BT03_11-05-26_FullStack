import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connection from "./config/database";
import configViewEngine from "./config/viewEngine";
import apiRoutes from "./routes/api";

// Khởi tạo dotenv để đọc file .env
dotenv.config();

const app = express();
const port = process.env.PORT || 8888;

// 1. Cấu hình CORS (Cho phép ReactJS truy cập API)
app.use(cors());

// 2. Cấu hình để nhận dữ liệu từ Body (JSON và Form dữ liệu)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/api", apiRoutes);

// 3. Cấu hình View Engine và Static Files
configViewEngine(app);

// 4. (Tạm thời) Test thử server bằng một Route cơ bản
app.get("/", (req, res) => {
  res.send("<h1>Hello World với Express và MongoDB!</h1>");
});

// 5. Kết nối Database và khởi động Server
(async () => {
  try {
    // Gọi hàm kết nối từ file config/database.js
    await connection();

    app.listen(port, () => {
      console.log(`>>> Backend Server đang chạy tại cổng: ${port}`);
    });
  } catch (error) {
    console.log(">>> Có lỗi xảy ra khi khởi động Server: ", error);
  }
})();
