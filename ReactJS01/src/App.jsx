import { Outlet } from "react-router-dom";
import Header from "./components/layout/header";
import axios from "./util/axios.customize";
import { useContext, useEffect } from "react";
import { AuthContext } from "./components/context/auth.context";
import { Spin } from "antd";

function App() {
  const { setAuth, appLoading, setAppLoading } = useContext(AuthContext);

  useEffect(() => {
    const fetchAccount = async () => {
      setAppLoading(true);
      // Gọi API lấy thông tin user dựa trên token hiện có trong localStorage
      const res = await axios.get(`/v1/api/user`);

      if (res && !res.message) {
        setAuth({
          isAuthenticated: true,
          user: {
            email: res.email,
            name: res.name,
          },
        });
      }
      setAppLoading(false);
    };

    fetchAccount();
  }, []);

  return (
    <div>
      {appLoading === true ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          Loading... {/* Tạm thời dùng chữ Loading thay vì <Spin /> để test */}
        </div>
      ) : (
        <>
          <Header />
          <Outlet />
        </>
      )}
    </div>
  );
}

export default App;
