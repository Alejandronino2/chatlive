import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "auto",
            alignItems:"center",
            paddingLeft: "5%", 
          }}
        >
          <Col md={6}>
            <Stack gap={4}>
              <h2>Iniciar Sesión</h2>

              <Form.Control
                type="email"
                placeholder="Correo"
                onChange={(e) =>
                  updateLoginInfo({ ...loginInfo, email: e.target.value })
                }
                value={loginInfo.email}
              />
              <Form.Control
                type="password"
                placeholder="Contraseña"
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    password: e.target.value,
                  })
                }
                value={loginInfo.password}
              />
              <Button variant="primary" type="submit" disabled={isLoginLoading}>
                {isLoginLoading ? "Iniciando sesión..." : "Ingresar"}
              </Button>

              {loginError?.error && (
                <Alert variant="danger">
                  <b>{`Error al ingresar: ${loginError?.status}`}</b>
                  <p>{loginError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
          <Col md={6} className="text-center">
            <img
              src="https://www.signpost.com/wp-content/uploads/2021/11/call-center-customer-service-tips-scaled.jpeg"
              style={{ maxWidth: "100%", height: "auto",  borderRadius:"20px"}}
            />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
