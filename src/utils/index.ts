export const capitalizeEachWord = (text: string): string => {
  const words = text.split(' ');

  const capitalizedWords = words.map((word) => {
    if (word.length > 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    return word;
  });

  return capitalizedWords.join(' ');
};

export const truncateString = (text: string, maxLength: number = 40): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};
