import React, { useContext } from "react";
import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { loginApi } from "../util/api";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";
import { ArrowLeftOutlined } from "@ant-design/icons";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const onFinish = async (values) => {
    const { email, password } = values;

    const res = await loginApi(email, password);

    // Kiểm tra mã lỗi (EC === 0 thường là thành công theo chuẩn thầy Trung)
    if (res && res.EC === 0) {
      // 1. Lưu token vào LocalStorage để các lần sau không cần đăng nhập lại
      localStorage.setItem("access_token", res.access_token);

      notification.success({
        message: "LOGIN USER",
        description: "Success",
      });

      // 2. Cập nhật thông tin vào Context để Header thay đổi giao diện ngay lập tức
      setAuth({
        isAuthenticated: true,
        user: {
          email: res?.user?.email ?? "",
          name: res?.user?.name ?? "",
        },
      });

      // 3. Chuyển hướng về trang chủ
      navigate("/");
    } else {
      notification.error({
        message: "LOGIN USER",
        description: res?.EM ?? "error", // EM là Error Message
      });
    }
  };

  return (
    <Row justify={"center"} style={{ marginTop: "30px" }}>
      <Col xs={24} md={16} lg={8}>
        <fieldset
          style={{
            padding: "15px",
            margin: "5px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        >
          <legend>Đăng Nhập</legend>
          <Form
            name="basic"
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </Form.Item>
          </Form>

          <Link to={"/"}>
            <ArrowLeftOutlined /> Quay lại trang chủ
          </Link>
          <Divider />
          <div style={{ textAlign: "center" }}>
            Chưa có tài khoản? <Link to={"/register"}>Đăng ký tại đây</Link>
          </div>
        </fieldset>
      </Col>
    </Row>
  );
};

export default LoginPage;
