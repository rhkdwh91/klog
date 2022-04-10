import { useState } from "react";
import GoogleLogin from "react-google-login";

export default function GoogleButton() {
  //클라이언트 ID (환경변수)
  const googleClientId: string =
    process.env.REACT_APP_CLIENT_ID ||
    "958226014852-uv0ce09uj1jkved21o7p6pq9skqvppl0.apps.googleusercontent.com";
  //사용자 정보를 담아둘 userObj
  const [userObj, setUserObj] = useState({
    email: "",
    name: "",
  });
  //로그인 성공시 res처리
  const onLoginSuccess = (res: any) => {
    console.log(res);
    setUserObj({
      ...userObj,
      email: res.profileObj.email,
      name: res.profileObj.name,
    });
  };

  return (
    <div>
      <GoogleLogin
        clientId={googleClientId}
        buttonText="Google"
        onSuccess={(result) => onLoginSuccess(result)}
        onFailure={(result) => console.log(result)}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
