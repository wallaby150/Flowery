import { Outlet } from "react-router-dom";
import Container from "../containers/Container";
import UserHeader from "../components/Common/Header/UserHeader";

const UserMainLayout = () => {
  return (
    <div className="left-0 top0 p-[-5px]">
      <UserHeader />
      <main>
        <Container>
          <Outlet />
        </Container>
      </main>
    </div>
  );
};

export default UserMainLayout;
