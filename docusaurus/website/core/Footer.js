const React = require('react');

const Footer = ({ config }) => {
  const { copyright } = config;

  return (
    <footer className="nav-footer" id="footer">
      <section className="copyright">{copyright}</section>
    </footer>
  );
};

module.exports = Footer;
