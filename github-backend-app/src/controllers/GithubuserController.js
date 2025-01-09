const axios = require("axios");
const User = require("../models/githubusers");

// Save user details
const saveUser = async (req, res) => {
  const { username } = req.body;

  try {
    const existingUser = await User.findOne({ username, isDeleted: false });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists in the database." });

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const data = response.data;

    const newUser = new User({
      username: data.login,
      name: data.name,
      location: data.location,
      blog: data.blog,
      bio: data.bio,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
      updated_at: data.updated_at,
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to save user", details: err });
  }
};

// Mark as soft deleted
const deleteUser = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { username },
      { isDeleted: true },
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User soft deleted", user });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete user", details: err });
  }
};

// Update user fields
const updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { username, isDeleted: false },
      updates,
      { new: true }
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to update user", details: err });
  }
};
// // Search users
// const searchUsers = async (req, res) => {
//   const query = req.query;

//   try {
//     const users = await User.find({ ...query, isDeleted: false });
//     res.status(200).json(users);
//     console.log(users);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to search users", details: err });
//   }
// };

const searchUsers = async (req, res) => {
  const { query, isDeleted } = req.query; // Extract query and isDeleted parameters

  // Ensure query parameter exists
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    // Construct the filter object
    const filter = {
      $or: [
        { username: { $regex: query, $options: "i" } }, // Case-insensitive regex search
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
      isDeleted: isDeleted === "false" ? false : true, // Convert isDeleted to a boolean
    };

    // Perform the search query
    const users = await User.find(filter);

    // Return the result
    res.status(200).json(users);
    console.log("Search results:", users);
  } catch (err) {
    res.status(500).json({ error: "Failed to search users", details: err });
  }
};

// Get all users sorted by a field
const getAllUsers = async (req, res) => {
  const { sortBy } = req.query;

  try {
    const users = await User.find({ isDeleted: false }).sort(
      sortBy || "created_at"
    );
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve users", details: err });
  }
};

module.exports = { saveUser, deleteUser, updateUser, searchUsers, getAllUsers };
