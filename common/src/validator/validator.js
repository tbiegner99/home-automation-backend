/* eslint-disable import/prefer-default-export */
export const assertThatObjectMatchesModel = async (object, model) => {
    await model.validateAsync(object);
};
