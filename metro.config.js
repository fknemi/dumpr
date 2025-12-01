const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

const config = {
    transformer: {
        babelTransformerPath: require.resolve('react-native-svg-transformer'),
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    resolver: {
        assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
        sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
    },
};

// First merge the SVG config with default config
const mergedConfig = mergeConfig(defaultConfig, config);

// Then apply NativeWind on top
module.exports = withNativeWind(mergedConfig, { input: './global.css' });
