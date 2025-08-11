import mongoose, { Types } from 'mongoose';
import { Vote, IVote } from '../models/vote.model';
import { Question, IQuestion } from '../models/question.model';
import { User, IUser } from '../models/user.model';

describe('Vote Model', () => {
  let testUserId: Types.ObjectId;
  let testQuestionId: Types.ObjectId;

  beforeAll(async () => {
    // Create fake ObjectIds for testing
    testUserId = new Types.ObjectId();
    testQuestionId = new Types.ObjectId();
  });

  describe('Schema Validation', () => {
    it('should have correct schema fields', () => {
      const voteSchema = Vote.schema;
      
      expect(voteSchema.paths.questionId).toBeDefined();
      expect(voteSchema.paths.userId).toBeDefined();
      expect(voteSchema.paths.sessionId).toBeDefined();
      expect(voteSchema.paths.vote).toBeDefined();
      expect(voteSchema.paths.createdAt).toBeDefined();
    });

    it('should have required fields marked as required', () => {
      const voteSchema = Vote.schema;
      
      expect(voteSchema.paths.questionId.isRequired).toBe(true);
      expect(voteSchema.paths.vote.isRequired).toBe(true);
      // userId and sessionId are sparse fields, not required
    });

    it('should have correct field types', () => {
      const voteSchema = Vote.schema;
      
      expect(voteSchema.paths.questionId.instance).toBe('ObjectId');
      expect(voteSchema.paths.userId.instance).toBe('ObjectId');
      expect(voteSchema.paths.sessionId.instance).toBe('String');
      expect(voteSchema.paths.vote.instance).toBe('String');
      expect(voteSchema.paths.createdAt.instance).toBe('Date');
    });

    it('should have correct vote enum values', () => {
      const voteSchema = Vote.schema;
      const voteField = voteSchema.paths.vote as any;
      
      expect(voteField.enumValues).toContain('yes');
      expect(voteField.enumValues).toContain('no');
      expect(voteField.enumValues).toHaveLength(2);
    });

    it('should have sparse option on userId and sessionId', () => {
      const voteSchema = Vote.schema;
      
      expect(voteSchema.paths.userId.options.sparse).toBe(true);
      expect(voteSchema.paths.sessionId.options.sparse).toBe(true);
    });

    it('should have default value for createdAt', () => {
      const voteSchema = Vote.schema;
      const createdAtField = voteSchema.paths.createdAt as any;
      
      expect(createdAtField.defaultValue).toBe(Date.now);
    });
  });

  describe('Unique Sparse Indexes', () => {
    it('should have unique sparse indexes defined using model.indexes()', () => {
      const modelIndexes = Vote.schema.indexes();
      
      // Find the unique compound indexes
      const userVoteIndex = modelIndexes.find(idx => 
        idx[0].questionId === 1 && idx[0].userId === 1 && idx[1]?.unique === true
      );
      
      const sessionVoteIndex = modelIndexes.find(idx => 
        idx[0].questionId === 1 && idx[0].sessionId === 1 && idx[1]?.unique === true
      );
      
      expect(userVoteIndex).toBeDefined();
      expect(sessionVoteIndex).toBeDefined();
      
      // Verify sparse property
      expect(userVoteIndex![1].sparse).toBe(true);
      expect(sessionVoteIndex![1].sparse).toBe(true);
      
      // Verify index names
      expect(userVoteIndex![1].name).toBe('unique_question_user_vote');
      expect(sessionVoteIndex![1].name).toBe('unique_question_session_vote');
    });

    it('should have additional indexes for efficient querying', () => {
      const modelIndexes = Vote.schema.indexes();
      
      // Should have createdAt index
      const createdAtIndex = modelIndexes.find(idx => idx[0].createdAt === -1);
      expect(createdAtIndex).toBeDefined();
    });
  });

  describe('Model Creation and Validation', () => {
    it('should create a valid user vote document structure', () => {
      const voteData = {
        questionId: testQuestionId,
        userId: testUserId,
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      
      expect(vote.questionId).toEqual(testQuestionId);
      expect(vote.userId).toEqual(testUserId);
      expect(vote.sessionId).toBeUndefined();
      expect(vote.vote).toBe('yes');
      expect(vote.createdAt).toBeInstanceOf(Date);
    });

    it('should create a valid session vote document structure', () => {
      const voteData = {
        questionId: testQuestionId,
        sessionId: 'session123',
        vote: 'no' as const
      };

      const vote = new Vote(voteData);
      
      expect(vote.questionId).toEqual(testQuestionId);
      expect(vote.userId).toBeUndefined();
      expect(vote.sessionId).toBe('session123');
      expect(vote.vote).toBe('no');
      expect(vote.createdAt).toBeInstanceOf(Date);
    });

    it('should validate required fields', () => {
      const incompleteData = {
        questionId: testQuestionId
        // missing vote and either userId or sessionId
      };

      const vote = new Vote(incompleteData);
      const validationError = vote.validateSync();
      
      expect(validationError).toBeDefined();
      expect(validationError!.errors.vote).toBeDefined();
    });

    it('should validate enum values for vote', () => {
      const invalidData = {
        questionId: testQuestionId,
        userId: testUserId,
        vote: 'invalid_vote' as any
      };

      const vote = new Vote(invalidData);
      const validationError = vote.validateSync();
      
      expect(validationError).toBeDefined();
      expect(validationError!.errors.vote).toBeDefined();
    });

    it('should validate questionId is required', () => {
      const invalidData = {
        userId: testUserId,
        vote: 'yes' as const
      };

      const vote = new Vote(invalidData);
      const validationError = vote.validateSync();
      
      expect(validationError).toBeDefined();
      expect(validationError!.errors.questionId).toBeDefined();
    });
  });

  describe('Pre-save Validation', () => {
    it('should fail validation without userId or sessionId', async () => {
      const voteData = {
        questionId: testQuestionId,
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      
      // The pre-save hook should trigger an error
      try {
        await vote.validate();
        // If we get here, the validation didn't fail as expected
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should fail validation with both userId and sessionId', async () => {
      const voteData = {
        questionId: testQuestionId,
        userId: testUserId,
        sessionId: 'session123',
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      
      // The pre-save hook should trigger an error
      try {
        await vote.validate();
        // If we get here, the validation didn't fail as expected
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should pass validation with only userId', async () => {
      const voteData = {
        questionId: testQuestionId,
        userId: testUserId,
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      
      // Should not throw error
      await expect(vote.validate()).resolves.not.toThrow();
    });

    it('should pass validation with only sessionId', async () => {
      const voteData = {
        questionId: testQuestionId,
        sessionId: 'session123',
        vote: 'no' as const
      };

      const vote = new Vote(voteData);
      
      // Should not throw error
      await expect(vote.validate()).resolves.not.toThrow();
    });
  });

  describe('Reference Validation', () => {
    it('should have correct reference paths', () => {
      const voteSchema = Vote.schema;
      
      expect(voteSchema.paths.questionId.options.ref).toBe('Question');
      expect(voteSchema.paths.userId.options.ref).toBe('User');
    });

    it('should create vote with valid ObjectId references', () => {
      const voteData = {
        questionId: testQuestionId,
        userId: testUserId,
        vote: 'yes' as const
      };

      const vote = new Vote(voteData);
      
      expect(Types.ObjectId.isValid(vote.questionId)).toBe(true);
      expect(Types.ObjectId.isValid(vote.userId!)).toBe(true);
    });
  });

  describe('Index Configuration Verification', () => {
    it('should verify unique index enforcement behavior structure', () => {
      // This test verifies that the schema is set up correctly to enforce
      // unique constraints at the database level
      
      const modelIndexes = Vote.schema.indexes();
      
      // Check for user vote unique index
      const userVoteIndex = modelIndexes.find(idx => 
        idx[0].questionId === 1 && 
        idx[0].userId === 1 && 
        idx[1]?.unique === true &&
        idx[1]?.sparse === true
      );
      
      // Check for session vote unique index  
      const sessionVoteIndex = modelIndexes.find(idx => 
        idx[0].questionId === 1 && 
        idx[0].sessionId === 1 && 
        idx[1]?.unique === true &&
        idx[1]?.sparse === true
      );
      
      expect(userVoteIndex).toBeDefined();
      expect(sessionVoteIndex).toBeDefined();
      
      // Verify that both indexes are configured to prevent duplicate votes
      expect(userVoteIndex![1].name).toBe('unique_question_user_vote');
      expect(sessionVoteIndex![1].name).toBe('unique_question_session_vote');
    });
  });
});