// class reads packageJson file
// if package json can't be found it tells the user it will only load http
// only modules found in the package json are loaded
const logger = require('./logger.js');
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
        name: "fs",
        moduleName: "fs",
        path: "./modules/fs",
        module: null,
        load: true,
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
        name: "mongo",
        moduleName: "mongodb-core",
        path: "./modules/mongo",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "mongoose",
        moduleName: "mongoose",
        path: "./modules/mongo",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "mySql",
        moduleName: "mysql",
        path: "./modules/mySql",
        module: null,
        load: false,
        loaded: false
      },
      {
        name: "postreSql",
        moduleName: "pg",
        path: "./modules/postreSql",
        module: null,
        load: false,
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
    const packageJsonPath = __dirname + "/../../../package.json";
    let packageJsonExists = fs.statSync(packageJsonPath);
    if (packageJsonExists) {
      const packageJson = require(packageJsonPath);
      const moduleNames = Object.keys(packageJson.dependencies);
      if (moduleNames.length) {
        const uniqueModuleNames = moduleNames.filter((value, index, self) => {
          return self.indexOf(value) === index;
        });
        return this.loadModules(uniqueModuleNames);
      }
    } else {
      logger.logNoPackageJsonDependencies();
    }
  }

  loadModules(moduleNames) {
    logger.log(
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
        logger.logModuleLoaded(library.name)
      }
    });
    return this.libraries;
  }
}

let libraryLoader = new LibraryLoader();

module.exports = libraryLoader;

