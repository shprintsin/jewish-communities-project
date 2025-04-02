export default {
  logo: <span>JHC</span>,
  project: {
    link: 'https://github.com/yourusername/yourrepo',
  },
  docsRepositoryBase: 'https://github.com/yourusername/yourrepo',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – JHC'
    }
  },
  primaryHue: 210,
  navigation: {
    prev: true,
    next: true
  },
  footer: {
    text: '© 2024 JHC. All rights reserved.',
  },
} 