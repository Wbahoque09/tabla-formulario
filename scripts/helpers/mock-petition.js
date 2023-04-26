export const mockPetition = (timeDuration = 1000, fn = () => {}) => {
	return new Promise((resolve) =>
		setTimeout(() => resolve(fn()), timeDuration),
	);
};
