/**
 * @file rollup.config.js rollup config file
 * @author exodia(d_xinxin@163.com)
 */
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';

const babelRuntime = [
  'babel-runtime/helpers/defineProperty',
  'babel-runtime/helpers/extends',
  'babel-runtime/core-js/object/get-prototype-of',
  'babel-runtime/helpers/classCallCheck',
  'babel-runtime/helpers/createClass',
  'babel-runtime/helpers/possibleConstructorReturn',
  'babel-runtime/helpers/inherits',
  'babel-runtime/core-js/set',
  'babel-runtime/regenerator',
  'babel-runtime/helpers/asyncToGenerator'
];

const config = {
  input: 'src/index.js',
  output: {
    exports: 'named',
    name: 'ReduxList',
    globals: {
      react: 'React',
      redux: 'Redux',
      'prop-types': 'PropTypes',
      'react-redux': 'ReactRedux'
    }
  },
  plugins: [
    babel({
      exclude: 'node_modules/!**',
      runtimeHelpers: true
    })
  ],
  external: ['react', 'prop-types', 'react-redux', 'redux', 'hoist-non-react-statics', ...babelRuntime],
  watch: {
    include: 'src/**'
  }
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
