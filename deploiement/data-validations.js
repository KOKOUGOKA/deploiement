// validations/userValidations.js
const Joi = require('joi');

const createUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  role: Joi.string().valid('teacher', 'student').required(),
  name: Joi.string().required(),
  email: Joi.string().email().required()
});

const updateUserSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  name: Joi.string(),
  email: Joi.string().email()
});

module.exports = {
  createUserSchema,
  updateUserSchema
};

// validations/courseValidations.js
const Joi = require('joi');

const createCourseSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  teacher: Joi.string().required(), // Assuming teacher ID
  students: Joi.array().items(Joi.string()), // Array of student IDs
  schedule: Joi.array().items(Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday').required(),
    startTime: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')).required(),
    endTime: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')).required()
  }))
});

const updateCourseSchema = Joi.object({
  name: Joi.string(),
  description: Joi.string(),
  teacher: Joi.string(),
  students: Joi.array().items(Joi.string()),
  schedule: Joi.array().items(Joi.object({
    day: Joi.string().valid('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'),
    startTime: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')),
    endTime: Joi.string().pattern(new RegExp('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$'))
  }))
});

module.exports = {
  createCourseSchema,
  updateCourseSchema
};

// middleware/validate.js
const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }
    next();
  };
};

module.exports = validate;

// Utilisation dans les routes
// routes/users.js
const { createUserSchema, updateUserSchema } = require('../validations/userValidations');
const validate = require('../middleware/validate');

router.post('/', validate(createUserSchema), async (req, res) => {
  // ... logique de création d'utilisateur ...
});

router.put('/:id', validate(updateUserSchema), async (req, res) => {
  // ... logique de mise à jour d'utilisateur ...
});
