/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";

function Error() {
  const navigate = useNavigate();
  return (
    <div css={ErrorStyles}>
      <img src="/logo.png" alt="loading" />
      <p css={TitleStyles}>에러 페이지입니다</p>
      <button css={ButtonStyles} onClick={() => navigate("/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
}

export default Error;

const ErrorStyles = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-secondary);
`;

const TitleStyles = css`
  color: var(--text-primary);
  font-size: 24px;
  font-weight: bold;
`;

const ButtonStyles = css`
  padding: 10px 20px;
  background-color: var(--bg-primary);
  border: none;
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
`;
