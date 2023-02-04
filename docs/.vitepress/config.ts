import { defineConfigWithTheme } from 'vitepress'

export default defineConfigWithTheme({
  title: 'VitePress',
  description: 'Just playing around.',
  lastUpdated: true,
  titleTemplate: ':title - Vitepress',

  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    siteTitle: 'VitePress',
    logo: '/vue.svg',
    nav: [
      { text: 'ES7-ES12', link: '/ecma/' },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' },
      //   ],
      // },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You',
    },
    outlineTitle: '目录',

    sidebar: [
      {
        text: 'Guide',
        // items: [
        //   { text: 'Introduction', link: '/introduction' },
        //   { text: 'Getting Started', link: '/getting-started' },
        // ],
      },
    ],
  },
})
