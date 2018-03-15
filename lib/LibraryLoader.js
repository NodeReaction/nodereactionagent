// create a package loader that reads packageJson file
// if package json can't be found it tells the user it will try all libraries?
// and returns only the modules it finds and supports
class LibraryLoader {
  // possibly add appId, userId, token for cloud hosted configuration
  constructor() {
    this.initializeLibraries();
    this.checkPackageJson();
  }

  initializeLibraries() {
    this.libraries = [
      {
        name: "mongo",
        moduleName: "mongodb-core",
        path: "./modules/mongo",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "http",
        moduleName: "mysql",
        path: "./modules/http",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "mySql",
        moduleName: "mySql",
        path: "./modules/mySql",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "postreSql",
        moduleName: "postreSql",
        path: "./modules/postreSql",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "fs",
        moduleName: "fs",
        path: "./modules/fs",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "reddis",
        moduleName: "reddis",
        path: "./modules/reddis",
        module: null,
        load: false,
        loaded: false
      }
    ];
  }

  checkPackageJson() {
    const packageJson = require("./../package.json");
    //console.log(packageJson.dependencies);
    const moduleNames = Object.keys(packageJson.dependencies);
    if (moduleNames.length) {
      this.loadModules(moduleNames);
    } else {
      console.log(
        "Node Reaction Agent - no modules loaded. no dependencies found in packageJson"
      );
    }
  }

  loadModules(moduleNames) {
    console.log(
      "Node Reaction Agent - loadModules - moduleNames: ",
      moduleNames
    );
    moduleNames.forEach(moduleName => {
      for (let i = 0; i < this.libraries.length; i++) {
        if (moduleName === this.libraries[i].moduleName) {
          this.libraries[i].load = true;
          break;
        }
      }
    });

    this.libraries.forEach((library, i) => {
      if (i < 2 && library.load) {
        library.module = require(library.path);
        console.log(
          `NodeReaction - Library Loader - module loaded - ${library.name}`
        );
      }
    });
    return this.libraries;
  }
}

let libraryLoader = new LibraryLoader();

module.exports = libraryLoader;
