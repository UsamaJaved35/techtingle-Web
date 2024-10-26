import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-base-300 text-base-content p-4 fixed bottom-0">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - Made with ❤️ by Usama
            Javed.
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
