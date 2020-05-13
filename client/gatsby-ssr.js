/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

/* exports.onCreateWebpackConfig = ({ 
    getConfig,
    actions,
 }) => {
    let config = getConfig();

    config.externals = [
        (function () {
            var IGNORES = [
              'electron'
            ];
            return function (context, request, callback) {
              if (IGNORES.indexOf(request) >= 0) {
                return callback(null, "require('" + request + "')");
              }
              return callback();
            };
          })()
    ];

    actions.replaceWebpackConfig(config);
} */