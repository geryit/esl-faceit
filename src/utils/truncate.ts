const charLimit = 100;

const truncate = (input: string) =>
  input.length > charLimit ? `${input.substring(0, charLimit)}...` : input;

export default truncate;
