import { PropsWithChildren } from "react";

import Footer from "components/App/Footer";
import Main from "components/App/Main";

const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="bg-white h-screen">
      <div className="flex flex-col h-screen">
        <Main>
          {props.children}
        </Main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
