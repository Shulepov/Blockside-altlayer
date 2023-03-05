import React, { Fragment, SVGProps } from "react";

const Layout: React.FC<{}> = ({ children }) =>{
  return (
    <div className="bg-indigo-50 min-h-screen">
      <main className="" id="mint">
          {children}
        </main>
    </div>
  );
}

export default Layout;
