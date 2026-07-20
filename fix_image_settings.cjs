const fs = require('fs');
let content = fs.readFileSync('src/components/ImageSettingsModal.tsx', 'utf8');

// Change initial state
content = content.replace(
  /announcementImageUrl: '',\s*announcementLinkUrl: '',\s*announcementImageUrl2: '',\s*announcementLinkUrl2: ''/g,
  "imageUrl: '',\n    linkUrl: '',\n    imageUrl2: '',\n    linkUrl2: ''"
);

// Change render calls and inputs
content = content.replace(
  /'announcementImageUrl'/g,
  "'imageUrl'"
);
content = content.replace(
  /settings\.announcementLinkUrl/g,
  "settings.linkUrl"
);
content = content.replace(
  /'announcementImageUrl2'/g,
  "'imageUrl2'"
);
content = content.replace(
  /settings\.announcementLinkUrl2/g,
  "settings.linkUrl2"
);

// Fix handleSave - actually handleSave already has imageUrl: settings.imageUrl etc. We don't need to change it if we changed the state keys!

fs.writeFileSync('src/components/ImageSettingsModal.tsx', content);
