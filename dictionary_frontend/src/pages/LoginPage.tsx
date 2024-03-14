import { useContext } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import Box from "../components/Box";
import InputField from "../components/InputField";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
  const { user, loginUser, proceedAsGuest } = useContext(AuthContext);
  
  return (
    <>
      <Header value="Online Learner Dictionary"></Header>
      <div
        className="container d-flex flex-row front-layer p-5 gap-5 align-items-center"
        style={{
          justifyContent: "space-evenly",
        }}
      >
        <div className="flex-grow-1">
          <Box
            header="Login"
            content={
              <InputField
                submitButtonText={"Log in"}
                callback={(input) => loginUser(input)}
                fieldlabels={["Username", "Password"]}
                fieldtypes={["text", "password"]}
              />
            }
          />
        </div>
        <div style={{ height: "200px" }}>
          <Button
            action={() => {
              proceedAsGuest();
            }}
            text={user ? "Return to home page" : "Proceed as a guest"}
            buttonHeight={"100%"}
          />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
