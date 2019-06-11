
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      // dynamicImport: true,
      title: 'upload',
      dll: false,
      routes: {
        exclude: [
          /components\//,
          /services\//,
          /models\//
        ],
      },
    }],
  ],
}
