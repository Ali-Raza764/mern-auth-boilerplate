import User from "../lib/schemas/user.model.mjs";

//* Admin controllers
export const getAllUsers = async (req, res) => {
  const users = await User.find({}).exec();
  if (!users || users.length === 0)
    return res.status(200).send({
      message: "No users in database",
      users: null,
      count: 0,
    });

  return res.status(200).send({
    message: "Users fetched successfully",
    users: users,
  });
};
