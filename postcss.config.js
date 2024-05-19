export default {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 100,
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['html'],
      replace: true,
      mediaQuery: false,
      minPixelValue: 2
    },
  }
}