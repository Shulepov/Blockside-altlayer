import React, { Fragment, SVGProps } from "react";

const Layout: React.FC<{}> = ({ children }) =>{
  return (
    <div className="bg-indigo-50 min-h-screen">
      <main className="" id="mint">
          {children}
        </main>
        <footer className="flex flex-row justify-center w-full py-4">
          <a href="https://twitter.com/blockside_club" target="_blank" className="text-cyan-600 hover:text-cyan-800">Twitter</a>
        </footer>
    </div>
  );
}

export default Layout;
