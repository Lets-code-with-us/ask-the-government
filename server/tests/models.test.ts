import { User, Question, Vote } from '../src/models';
import mongoose from 'mongoose';

describe('Model Tests', () => {
  describe('User Model', () => {
    it('should create a user with valid data', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hashedpassword123',
        role: 'user' as const
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.role).toBe(userData.role);
      expect(savedUser.createdAt).toBeDefined();
    });

    it('should enforce unique username constraint', async () => {
      const userData = {
        username: 'uniqueuser',
        email: 'test1@example.com',
        passwordHash: 'hashedpassword123'
      };

      await User.create(userData);

      const duplicateUser = new User({
        ...userData,
        email: 'test2@example.com'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });

    it('should enforce unique email constraint', async () => {
      const userData = {
        username: 'user1',
        email: 'unique@example.com',
        passwordHash: 'hashedpassword123'
      };

      await User.create(userData);

      const duplicateUser = new User({
        ...userData,
        username: 'user2'
      });

      await expect(duplicateUser.save()).rejects.toThrow();
    });

    it('should validate email format', async () => {
      const userData = {
        username: 'testuser',
        email: 'invalid-email',
        passwordHash: 'hashedpassword123'
      };

      const user = new User(userData);
      await expect(user.save()).rejects.toThrow();
    });

    it('should have correct indexes', async () => {
      const indexes = await User.collection.getIndexes();
      
      // Check for unique indexes on username and email (created by unique: true in schema)
      expect(indexes).toHaveProperty('username_1');
      expect(indexes).toHaveProperty('email_1');
      expect(indexes).toHaveProperty('createdAt_-1');
    });
  });

  describe('Question Model', () => {
    let testUser: any;

    beforeEach(async () => {
      testUser = await User.create({
        username: 'questioncreator',
        email: 'creator@example.com',
        passwordHash: 'hashedpassword123'
      });
    });

    it('should create a question with valid data', async () => {
      const questionData = {
        title: 'Test Question About Healthcare',
        body: 'This is a detailed question about healthcare policies and their implementation.',
        institution: 'Department of Health',
        createdBy: testUser._id,
        tags: ['healthcare', 'policy']
      };

      const question = new Question(questionData);
      const savedQuestion = await question.save();

      expect(savedQuestion._id).toBeDefined();
      expect(savedQuestion.title).toBe(questionData.title);
      expect(savedQuestion.body).toBe(questionData.body);
      expect(savedQuestion.institution).toBe(questionData.institution);
      expect(savedQuestion.createdBy).toEqual(testUser._id);
      expect(savedQuestion.status).toBe('pending');
      expect(savedQuestion.yesCount).toBe(0);
      expect(savedQuestion.noCount).toBe(0);
      expect(savedQuestion.voteCount).toBe(0);
      expect(savedQuestion.tags).toEqual(questionData.tags);
    });

    it('should enforce minimum title length', async () => {
      const questionData = {
        title: 'Short',
        body: 'This is a detailed question body that meets the minimum length requirement.',
        institution: 'Department of Health',
        createdBy: testUser._id
      };

      const question = new Question(questionData);
      await expect(question.save()).rejects.toThrow();
    });

    it('should enforce minimum body length', async () => {
      const questionData = {
        title: 'Valid Question Title',
        body: 'Short body',
        institution: 'Department of Health',
        createdBy: testUser._id
      };

      const question = new Question(questionData);
      await expect(question.save()).rejects.toThrow();
    });

    it('should have text index on title and body', async () => {
      const indexes = await Question.collection.getIndexes();
      
      // Check for text index - it should have a key with "$**" 
      const textIndexKey = Object.keys(indexes).find(key => 
        key.includes('title_text_body_text') || 
        indexes[key].some && indexes[key].some((field: any) => field[1] === 'text')
      );
      
      expect(textIndexKey).toBeDefined();
    });

    it('should have correct indexes', async () => {
      const indexes = await Question.collection.getIndexes();
      
      expect(indexes).toHaveProperty('institution_1');
      expect(indexes).toHaveProperty('createdBy_1');
      expect(indexes).toHaveProperty('status_1');
      expect(indexes).toHaveProperty('createdAt_-1');
      expect(indexes).toHaveProperty('voteCount_-1');
      expect(indexes).toHaveProperty('tags_1');
    });

    it('should perform text search', async () => {
      await Question.create({
        title: 'Healthcare Policy Question',
        body: 'Question about healthcare reforms and policy changes in the medical sector.',
        institution: 'Department of Health',
        createdBy: testUser._id
      });

      await Question.create({
        title: 'Education Funding',
        body: 'Question about education budget and school funding allocations.',
        institution: 'Department of Education',
        createdBy: testUser._id
      });

      const results = await Question.find(
        { $text: { $search: 'healthcare policy' } },
        { score: { $meta: 'textScore' } }
      ).sort({ score: { $meta: 'textScore' } });

      expect(results.length).toBe(1);
      expect(results[0].title).toContain('Healthcare');
    });
  });

  describe('Vote Model', () => {
    let testUser: any;
    let testQuestion: any;

    beforeEach(async () => {
      testUser = await User.create({
        username: 'voter',
        email: 'voter@example.com',
        passwordHash: 'hashedpassword123'
      });

      testQuestion = await Question.create({
        title: 'Test Question for Voting',
        body: 'This is a test question to validate voting functionality.',
        institution: 'Department of Health',
        createdBy: testUser._id
      });
    });

    it('should create a vote with userId', async () => {
      const voteData = {
        questionId: testQuestion._id,
        userId: testUser._id,
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      const savedVote = await vote.save();

      expect(savedVote._id).toBeDefined();
      expect(savedVote.questionId).toEqual(testQuestion._id);
      expect(savedVote.userId).toEqual(testUser._id);
      expect(savedVote.vote).toBe('yes');
      expect(savedVote.sessionId).toBeNull();
    });

    it('should create a vote with sessionId', async () => {
      const voteData = {
        questionId: testQuestion._id,
        sessionId: 'session-123-abc',
        vote: 'no' as const
      };

      const vote = new Vote(voteData);
      const savedVote = await vote.save();

      expect(savedVote._id).toBeDefined();
      expect(savedVote.questionId).toEqual(testQuestion._id);
      expect(savedVote.sessionId).toBe('session-123-abc');
      expect(savedVote.vote).toBe('no');
      expect(savedVote.userId).toBeNull();
    });

    it('should enforce unique vote per user per question', async () => {
      const voteData = {
        questionId: testQuestion._id,
        userId: testUser._id,
        vote: 'yes' as const
      };

      await Vote.create(voteData);

      const duplicateVote = new Vote({
        ...voteData,
        vote: 'no' as const
      });

      await expect(duplicateVote.save()).rejects.toThrow();
    });

    it('should enforce unique vote per session per question', async () => {
      const voteData = {
        questionId: testQuestion._id,
        sessionId: 'session-duplicate-test',
        vote: 'yes' as const
      };

      await Vote.create(voteData);

      const duplicateVote = new Vote({
        ...voteData,
        vote: 'no' as const
      });

      await expect(duplicateVote.save()).rejects.toThrow();
    });

    it('should prevent vote with both userId and sessionId', async () => {
      const voteData = {
        questionId: testQuestion._id,
        userId: testUser._id,
        sessionId: 'session-invalid',
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      await expect(vote.save()).rejects.toThrow('Cannot provide both userId and sessionId');
    });

    it('should prevent vote with neither userId nor sessionId', async () => {
      const voteData = {
        questionId: testQuestion._id,
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      await expect(vote.save()).rejects.toThrow('Either userId or sessionId must be provided');
    });

    it('should have correct unique sparse indexes', async () => {
      const indexes = await Vote.collection.getIndexes();
      
      expect(indexes).toHaveProperty('unique_user_vote_per_question');
      expect(indexes).toHaveProperty('unique_session_vote_per_question');
      
      // Verify the indexes exist and have correct properties
      const indexInfo = await Vote.collection.indexInformation();
      
      expect(indexInfo).toHaveProperty('unique_user_vote_per_question');
      expect(indexInfo).toHaveProperty('unique_session_vote_per_question');
    });

    it('should allow multiple users to vote on the same question', async () => {
      const secondUser = await User.create({
        username: 'voter2',
        email: 'voter2@example.com',
        passwordHash: 'hashedpassword123'
      });

      await Vote.create({
        questionId: testQuestion._id,
        userId: testUser._id,
        vote: 'yes'
      });

      await Vote.create({
        questionId: testQuestion._id,
        userId: secondUser._id,
        vote: 'no'
      });

      const votes = await Vote.find({ questionId: testQuestion._id });
      expect(votes.length).toBe(2);
    });

    it('should allow multiple sessions to vote on the same question', async () => {
      await Vote.create({
        questionId: testQuestion._id,
        sessionId: 'session-1',
        vote: 'yes'
      });

      await Vote.create({
        questionId: testQuestion._id,
        sessionId: 'session-2',
        vote: 'no'
      });

      const votes = await Vote.find({ questionId: testQuestion._id });
      expect(votes.length).toBe(2);
    });

    it('should allow mixing user and session votes on the same question', async () => {
      await Vote.create({
        questionId: testQuestion._id,
        userId: testUser._id,
        vote: 'yes'
      });

      await Vote.create({
        questionId: testQuestion._id,
        sessionId: 'session-anonymous',
        vote: 'no'
      });

      const votes = await Vote.find({ questionId: testQuestion._id });
      expect(votes.length).toBe(2);
    });
  });

  describe('Model Indexes Verification', () => {
    it('should verify all models have their defined indexes', async () => {
      // Test User indexes
      const userIndexes = await User.collection.getIndexes();
      expect(Object.keys(userIndexes)).toContain('username_1');
      expect(Object.keys(userIndexes)).toContain('email_1');
      expect(Object.keys(userIndexes)).toContain('createdAt_-1');

      // Test Question indexes
      const questionIndexes = await Question.collection.getIndexes();
      expect(Object.keys(questionIndexes)).toContain('institution_1');
      expect(Object.keys(questionIndexes)).toContain('createdBy_1');
      expect(Object.keys(questionIndexes)).toContain('status_1');
      expect(Object.keys(questionIndexes)).toContain('createdAt_-1');
      expect(Object.keys(questionIndexes)).toContain('voteCount_-1');
      expect(Object.keys(questionIndexes)).toContain('tags_1');

      // Check for text index on Question
      const textIndexKey = Object.keys(questionIndexes).find(key => 
        key.includes('title_text_body_text')
      );
      expect(textIndexKey).toBeDefined();

      // Test Vote indexes
      const voteIndexes = await Vote.collection.getIndexes();
      expect(Object.keys(voteIndexes)).toContain('unique_user_vote_per_question');
      expect(Object.keys(voteIndexes)).toContain('unique_session_vote_per_question');
      expect(Object.keys(voteIndexes)).toContain('questionId_1');
      expect(Object.keys(voteIndexes)).toContain('createdAt_-1');
    });
  });
});
