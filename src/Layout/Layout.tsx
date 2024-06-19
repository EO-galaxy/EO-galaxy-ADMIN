import styled from "@emotion/styled";
import { HelmetProvider } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";

function Layout() {
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <LayoutStyles className="layout">
        <Header />
        <Outlet />
      </LayoutStyles>
    </HelmetProvider>
  );
}

export default Layout;

const LayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-secondary);
`;
