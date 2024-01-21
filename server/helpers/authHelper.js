import bcrypt from "bcrypt";

export const hashedPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashed = await bcrypt.hash(password, saltRound);
    return hashed;
  } catch (err) {
    console.log(err);
  }
};

export const comparePassword = async (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
