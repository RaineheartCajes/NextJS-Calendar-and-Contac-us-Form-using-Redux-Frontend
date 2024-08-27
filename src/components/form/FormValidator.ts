class FormValidator {
  static validateForm(formData: any) {
    const errors: any = {};
    let isValid = true;

    if (!formData.firstname) {
      errors.firstname = 'First name is required';
      isValid = false;
    }

    if (!formData.lastname) {
      errors.lastname = 'Last name is required';
      isValid = false;
    }

    if (!formData.subject) {
      errors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.phoneNumber) {
      errors.phoneNumber = 'Phone number is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    }

    if (!formData.message) {
      errors.message = 'Message is required';
      isValid = false;
    }

    return { errors, isValid };
  }
}

export default FormValidator;
