// This script scans the DbImages directory and generates an imageMappings.ts file that maps image filenames to require statements for use in React Native.


const fs = require('fs');
const path = require('path');

// Directory containing images that need to be mapped
const imagesDir = path.join(__dirname, '../assets/DbImages');

// Output file for the image mapping
const outputFile = path.join(__dirname, '../src/utils/imageMappings.ts');

// Function to generate the image mapping
function generateImageMap() {
    const files = fs.readdirSync(imagesDir);

    const imports = [];
    const mappings = files.map((file) => {
         // Get the filename without extension
        const key = path.basename(file, path.extname(file));

         // Create a valid variable name
        const importName = `img_${key.replace(/[^a-zA-Z0-9]/g, '')}`;

        imports.push(`const ${importName} = require('../../assets/DbImages/${file}');`);
        return `"${key}": ${importName}`;
    });

    const fileContent = `
${imports.join('\n')}

export const imageMap = {
    ${mappings.join(',\n    ')}
};
`;

    fs.writeFileSync(outputFile, fileContent);
    console.log('Image map generated successfully!');
}

// Run the script
generateImageMap();