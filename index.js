const yup = require("yup");

const imageSchema = yup.object({
  path: yup.string().required(),
});

const schema = yup.object().shape({
  image: imageSchema.notRequired(),
});

function validate(data, { expectedResult }) {
  const result = test(data);
  const pass = JSON.stringify(expectedResult) === JSON.stringify(result);

  console.log(
    "Testing: " +
      JSON.stringify(data) +
      "\nExpected: " +
      JSON.stringify(expectedResult) +
      "\nActual: " + JSON.stringify(result) +
      "\nPass: " + pass +
      "\n"
  );
}

function test(data) {
  try {
    schema.validateSync(data);
    return {}
  } catch (error) {
    return { [error.path]: error.message };
  }
}

// When we pass an image object with a missing field, we expect an error
validate({ image: {} }, { expectedResult: { ["image.path"]: "image.path is a required field" } });

// When we pass an image set to null, we expect no error, as the field is nullable
validate({ image: null }, { expectedResult: {} });

// When we omit the image property, we expect no error
validate({}, { expectedResult: {} });
