# Contributing

We love contributions from everyone, regardless of your skill level!
If you need any help getting started contributing to an open source project, don't hesistate to contact us at [contact@enumc.com][email]!

This project uses [Semantic Versioning][semver] and abides by the [Contributor Covenant 1.4][covenant].
If you're not familiar with these, please take a moment to skim through them, just to get an idea of the guidelines we follow.

[semver]:http://semver.org/
[covenant]:https://www.contributor-covenant.org/version/1/4/code-of-conduct/
[email]:mailto:contact@enumc.com

We reserve the right to refuse your contribution if you do not follow the above terms.

If you need any assistance, either create a new issue or [join our Discord server.][discord]

[discord]:https://discord.gg/FnvQ6MG

## Contributing Code

### Initialization Checklist
1. Fork the repository.
2. Switch to the **develop** branch. If you work in the master branch, we **will** reject your pull request!
3. If you haven't already, run `npm install`. Make sure that `node_modules` is not tracked by Git.

### Writing Checklist
1. Follow the [Google JavaScript style guide][style]. This isn't strictly enforced, but we may ask you to reformat your code if deemed necessary.
(We're also guilty of illegal formatting. If you catch something that is formatted incorrectly, please create an issue explaining the problem.
2. Document your code using the [JSDoc format][jsdoc]. Again, if you find something documented improperly, please create an issue.
3. If you need extra dependencies, import them at the highest level possible. (From high to low: Current component -> Current module -> Any parent module(s) -> app.module.ts)
If you feel that you absolutely need to import a dependency into `app.module.ts`, [contact us first.][email]
4. When committing, make a descriptive but concise message. We don't expect essays, but `add stuff` just seems a bit inadequate, don't you think?

### Submission Checklist
1. Before submitting, make sure that all of your dependencies match `package.json` and the production build throws no errors (neither compilation nor runtime).
2. Create a pull request to the **develop** branch.
3. Write a good description, and don't forget to add a label and milestone!
4. Make sure that the TravisCI checks pass on your PR. If not, go back to step 1. 
5. Wait for your contribution to be approved! We may contact you with any questions or concerns.

### After Approval
Remember to update the [API Documentation][api] for any new methods, classes, or behaviors! 

[style]: https://google.github.io/styleguide/jsguide.html
[jsdoc]: http://usejsdoc.org/about-getting-started.html
[api]: https://github.com/dbqeo/ElectroTab/wiki

#### Thanks for helping ElectroTab!
