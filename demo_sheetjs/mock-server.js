// mock-server.js - A simple mock server for member data
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Mock data set - 5 sample members
const mockMembers = [
  {
    memId: "user123",
    memName: "홍길동",
    memPhone3: "1234",
    memSeq: 1,
    gender: "1",  // 1 for male
  },
  {
    memId: "user456",
    memName: "김철수",
    memPhone3: "5678",
    memSeq: 2,
    gender: "1",  // 1 for male
  },
  {
    memId: "user789",
    memName: "이영희",
    memPhone3: "9012",
    memSeq: 3,
    gender: "2",  // 2 for female
  },
  {
    memId: "user101",
    memName: "박민수",
    memPhone3: "3456",
    memSeq: 4,
    gender: "1",  // 1 for male
  },
  {
    memId: "user202",
    memName: "정수연",
    memPhone3: "7890",
    memSeq: 5,
    gender: "2",  // 2 for female
  }
];

// Helper function to generate a random member ID
function generateMemberId() {
  return `user${Math.floor(Math.random() * 1000)}`;
}

// POST endpoint to register a new member
app.post('/api/members', (req, res) => {
  const { name, dateOfBirth, pNumber, gender } = req.body;
  
  console.log('Received member registration:', req.body);
  
  // Find if the name, phone number, and gender match an existing record
  const existingMember = mockMembers.find(m => 
    m.memName === name && m.memPhone3 === pNumber && m.gender === gender
  );
  
  if (existingMember) {
    // Return the existing member data
    return res.json({
      code: 0,
      dt: Date.now(),
      list: [existingMember],
      msg: "기존 회원 정보가 확인되었습니다.",
      success: true
    });
  }
  
  // Create a new member record
  const newMember = {
    memId: generateMemberId(),
    memName: name,
    memPhone3: pNumber,
    memSeq: mockMembers.length + 1,
    gender: gender
  };
  
  // Add to mock database
  mockMembers.push(newMember);
  
  // Return response
  res.json({
    code: 0,
    dt: Date.now(),
    list: [newMember],
    msg: "회원 등록이 완료되었습니다.",
    success: true
  });
});

// GET endpoint to get all members (for testing)
app.get('/api/members', (req, res) => {
  res.json({
    code: 0,
    dt: Date.now(),
    list: mockMembers,
    msg: "회원 목록 조회 완료",
    success: true
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Mock API server running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  POST /api/members - Register a new member');
  console.log('  GET /api/members - Get all members');
});

/*
To run this mock server:
1. Save this file as mock-server.js
2. Make sure Node.js is installed on your system
3. Install required dependencies:
   npm install express cors body-parser
4. Run the server:
   node mock-server.js
   
The server will respond to POST requests at http://localhost:3000/api/members
*/