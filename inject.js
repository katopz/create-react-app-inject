#!/usr/bin/env node

var script = process.argv[2];
var path = require('path');
var fs = require('fs');
var args = process.argv.slice(3);

try {
    // Init
    console.log('Inject : ' + script);
    var uri = path.join(__dirname, 'node_modules/react-scripts/config/webpack.config.' + (args[0] ? args[0] : 'prod') + '.js');
    console.log('Target : ' + uri);
    var source = fs.readFileSync(uri).toString();

    switch (script) {
        case 'devtool':
            var content = "devtool: " + (args[1] ? "'" + args[1] + "'" : "'cheap-module-source-map'");
            // Replace
            source = source.replace(/devtool:\s'([^' ]+)'/g, content);
            break;
        case 'react-lite':
            var content = "\n      // Support react-lite\n      // https://github.com/Lucifier129/react-lite\n      'react': 'react-lite',\n      'react-dom': 'react-lite',";
            var isExist = (source.indexOf(content) > -1);

            if (args[1] === '-u') {
                // DRY 
                if (!isExist) {
                    console.log('Result : Already uninjected.');
                    process.exit();
                }

                // Remove
                source = source.replace(content, '');
            } else {
                // DRY
                if (isExist) {
                    console.log('Result : Already injected.');
                    process.exit();
                }

                // Insert
                source = source.replace(/alias:\s{/g, "$&" + content);
            }

            break;
        default:
            console.log('Unknown script "' + script + '".');
            process.exit();
            break;
    }

    fs.writeFileSync(uri, source);

    // Result
    console.log('Result : Success');
    process.exit();
} catch (err) {
    console.log('Result : Error - ' + err);
    process.exit(1);
} 
