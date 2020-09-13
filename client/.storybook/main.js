module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    "@storybook/addon-docs",
    "@storybook/addon-backgrounds",
    "@storybook/addon-contexts/register",
    "@storybook/addon-actions",
  ],
};
