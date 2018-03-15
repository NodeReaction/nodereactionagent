
// create a package loader that reads packageJson file
// if package json can't be found it tells the user it will try all libraries?
// and returns only the modules it finds and supports
class LibraryLoader {
  // possibly add appId, userId, token for cloud hosted configuration
  constructor() {
    this.initializeLibraries();
    this.loadModules();
  }

  initializeLibraries() {
    this.libraries = [
        {
          name: "mongo",
          packageName: "mongodb-core",
          path: "./modules/mongo",
          module: null,
          loaded: false
        },
        {
          name: "http",
          packageName: "mysql",
          path: "./modules/http",
          module: null,
          loaded: false
        },
        {
          name: "mySql",
          packageName: "mySql",
          path: "./modules/mySql",
          module: null,
          loaded: false
        },
        {
          name: "postreSql",
          packageName: "postreSql",
          path: "./modules/postreSql",
          module: null,
          loaded: false
        },
        {
          name: "fs",
          packageName: "fs",
          path: "./modules/fs",
          module: null,
          loaded: false
        },
        {
          name: "reddis",
          packageName: "reddis",
          path: "./modules/reddis",
          module: null,
          loaded: false
        }
      ];
  }

  loadModules() {
    console.log("loading libraries");
    this.libraries.forEach((library, i) => {
      if (i < 2) {
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
