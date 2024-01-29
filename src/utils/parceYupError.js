export const parceYupError = (yupError) => {
	const {inner} = yupError;

	return Array.isArray(inner)
		? inner.reduce((acc, item) => {
				const {path, errors} = item;

				if (!acc.hasOwnProperty(path) && errors.length) {
					acc[path] = errors[0];
				}

				return acc;
		  }, {})
		: {};
};
