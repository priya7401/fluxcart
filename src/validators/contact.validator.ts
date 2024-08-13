import Joi from "joi";

export const identifyContactValidator = Joi.object({
  phoneNumber: Joi.string().optional().allow(null),
  email: Joi.string().optional().allow(null).email(),
})
  .or("phoneNumber", "email")
  .custom((value, helpers) => {
    if (value.phoneNumber === null && value.email === null) {
      return helpers.message({
        custom: 'At least one of "phoneNumber" or "email" must not be null.',
      });
    }
    return value;
  }, "At least one non-null value");
