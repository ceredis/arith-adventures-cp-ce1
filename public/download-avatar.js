
// This script is for reference only - you should manually download the avatar model
// Execute this script with Node.js to download the avatar
const https = require('https');
const fs = require('fs');

const avatarUrl = 'https://models.readyplayer.me/681445d6b283fcb411bb01b1.glb';
const outputPath = './public/teacher-avatar.glb';

console.log('Downloading avatar model...');
const file = fs.createWriteStream(outputPath);

https.get(avatarUrl, function(response) {
  response.pipe(file);
  
  file.on('finish', function() {
    file.close();
    console.log(`Avatar model downloaded and saved to ${outputPath}`);
  });
}).on('error', function(err) {
  fs.unlink(outputPath);
  console.error('Error downloading avatar:', err.message);
});
