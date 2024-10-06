const fs = require('fs');
const path = require('path');

console.log("Cleanup script started.");

// 삭제할 파일 목록 정의
const filesToDelete = [
  'src/App.css',
  'src/index.css',
  'src/logo.svg',
  'src/reportWebVitals.js',
  'src/setupTests.js'
];

// 현재 작업 디렉터리 가져오기
const currentDirectory = process.cwd();

// 파일 삭제 처리
filesToDelete.forEach((file) => {
  const filePath = path.join(currentDirectory, file);
  console.log(`Checking: ${filePath}`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted: ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});

// 불필요한 import 구문 제거
const modifyFiles = [
  {
    file: 'src/App.js',
    patterns: [/import .*App\.css.*\n/, /import .*logo.*\n/]
  },
  {
    file: 'src/index.js',
    patterns: [/import .*index\.css.*\n/]
  }
];

modifyFiles.forEach(({ file, patterns }) => {
  const filePath = path.join(currentDirectory, file);
  console.log(`Modifying: ${filePath}`);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    patterns.forEach((pattern) => {
      content = content.replace(pattern, '');
    });
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Modified: ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
