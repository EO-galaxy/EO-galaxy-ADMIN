/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

function Header() {
  return (
    <div css={HeaderStyles} >
      <img
        src="/logo.png"
        alt="logo"
        style={{ width: "28px", height: "28px" }}
      />
    </div>
  );
}

export default Header;

const HeaderStyles = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 130px;
  height: 66.2px;
  width: 100vw;
  background-color: var(--bg-secondary);

  position: fixed;
  top: 0;
  left: 0;

  @media (max-width: 768px) {
    padding-left: 15px;
  }
`;
