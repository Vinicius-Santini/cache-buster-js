const fs = require('fs');
const path = require('path');

function generateVersion(outputDir = 'static') {
  try {
    const version = Date.now().toString();
    fs.writeFileSync(path.join(outputDir, 'version.txt'), version);
    console.log(`Generated version.txt with version: ${version}`);
  } catch (error) {
    console.error('Error generating version.txt:', error);
  }
}

module.exports = generateVersion;

