import isURL from 'validator/lib/isURL';

export const rules = {
  required: (val: string) => !!val || 'The field is required',
  url: (val: string) => {
    const url = val.trim();
    if (!url) return true;
    return isURL(url) || 'Please enter valid URL';
  },
};
