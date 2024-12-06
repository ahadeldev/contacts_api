import bcrypt from "bcrypt";

const checkPassword = async (password, dbPassword) => {
  const correctPassword = await bcrypt.compare(password, dbPassword);
  return correctPassword
}

export default checkPassword;