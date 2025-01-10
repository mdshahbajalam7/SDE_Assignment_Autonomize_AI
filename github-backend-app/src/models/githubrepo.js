const mongoose = require("mongoose");

const RepoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    full_name: { type: String, required: true },
    html_url: { type: String, required: true },
    stargazers_count: { type: Number, required: true },
    watchers_count: { type: Number, required: true },
    forks_count: { type: Number, required: true },
    open_issues_count: { type: Number, required: true },
    language: { type: String, required: true },
    topics: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("GithubRepo", RepoSchema);
