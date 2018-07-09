/**
 * @file rollup.config.js rollup config file
 * @author exodia(d_xinxin@163.com)
 */
import babel from 'rollup-plugin-babel';
import {uglify} from 'rollup-plugin-uglify';
import flow from 'rollup-plugin-flow';

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
    flow(),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            modules: false,
            useBuiltIns: true,
            targets: {
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9'
              ]
            }
          }
        ],
        'stage-2'
      ],
      exclude: 'node_modules/**',
      plugins: [
        'transform-object-rest-spread',
        'transform-runtime',
        'external-helpers'
      ],
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
