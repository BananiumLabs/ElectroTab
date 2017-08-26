# Angular2 Starter Template

This is a very simple Angular2 app template to get you started up quickly! It includes styles and components from [Angular2 Materialize]()
for a clean Material Design feel.

### Setup

1: **Clone the repo.** 

```
git clone https://github.com/dbqeo/angular2-starter-template.git
```

If you are starting your own project, then [click here](https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/)
to view instructions on how to import this code into your repo.

2: **Install the dependencies.**
```
npm install
```

That's it for the setup!

### Building and Running

If you want to serve to localhost:
```
ng serve
```

Serving the production build:
```
ng serve --prod
```

If you want to build:
```
ng build --prod --output-hashing=bundles
```

### File Structure

**app.module.ts:**
This is the root module. Here, you may insert global dependencies and root router links. For assets that are required only by one module, import the dependency from that module's file, and not the root.

Declare modules in the `routes` object. 

**app.component:**
This is the part of the site that is not included in routing. This is a great place to include menu bars, global footers, and other items of the sort.

**Module Subfolders:**
Each of these subfolders contains its own module and the components that module will load. These modules will load when a user loads its corresponding router link.

From within the `<modulename>.module.ts` file, you may assign components to their corresponding links. By default these components do not lazy load; however, you can always nest lazy modules within other lazy modules.

**Assets Folder:**
All items in this folder will be compiled. Simply link to them by using the folder that the component is in as the root. (Example: app/home/home-page.component.ts would link to the assets/images folder using '../../assets/images/.) Unnecessary assets in this folder may lead to longer load times.

### Resources

Need help?

[Materialize Documentation](http://materializecss.com/)

[Angular2-Materialize](https://github.com/InfomediaLtd/angular2-materialize)

[Angular2 Documentation](https://angular.io/docs)
