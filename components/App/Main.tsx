import { PropsWithChildren } from "react";

import Header from 'components/App/Header';

const Main: React.FC<PropsWithChildren> = (props) => {
  return (
    <div className="bg-white w-full px-4 md:px-4 flex flex-col self-center h-screen lg:w-3/4">
      <Header />
      {props.children}
    </div>
  );
};

export default Main;
