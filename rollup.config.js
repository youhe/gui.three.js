export default {
	input: 'src/GUI.Three.js',
	// sourceMap: true,
	output: [
		{
			format: 'umd',
			name: 'GUITHREE',
			file: 'build/gui.three.js',
			indent: '\t'
		},
		{
			format: 'es',
			file: 'build/gui.three.module.js',
			indent: '\t'
		}
	]
};
