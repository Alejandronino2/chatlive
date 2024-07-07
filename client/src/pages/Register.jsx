import { useContext } from "react";
import { Alert, Button, Col, Form, Row, Stack } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
      <Row
          style={{
            height: "auto",
            alignItems:"center",
            paddingLeft: "5%", 
          }}
        >
          <Col md={6}>
                <Stack gap={4}>
                  <h2>Register</h2>

                  <Form.Control
                    type="text"
                    placeholder="Name"
                    onChange={(e) =>
                      updateRegisterInfo({ ...registerInfo, name: e.target.value })
                    }
                    value={registerInfo.name}
                  />
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    onChange={(e) =>
                      updateRegisterInfo({ ...registerInfo, email: e.target.value })
                    }
                    value={registerInfo.email}
                  />
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        password: e.target.value,
                      })
                    }
                    value={registerInfo.password}
                  />
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isRegisterLoading}
                  >
                    {isRegisterLoading ? "Creating your account..." : "Register"}
                  </Button>

                  {registerError?.error && (
                    <Alert variant="danger">
                      <b>{`Error status code: ${registerError?.status}`}</b>
                      <p>{registerError?.message}</p>
                    </Alert>
                  )}
                </Stack>
              </Col>
          <Col md={6} className="text-center">
            <img
              src="https://www.signpost.com/wp-content/uploads/2021/11/call-center-customer-service-tips-scaled.jpeg"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "20px" }}
              alt="Imagen de fondo"
            />
          </Col>
            </Row>
      </Form>
    </>
  );
};

export default Register;
