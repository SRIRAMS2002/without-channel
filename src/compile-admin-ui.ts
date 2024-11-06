import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import * as path from 'path';

compileUiExtensions({
    outputPath: path.join(__dirname, '../admin-ui'),
    extensions: [
        // Add your extension configuration here
        
    ],
})
    .compile?.()
    .then(() => {
        process.exit(0);
    });
