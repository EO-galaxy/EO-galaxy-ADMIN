import { css } from "@emotion/react";

function Loader() {
  return (
    <div css={LoaderStyles}>
      <img src="/logo.png" alt="loading" />
      <p css={TitleStyles}>로딩중...</p>
    </div>
  );
}

export default Loader;

const LoaderStyles = css`
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