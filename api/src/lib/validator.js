export const validate = async (
  schema,
  data,
  asyncValidations = [],
  transform = (value) => value,
) => {
  const errors = {};
  const { error, value } = schema.validate(data, { abortEarly: false });

  if (error) {
    error.details.forEach((err) => {
      errors[err.path] = err.message;
    });
  }

  if (!error) {
    for await (const validation of asyncValidations) {
      /** if returns false, is invalid */
      const isInvalid = await validation.validate(value);
      if (isInvalid) {
        errors[validation.name] = validation.message;
      }
    }
  }

  const isValid = Object.keys(errors).length === 0;

  return {
    isValid,
    errors,
    value: transform(value),
  };
};
