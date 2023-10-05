export const useCapitalizeText = (text?: string) => {
  let transformedText;

  const capitalizeText = (text: string) => {
    return text
      .split(/(?=[A-Z])/)
      .map((word) =>
        /[a-zA-Z]/.test(word)
          ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          : word
      )
      .join(" ");
  };

  if (text) {
    transformedText = capitalizeText(text);
  }

  const setText = (text: string) => {
    transformedText = capitalizeText(text);

    return transformedText;
  };

  return { transformedText, setText };
};
