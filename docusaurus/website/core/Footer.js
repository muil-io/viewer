const React = require('react');

const Footer = ({ config }) => {
  const {
    baseUrl,
    docsUrl,
    url,
    footerIcon,
    copyright,
    title,
    language,
    repoUrl,
    twitterUsername,
    facebookAppId,
  } = config;

  const docUrl = doc => {
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  };

  const pageUrl = doc => baseUrl + (language ? `${language}/` : '') + doc;

  return (
    <footer className="nav-footer" id="footer">
      <section className="sitemap">
        <a href={baseUrl} className="nav-home">
          {footerIcon && <img src={baseUrl + footerIcon} alt={title} width="66" height="58" />}
        </a>
        <div>
          <h5>Docs</h5>
          <a href={docUrl('getting-started/quickStart')}>Getting Started</a>
          <a href={docUrl('configurations/cli')}>Configurations</a>
          <a href={docUrl('api/sendingEmail')}>API</a>
        </div>
        <div>
          <h5>Community</h5>
          <a href={pageUrl('users.html')}>User Showcase</a>
          <a href="https://stackoverflow.com/questions/tagged/" target="_blank" rel="noreferrer noopener">
            Stack Overflow
          </a>
          <a href="https://discordapp.com/">Project Chat</a>
          <a href="https://twitter.com/" target="_blank" rel="noreferrer noopener">
            Twitter
          </a>
        </div>
        <div>
          <h5>More</h5>
          <a href={`${baseUrl}blog`}>Blog</a>
          <a href="https://github.com/">GitHub</a>
          <a
            className="github-button"
            href={repoUrl}
            data-icon="octicon-star"
            data-count-href="/facebook/docusaurus/stargazers"
            data-show-count="true"
            data-count-aria-label="# stargazers on GitHub"
            aria-label="Star this project on GitHub"
          >
            Star
          </a>
          {twitterUsername && (
            <div className="social">
              <a href={`https://twitter.com/${twitterUsername}`} className="twitter-follow-button">
                {`Follow @${twitterUsername}`}
              </a>
            </div>
          )}
          {facebookAppId && (
            <div className="social">
              <div
                className="fb-like"
                data-href={url}
                data-colorscheme="dark"
                data-layout="standard"
                data-share="true"
                data-width="225"
                data-show-faces="false"
              />
            </div>
          )}
        </div>
      </section>

      <section className="copyright">{copyright}</section>
    </footer>
  );
};

module.exports = Footer;
