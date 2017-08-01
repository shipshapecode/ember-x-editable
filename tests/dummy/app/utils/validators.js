const Validators = {
  RequiredString(value) {
    const text = new RegExp(/^[a-zA-Z][a-zA-Z '-]*$/i);
    if (!text.test(value)) {
      return 'Text may only contain \'A-Z\',\'a-z\', spaces, hyphens and apostrophes.';
    }
    return false;
  }
};
export default Validators;
