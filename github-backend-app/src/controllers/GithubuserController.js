const axios = require("axios");
const User = require("../models/githubusers");
const Repo = require("../models/githubrepo");

// Save user details
// const saveUser = async (req, res) => {
//   const { username } = req.body;

//   try {
//     const existingUser = await User.findOne({ username, isDeleted: false });
//     if (existingUser)
//       return res
//         .status(400)
//         .json({ message: "User already exists in the database." });

//     const response = await axios.get(
//       `https://api.github.com/users/${username}`
//     );
//     const data = response.data;

//     const newUser = new User({
//       username: data.login,
//       name: data.name,
//       location: data.location,
//       blog: data.blog,
//       bio: data.bio,
//       public_repos: data.public_repos,
//       public_gists: data.public_gists,
//       followers: data.followers,
//       following: data.following,
//       created_at: data.created_at,
//       updated_at: data.updated_at,
//     });

//     await newUser.save();
//     res.status(201).json(newUser);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to save user", details: err });
//   }
// };
const saveUser = async (req, res) => {
  const { username } = req.body;

  try {
    // Check if the user already exists and is not marked as deleted
    const existingUser = await User.findOne({ username, isDeleted: false });
    if (existingUser)
      return res
        .status(400)
        .json({ message: "User already exists in the database." });

    // Fetch user data from the GitHub API
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const data = response.data;

    // Create a new user document with all the fields
    const newUser = new User({
      username: data.login,
      id: data.id,
      node_id: data.node_id,
      avatar_url: data.avatar_url,
      gravatar_id: data.gravatar_id,
      url: data.url,
      html_url: data.html_url,
      followers_url: data.followers_url,
      following_url: data.following_url,
      gists_url: data.gists_url,
      starred_url: data.starred_url,
      subscriptions_url: data.subscriptions_url,
      organizations_url: data.organizations_url,
      repos_url: data.repos_url,
      events_url: data.events_url,
      received_events_url: data.received_events_url,
      type: data.type,
      user_view_type: "public", // Default value
      site_admin: data.site_admin,
      name: data.name,
      company: data.company,
      blog: data.blog,
      location: data.location,
      email: data.email,
      hireable: data.hireable,
      bio: data.bio,
      twitter_username: data.twitter_username,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
      created_at: data.created_at,
      updated_at: data.updated_at,
      friends: [], // Default value
      isDeleted: false, // Default value
    });

    // Save the new user to the database
    await newUser.save();

    // Respond with the saved user
    res.status(201).json(newUser);
    // if (newUser?.repos_url) {
    //   const repoResponse = await axios.get(newUser.repos_url);
    //   const repoData = repoResponse.data;
    //   const repoItem = new Repo({
    //     name: repoData.name,
    //     full_name: repoData.full_name,
    //     description: repoData.description,
    //     html_url: repoData.html_url,
    //     stargazers_count: repoData.stargazers_count,
    //     watchers_count: repoData.watchers_count,
    //     forks_count: repoData.forks_count,
    //     open_issues_count: repoData.open_issues,
    //     language: repoData.language,
    //     topics: repoData.topics,
    //     created_at: repoData.created_at,
    //     updated_at: repoData.updated_at,
    //   });
      // for (const repo of repoData) {
      //   const repoItem = new Repo({
      //     name: repo.name,
      //     full_name: repo.full_name,
      //     description: repo.description,
      //     html_url: repo.html_url,
      //     stargazers_count: repo.stargazers_count,
      //     watchers_count: repo.watchers_count,
      //     forks_count: repo.forks_count,
      //     open_issues_count: repo.open_issues,
      //     language: repo.language,
      //     topics: repo.topics,
      //     created_at: repo.created_at,
      //     updated_at: repo.updated_at,

      //     // name: { type: String, required: true },
      //     // html_url: { type: String, required: true },
      //     // stargazers_count: { type: Number, required: true },
      //     // watchers_count: { type: Number, required: true },
      //     // forks_count: { type: Number, required: true },
      //     // open_issues_count: { type: Number, required: true },
      //     // language: { type: String, required: true },
      //     // topics: { type: String, required: true },
      //     // created_at: { type: String, required: true },
      //     // updated_at: { type: String, required: true },
      //   });
      //   await repoItem.save();
      // }
    //   res.status(201).json(repoItem);
    //   // console.log("User saved successfully", newUser?.repos_url);
    // } else {
    //   console.log("error");
    // }
  } catch (err) {
    // Handle errors
    console.error(err.message);
    res
      .status(500)
      .json({ error: "Failed to save user", details: err.message });
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
