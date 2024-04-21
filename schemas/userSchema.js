// schemas/userSchema.js
const Joi = require('joi');

exports.validateRegistrationBody = (data) => {
  const userSchema = Joi.object({
    username: Joi.string().alphanum().min(5).max(30).required(),
    name: Joi.string().min(5).max(255),
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().min(8).max(255).required()
  });
  return userSchema.validate(data)
};

exports.validateLoginBody = (data) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
  return schema.validate(data)
}

// module.exports = userSchema;
