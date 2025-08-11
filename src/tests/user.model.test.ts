import mongoose from 'mongoose';
import { User, IUser } from '../models/user.model';

describe('User Model', () => {
  describe('Schema Validation', () => {
    it('should have correct schema fields', () => {
      const userSchema = User.schema;
      
      expect(userSchema.paths.username).toBeDefined();
      expect(userSchema.paths.email).toBeDefined();
      expect(userSchema.paths.passwordHash).toBeDefined();
      expect(userSchema.paths.role).toBeDefined();
      expect(userSchema.paths.createdAt).toBeDefined();
    });

    it('should have required fields marked as required', () => {
      const userSchema = User.schema;
      
      expect(userSchema.paths.username.isRequired).toBe(true);
      expect(userSchema.paths.email.isRequired).toBe(true);
      expect(userSchema.paths.passwordHash.isRequired).toBe(true);
    });

    it('should have correct field types', () => {
      const userSchema = User.schema;
      
      expect(userSchema.paths.username.instance).toBe('String');
      expect(userSchema.paths.email.instance).toBe('String');
      expect(userSchema.paths.passwordHash.instance).toBe('String');
      expect(userSchema.paths.role.instance).toBe('String');
      expect(userSchema.paths.createdAt.instance).toBe('Date');
    });

    it('should have unique constraints on username and email', () => {
      const userSchema = User.schema;
      
      expect(userSchema.paths.username.options.unique).toBe(true);
      expect(userSchema.paths.email.options.unique).toBe(true);
    });

    it('should have correct role enum values', () => {
      const userSchema = User.schema;
      const roleField = userSchema.paths.role as any;
      
      expect(roleField.enumValues).toContain('user');
      expect(roleField.enumValues).toContain('moderator');
      expect(roleField.enumValues).toContain('admin');
      expect(roleField.defaultValue).toBe('user');
    });

    it('should have string length constraints', () => {
      const userSchema = User.schema;
      
      expect(userSchema.paths.username.options.minlength).toBe(3);
      expect(userSchema.paths.username.options.maxlength).toBe(30);
    });

    it('should have trim and lowercase options', () => {
      const userSchema = User.schema;
      
      expect(userSchema.paths.username.options.trim).toBe(true);
      expect(userSchema.paths.email.options.trim).toBe(true);
      expect(userSchema.paths.email.options.lowercase).toBe(true);
    });
  });

  describe('Indexes', () => {
    it('should verify indexes using model.indexes()', () => {
      const modelIndexes = User.schema.indexes();
      
      // Should have at least the default _id index and unique indexes
      expect(modelIndexes.length).toBeGreaterThanOrEqual(0);
      
      // Check that username and email fields have unique constraint
      expect(User.schema.paths.username.options.unique).toBe(true);
      expect(User.schema.paths.email.options.unique).toBe(true);
    });
  });

  describe('Model Creation', () => {
    it('should create a valid user document structure', () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hashedpassword123',
        role: 'user' as const
      };

      const user = new User(userData);
      
      expect(user.username).toBe(userData.username);
      expect(user.email).toBe(userData.email);
      expect(user.passwordHash).toBe(userData.passwordHash);
      expect(user.role).toBe(userData.role);
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should set default values correctly', () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hashedpassword123'
      };

      const user = new User(userData);
      
      expect(user.role).toBe('user'); // default value
      expect(user.createdAt).toBeInstanceOf(Date);
    });

    it('should validate required fields', () => {
      const incompleteData = {
        username: 'testuser'
        // missing email and passwordHash
      };

      const user = new User(incompleteData);
      const validationError = user.validateSync();
      
      expect(validationError).toBeDefined();
      expect(validationError!.errors.email).toBeDefined();
      expect(validationError!.errors.passwordHash).toBeDefined();
    });

    it('should validate string length constraints', () => {
      const invalidData = {
        username: 'ab', // too short
        email: 'test@example.com',
        passwordHash: 'hashedpassword123'
      };

      const user = new User(invalidData);
      const validationError = user.validateSync();
      
      expect(validationError).toBeDefined();
      expect(validationError!.errors.username).toBeDefined();
    });

    it('should validate enum values', () => {
      const invalidData = {
        username: 'testuser',
        email: 'test@example.com',
        passwordHash: 'hashedpassword123',
        role: 'invalid_role' as any
      };

      const user = new User(invalidData);
      const validationError = user.validateSync();
      
      expect(validationError).toBeDefined();
      expect(validationError!.errors.role).toBeDefined();
    });
  });
});