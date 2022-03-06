const siteMetadata = {
  title: 'Blog', 
  author: 'Stefan Aleksic',
  headerTitle: 'Stefan Aleksic',
  description: 'A blog about technology, security, censorship resistance, and more.',
  language: 'en-us',
  theme: 'system', // system, dark or light
  siteUrl: 'https://tailwind-nextjs-starter-blog.vercel.app',
  siteRepo: 'https://github.com/ColdSauce/blog',
  siteLogo: '/static/images/logo-dark.png',
  image: '/static/images/avatar.png',
  socialBanner: '/static/images/twitter-card.png',
  email: 'stefan@stefanaleksic.com',
  github: 'https://github.com/coldsauce',
  twitter: 'https://twitter.com/stayfun_',
  linkedin: 'https://www.linkedin.com/in/stefanaleksic',
  locale: 'en-US',
  newsletter: {
    // supports mailchimp, buttondown, convertkit, klaviyo, revue
    // Please add your .env file and modify it according to your selection
    provider: 'buttondown',
  }
}

module.exports = siteMetadata
