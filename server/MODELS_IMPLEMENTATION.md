# Mongoose Models Implementation Summary

## ✅ Completed Features

### 📁 Models Created
All models are located in `src/models/` directory:

#### 1. **User Model** (`src/models/user.model.ts`)
- **Fields**: username, email, passwordHash, role, createdAt
- **Validations**: 
  - Unique username and email
  - Email format validation
  - Password minimum length
  - Role enum validation
- **Indexes**: 
  - Unique indexes on username and email (via schema)
  - Descending index on createdAt

#### 2. **Question Model** (`src/models/question.model.ts`)
- **Fields**: title, body, institution, createdBy, status, yesCount, noCount, voteCount, tags, createdAt, updatedAt
- **Validations**:
  - Title and body length constraints
  - Institution enum validation
  - Status enum validation
  - Positive number constraints for vote counts
- **Indexes**:
  - **Text index on title + body** (with weights: title=10, body=5)
  - Individual indexes on institution, createdBy, status, createdAt, voteCount, tags
  - Compound indexes for common query patterns

#### 3. **Vote Model** (`src/models/vote.model.ts`)
- **Fields**: questionId, userId, sessionId, vote, createdAt
- **Validations**:
  - Vote enum validation (yes/no)
  - Pre-save validation ensuring either userId OR sessionId (not both, not neither)
- **Indexes**:
  - **Unique partial index on (questionId, userId)** - only applies when userId exists
  - **Unique partial index on (questionId, sessionId)** - only applies when sessionId exists
  - Performance indexes on questionId and createdAt

### 🧪 **Comprehensive Testing**
- **22 tests total** - all passing ✅
- Tests cover:
  - Model creation and validation
  - Unique constraint enforcement
  - Index existence verification
  - Text search functionality
  - Unique vote constraints (both user and session-based)
  - Complex scenarios (multiple users/sessions voting)

### 🗂️ **Database Configuration**
- MongoDB connection utilities in `src/database.ts`
- Jest configuration with mongodb-memory-server
- TypeScript configuration for the server
- Automatic index creation on startup

### 📊 **Index Verification**
All required indexes are properly created and verified:
- User: username, email, createdAt indexes
- Question: text search index on title+body, performance indexes
- Vote: unique sparse indexes for vote constraints

## 🚀 Usage Examples

### Creating a User
```typescript
const user = new User({
  username: 'johndoe',
  email: 'john@example.com',
  passwordHash: 'hashedpassword123',
  role: 'user'
});
await user.save();
```

### Creating a Question with Text Search
```typescript
const question = new Question({
  title: 'Healthcare Policy Question',
  body: 'What are the new healthcare regulations?',
  institution: 'Department of Health',
  createdBy: userId,
  tags: ['healthcare', 'policy']
});
await question.save();

// Search questions
const results = await Question.find(
  { $text: { $search: 'healthcare policy' } },
  { score: { $meta: 'textScore' } }
).sort({ score: { $meta: 'textScore' } });
```

### Creating Votes (User or Anonymous)
```typescript
// Registered user vote
const userVote = new Vote({
  questionId: questionId,
  userId: userId,
  vote: 'yes'
});

// Anonymous session vote  
const sessionVote = new Vote({
  questionId: questionId,
  sessionId: 'session-123-abc',
  vote: 'no'
});
```

## 🎯 **Issue Requirements Fulfilled**

✅ **Models exist under src/models**
✅ **Text index on Question.title + Question.body**
✅ **Unique sparse indexes on Vote for (questionId, userId) and (questionId, sessionId)**
✅ **Indexes verified via model .indexes() in tests**
✅ **Basic CRUD operations succeed in unit tests against mongodb-memory-server**

## 📝 **Next Steps**
- Models are ready for integration with API endpoints
- Can be used with GraphQL resolvers
- Ready for production deployment with proper MongoDB instance
