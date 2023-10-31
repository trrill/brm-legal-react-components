export const debounce = (func, delay) => {
	let timerId;
	return (...args) => {
			clearTimeout(timerId);
			timerId = setTimeout(() => {
					func(...args);
			}, delay);
	};
};

export const stringToReactKey = (inputString) => {
  // Convert the string to lowercase
  let key = inputString.toLowerCase();

  // Remove spaces and special characters and replace them with hyphens
  key = key.replace(/[^a-z0-9]/g, '-');

  // Remove consecutive hyphens
  key = key.replace(/-+/g, '-');

  // Remove hyphens from the beginning and end of the string
  key = key.replace(/^-+|-+$/g, '');

  return key;
};
