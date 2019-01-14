import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import pkg from './package.json'

const createConfig = ({ file, format, minify = false }) => {
  return {
    external: Object.keys(pkg.dependencies),
    input: 'src/index',
    output: { exports: 'named', file, format, name: pkg.name },
    plugins: [babel(), resolve(), minify && uglify()].filter(Boolean),
  }
}

export default [
  createConfig({ file: pkg.browser, format: 'umd' }),
  createConfig({ file: pkg.main, format: 'cjs' }),
  createConfig({ file: pkg.module, format: 'es' }),
]
