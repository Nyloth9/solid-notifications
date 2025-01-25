import withSolid from 'rollup-preset-solid';
import { dts } from "rollup-plugin-dts";
import del from 'rollup-plugin-delete'


export default withSolid({
    input: './index.ts',
    targets: ['esm', 'cjs'],
    plugins: [dts({ tsconfig: "../tsconfig.json" })],
    output: [
        {
            file: './dist/index.esm.js',
            format: 'esm',
            sourcemap: false,
        },
        {
            file: './dist/index.cjs.js',
            format: 'cjs',
            sourcemap: false,
            exports: 'auto',
        },
    ],
});