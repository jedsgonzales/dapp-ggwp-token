/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreateWebpackConfig = ({ 
    getConfig,
    actions,
 }) => {
    let config = getConfig();

    //config.target = "node";

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

    /* config.resolve = {
        modules: ['./', './src', './node_modules']
    } */

    actions.replaceWebpackConfig(config);
}