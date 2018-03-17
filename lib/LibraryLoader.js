// create a package loader that reads packageJson file
// if package json can't be found it tells the user it will try all libraries?
// and returns only the modules it finds and supports

const fs = require("fs");
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
        load: true,
        loaded: false
      },
      {
        name: "mongo",
        moduleName: "mongoose",
        path: "./modules/mongo",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "http",
        moduleName: "http",
        path: "./modules/http",
        module: null,
        load: true,
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
        load: true,
        loaded: false
      },
      {
        name: "redis",
        moduleName: "redis",
        path: "./modules/redis",
        module: null,
        load: false,
        loaded: false
      }
    ];
  }

  checkPackageJson() {
    //const packageJson = require('../../nodereaction/testapps/doggie/package.json');
    const packageJsonPath = __dirname + "/../../../package.json";
    fs.stat(packageJsonPath,
    err => {
        if(err) {
          console.log(
            "Node Reaction Agent - Library Loader - No modules loaded. PackageJson not found: " + packageJsonPath
          );
        }
        else {
          const packageJson = require(packageJsonPath);
          const moduleNames = Object.keys(packageJson.dependencies);
          if (moduleNames.length) {
            return this.loadModules(moduleNames);
          } else {
            console.log(
              "Node Reaction Agent - Library Loader - no modules loaded. no dependencies found in packageJson"
            );
          }
        }
    })
    
  }

  loadModules(moduleNames) {
    console.log(
      `Node Reaction Agent - Library Loader - check package.json dependencies:\n\t ${moduleNames}\n`
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
      if (library.load) {
        library.module = require(library.path);
        library.loaded = true;
        console.log(
          `Node Reaction Agent - Library Loader - module loaded - ${
            library.name
          }`
        );
      }
    });
    return this.libraries;
  }
}

let libraryLoader = new LibraryLoader();

module.exports = libraryLoader;
