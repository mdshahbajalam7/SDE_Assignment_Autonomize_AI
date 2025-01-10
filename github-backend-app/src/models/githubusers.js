const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    id: { type: Number, required: true, unique: true },
    node_id: { type: String },
    avatar_url: { type: String },
    gravatar_id: { type: String, default: "" },
    url: { type: String },
    html_url: { type: String },
    followers_url: { type: String },
    following_url: { type: String },
    gists_url: { type: String },
    starred_url: { type: String },
    subscriptions_url: { type: String },
    organizations_url: { type: String },
    repos_url: { type: String },
    events_url: { type: String },
    received_events_url: { type: String },
    type: { type: String },
    user_view_type: { type: String, default: "public" },
    site_admin: { type: Boolean, default: false },
    name: { type: String },
    company: { type: String, default: null },
    blog: { type: String },
    location: { type: String },
    email: { type: String, default: null },
    hireable: { type: Boolean, default: null },
    bio: { type: String },
    twitter_username: { type: String, default: null },
    public_repos: { type: Number },
    public_gists: { type: Number },
    followers: { type: Number },
    following: { type: Number },
    created_at: { type: Date },
    updated_at: { type: Date },
    friends: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GithubUser", UserSchema);
