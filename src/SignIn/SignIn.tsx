/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { supabase } from "../util/supabase/supabas";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { ERRORMESSAGE } from "../constants";

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = schema.safeParse({ username, password });

    if (!result.success) {
      setError(ERRORMESSAGE.NOT_QULIFY);
      return;
    }

    const { data: user, error } = await supabase.from("users").select("*");

    if (error || !user) {
      setError(ERRORMESSAGE.NOT_QULIFY);
      return;
    }

    if (user[0].username === username && user[0].password === password) {
      setError("");
      navigate("/dashboard");
    } else {
      setError(ERRORMESSAGE.NOT_CORRECT);
    }
  };
  return (
    <div>
      <Helmet>
        <title>SignIn</title>
      </Helmet>
      <main css={MainContainerStyles}>
        <div css={InfoContainerStyles}>
          <img src="/logo-big.png" alt="logo" style={{ width: "200px" }} />
          <h1 css={TitleStyles}>스타트업 세상의 갤럭시, 이오갤럭시</h1>
        </div>
        <form onSubmit={handleLogin} css={FormStyles}>
          <div css={InputContainerStyles}>
            <label css={LabelStyles}>유저 이름</label>
            <input
              css={InputStyles}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div css={InputContainerStyles}>
            <label css={LabelStyles}>비밀번호</label>
            <input
              css={InputStyles}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div css={ErrorText}>{error}</div>}
          <button type="submit" css={ButtonStyles}>
            로그인하기
          </button>
        </form>
      </main>
    </div>
  );
}

export default SignIn;

const MainContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 0 20px;
  box-sizing: border-box;
`;

const InfoContainerStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const TitleStyles = css`
  font-size: 24px;
  color: var(--text-secondary);
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const FormStyles = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputContainerStyles = css`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const LabelStyles = css`
  font-size: 14px;
  color: var(--text-secondary);
`;

const InputStyles = css`
  width: 475px;
  height: 35px;
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  font-size: 16px;
  color: var(--text-secondary);
  :focus {
    outline: none;
    border: 2px solid var(--bg-primary);
  }
  @media (max-width: 768px) {
    width: 305px;
    height: 30px;
  }
`;

const ErrorText = css`
  color: red;
  font-size: 8px;
`;

const ButtonStyles = css`
  width: 100%;
  height: 45px;
  padding: 10px;
  background-color: var(--bg-primary);
  color: var(--text-tertiary);
  font-size: 16px;
  font-weight: 800;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
