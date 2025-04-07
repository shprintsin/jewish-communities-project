export default {
  logo: <span>Jewish Communities Project</span>,
  project: {
    link: 'https://github.com/shprintsin/jewish-communities-project',
  },
  docsRepositoryBase: 'https://github.com/shprintsin/jewish-communities-project/tree/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Jewish Communities Project'
    }
  },
  primaryHue: 210,
  navigation: {
    prev: true,
    next: true
  },
  footer: {
    text: 'Jewish Communities Project Documentation',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="Jewish Communities Project" />
      <meta property="og:description" content="Documentation for Jewish Communities Project" />
    </>
  ),
} 