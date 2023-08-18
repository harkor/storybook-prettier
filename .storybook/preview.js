import { renderToStaticMarkup } from 'react-dom/server';
import prettier from 'prettier/standalone';
import HTMLParser from 'prettier/plugins/html';
import { decode } from 'html-entities';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      source: {
        transform: async (src, context) => {
          if (context.component) {
            const html = await prettier.format(decode(renderToStaticMarkup(context.originalStoryFn(context.args, context))), {
              parser: 'html',
              htmlWhitespaceSensitivity: 'ignore',
              plugins: [HTMLParser],
            });
            console.log(html);
            return html;
          }
        },
      },
    },
  },
};

export default preview;
