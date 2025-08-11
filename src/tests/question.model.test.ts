import mongoose, { Types } from 'mongoose';
import { Question, IQuestion } from '../models/question.model';
import { User, IUser } from '../models/user.model';

describe('Question Model', () => {
  let testUserId: Types.ObjectId;

  beforeAll(async () => {
    // Create a fake ObjectId for testing
    testUserId = new Types.ObjectId();
  });

  describe('Schema Validation', () => {
    it('should have correct schema fields', () => {
      const questionSchema = Question.schema;
      
      expect(questionSchema.paths.title).toBeDefined();
      expect(questionSchema.paths.body).toBeDefined();
      expect(questionSchema.paths.institution).toBeDefined();
      expect(questionSchema.paths.createdBy).toBeDefined();
      expect(questionSchema.paths.status).toBeDefined();
      expect(questionSchema.paths.yesCount).toBeDefined();
      expect(questionSchema.paths.noCount).toBeDefined();
      expect(questionSchema.paths.voteCount).toBeDefined();
      expect(questionSchema.paths.tags).toBeDefined();
      expect(questionSchema.paths.createdAt).toBeDefined();
      expect(questionSchema.paths.updatedAt).toBeDefined();
    });

    it('should have required fields marked as required', () => {
      const questionSchema = Question.schema;
      
      expect(questionSchema.paths.title.isRequired).toBe(true);
      expect(questionSchema.paths.body.isRequired).toBe(true);
      expect(questionSchema.paths.institution.isRequired).toBe(true);
      expect(questionSchema.paths.createdBy.isRequired).toBe(true);
    });

    it('should have correct field types', () => {
      const questionSchema = Question.schema;
      
      expect(questionSchema.paths.title.instance).toBe('String');
      expect(questionSchema.paths.body.instance).toBe('String');
      expect(questionSchema.paths.institution.instance).toBe('String');
      expect(questionSchema.paths.createdBy.instance).toBe('ObjectId');
      expect(questionSchema.paths.status.instance).toBe('String');
      expect(questionSchema.paths.yesCount.instance).toBe('Number');
      expect(questionSchema.paths.noCount.instance).toBe('Number');
      expect(questionSchema.paths.voteCount.instance).toBe('Number');
      expect(questionSchema.paths.tags.instance).toBe('Array');
    });

    it('should have correct status enum values', () => {
      const questionSchema = Question.schema;
      const statusField = questionSchema.paths.status as any;
      
      expect(statusField.enumValues).toContain('pending');
      expect(statusField.enumValues).toContain('approved');
      expect(statusField.enumValues).toContain('rejected');
      expect(statusField.enumValues).toContain('archived');
      expect(statusField.defaultValue).toBe('pending');
    });

    it('should have string length constraints', () => {
      const questionSchema = Question.schema;
      
      expect(questionSchema.paths.title.options.minlength).toBe(10);
      expect(questionSchema.paths.title.options.maxlength).toBe(200);
      expect(questionSchema.paths.body.options.minlength).toBe(20);
      expect(questionSchema.paths.body.options.maxlength).toBe(2000);
    });

    it('should have default values for count fields', () => {
      const questionSchema = Question.schema;
      const yesCountField = questionSchema.paths.yesCount as any;
      const noCountField = questionSchema.paths.noCount as any;
      const voteCountField = questionSchema.paths.voteCount as any;
      
      expect(yesCountField.defaultValue).toBe(0);
      expect(noCountField.defaultValue).toBe(0);
      expect(voteCountField.defaultValue).toBe(0);
      expect(questionSchema.paths.yesCount.options.min).toBe(0);
      expect(questionSchema.paths.noCount.options.min).toBe(0);
      expect(questionSchema.paths.voteCount.options.min).toBe(0);
    });

    it('should have trim options on text fields', () => {
      const questionSchema = Question.schema;
      
      expect(questionSchema.paths.title.options.trim).toBe(true);
      expect(questionSchema.paths.body.options.trim).toBe(true);
      expect(questionSchema.paths.institution.options.trim).toBe(true);
    });

    it('should have timestamps enabled', () => {
      const questionSchema = Question.schema;
      
      expect(questionSchema.options.timestamps).toBe(true);
    });
  });

  describe('Text Index', () => {
    it('should have text index on title and body', () => {
      const modelIndexes = Question.schema.indexes();
      
      // Find text index in schema
      const textIndex = modelIndexes.find(idx => 
        idx[0].title === 'text' && idx[0].body === 'text'
      );
      
      expect(textIndex).toBeDefined();
    });

    it('should verify all required indexes using model.indexes()', () => {
      const modelIndexes = Question.schema.indexes();
      
      // Should have text index
      const textIndex = modelIndexes.find(idx => 
        idx[0].title === 'text' && idx[0].body === 'text'
      );
      expect(textIndex).toBeDefined();
      
      // Should have status + createdAt compound index
      const statusIndex = modelIndexes.find(idx => 
        idx[0].status === 1 && idx[0].createdAt === -1
      );
      expect(statusIndex).toBeDefined();
      
      // Should have createdBy index
      const createdByIndex = modelIndexes.find(idx => idx[0].createdBy === 1);
      expect(createdByIndex).toBeDefined();
      
      // Should have institution index
      const institutionIndex = modelIndexes.find(idx => idx[0].institution === 1);
      expect(institutionIndex).toBeDefined();
      
      // Should have tags index
      const tagsIndex = modelIndexes.find(idx => idx[0].tags === 1);
      expect(tagsIndex).toBeDefined();
    });
  });

  describe('Model Creation', () => {
    it('should create a valid question document structure', () => {
      const questionData = {
        title: 'Test Question Title',
        body: 'This is a test question body with sufficient length to meet requirements.',
        institution: 'Test Institution',
        createdBy: testUserId,
        tags: ['politics', 'democracy']
      };

      const question = new Question(questionData);

      expect(question.title).toBe(questionData.title);
      expect(question.body).toBe(questionData.body);
      expect(question.institution).toBe(questionData.institution);
      expect(question.createdBy).toEqual(testUserId);
      expect(question.status).toBe('pending'); // default value
      expect(question.yesCount).toBe(0); // default value
      expect(question.noCount).toBe(0); // default value
      expect(question.voteCount).toBe(0); // default value
      expect(question.tags).toEqual(questionData.tags);
    });

    it('should set default values correctly', () => {
      const questionData = {
        title: 'Test Question Title',
        body: 'This is a test question body with sufficient length to meet requirements.',
        institution: 'Test Institution',
        createdBy: testUserId
      };

      const question = new Question(questionData);

      expect(question.status).toBe('pending');
      expect(question.yesCount).toBe(0);
      expect(question.noCount).toBe(0);
      expect(question.voteCount).toBe(0);
      expect(question.tags).toEqual([]);
    });

    it('should validate required fields', () => {
      const incompleteData = {
        title: 'Test Question'
        // missing body, institution, createdBy
      };

      const question = new Question(incompleteData);
      const validationError = question.validateSync();

      expect(validationError).toBeDefined();
      expect(validationError!.errors.body).toBeDefined();
      expect(validationError!.errors.institution).toBeDefined();
      expect(validationError!.errors.createdBy).toBeDefined();
    });

    it('should validate string length constraints', () => {
      const invalidData = {
        title: 'Short', // too short
        body: 'Also short', // too short
        institution: 'Test Institution',
        createdBy: testUserId
      };

      const question = new Question(invalidData);
      const validationError = question.validateSync();

      expect(validationError).toBeDefined();
      expect(validationError!.errors.title).toBeDefined();
      expect(validationError!.errors.body).toBeDefined();
    });

    it('should validate enum values for status', () => {
      const invalidData = {
        title: 'Valid Question Title',
        body: 'This is a valid question body with sufficient length.',
        institution: 'Test Institution',
        createdBy: testUserId,
        status: 'invalid_status' as any
      };

      const question = new Question(invalidData);
      const validationError = question.validateSync();

      expect(validationError).toBeDefined();
      expect(validationError!.errors.status).toBeDefined();
    });

    it('should validate minimum values for count fields', () => {
      const invalidData = {
        title: 'Valid Question Title',
        body: 'This is a valid question body with sufficient length.',
        institution: 'Test Institution',
        createdBy: testUserId,
        yesCount: -1, // negative value should be invalid
        noCount: -1,
        voteCount: -1
      };

      const question = new Question(invalidData);
      const validationError = question.validateSync();

      expect(validationError).toBeDefined();
      expect(validationError!.errors.yesCount).toBeDefined();
      expect(validationError!.errors.noCount).toBeDefined();
      expect(validationError!.errors.voteCount).toBeDefined();
    });

    it('should trim whitespace from text fields and lowercase tags', () => {
      const questionData = {
        title: '  Test Question Title  ',
        body: '  This is a test question body with sufficient length to meet requirements.  ',
        institution: '  Test Institution  ',
        createdBy: testUserId,
        tags: ['  POLITICS  ', '  Democracy  ']
      };

      const question = new Question(questionData);

      expect(question.title).toBe('Test Question Title');
      expect(question.body).toBe('This is a test question body with sufficient length to meet requirements.');
      expect(question.institution).toBe('Test Institution');
      
      // Tags should be trimmed and lowercase
      expect(question.tags[0]).toBe('politics');
      expect(question.tags[1]).toBe('democracy');
    });
  });
});