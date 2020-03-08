const React = require('react');
// eslint-disable-next-line import/no-unresolved
const { Container, GridBlock } = require('../../core/CompLibrary.js');

const getFeatures = baseUrl => [
  {
    title: 'Build Email Template',
    content: 'Build your templates using React. Simply inject dynamic properties to each template when sending email.',
    image: `${baseUrl}img/undraw_react.svg`,
    imageAlign: 'top',
  },
  {
    title: 'Add Attachments',
    content: 'Add attachments to email using another templates with dynamic properties.',
    image: `${baseUrl}img/undraw_operating_system.svg`,
    imageAlign: 'top',
  },
  {
    title: 'Build PDF and Images',
    content: 'Build a pdf file or image using React. Simply inject dynamic properties to each file.',
    image: `${baseUrl}img/undraw_operating_system.svg`,
    imageAlign: 'top',
  },
];

const getRows = baseUrl => [
  {
    title: 'Fast and Easy Setup',
    content: 'Easily get a running environment with templates starter kit.',
    image: `${baseUrl}img/undraw_youtube_tutorial.svg`,
    imageAlign: 'right',
    background: 'light',
  },
  {
    title: 'Watch Your Changes Easily',
    content: 'Watch your templates with the dynamic properties on the go.',
    image: `${baseUrl}img/undraw_code_review.svg`,
    imageAlign: 'left',
  },
];

const Hero = ({ siteConfig, language = '' }) => {
  const { baseUrl, docsUrl } = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const SplashContainer = ({ children }) => (
    <div className="homeContainer">
      <div className="homeSplashFade">
        <div className="wrapper homeWrapper">{children}</div>
      </div>
    </div>
  );

  const ProjectTitle = ({ imgSrc, tagline }) => (
    <h1 className="projectTitle hero-title">
      <img className="hero-logo" src={imgSrc} alt="Muil" />
      {tagline}
    </h1>
  );

  return (
    <SplashContainer>
      <div className="inner hero-inner">
        <ProjectTitle
          tagline={siteConfig.tagline}
          title={siteConfig.title}
          imgSrc={`${baseUrl}img/undraw_monitor.svg`}
        />

        <div className="get-started-row">
          <a className="button get-started" href={docUrl('installation.html')}>
            GET STARTED
          </a>
        </div>
      </div>
    </SplashContainer>
  );
};

const Index = ({ config: siteConfig, language = '' }) => {
  const { baseUrl } = siteConfig;

  const Block = ({ id, background, children, layout }) => (
    <Container padding={['bottom', 'top']} id={id} background={background}>
      <GridBlock align="center" contents={children} layout={layout} />
    </Container>
  );

  return (
    <div>
      <Hero siteConfig={siteConfig} language={language} />

      <div className="mainContainer">
        <Block layout="threeColumn">{getFeatures(baseUrl)}</Block>

        {getRows(baseUrl).map(({ background, ...row }) => (
          <Block background={background}>{[row]}</Block>
        ))}
      </div>
    </div>
  );
};

module.exports = Index;
