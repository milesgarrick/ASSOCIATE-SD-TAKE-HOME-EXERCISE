import petProject from '../data/petproject.json' assert { type: 'json' };
import petSanctuary from '../data/petsanctuary.json' assert { type: 'json' };

/**
 * Loads data from Pet Project and Pet Sanctuary data sources.
 *
 * @returns {Animal[]} List of animals sorted by type and then kennel size.
 */
export function loadData() {
  const shelterData = mergeAndSortData(petProject, petSanctuary);

  return shelterData;
}

/**
 * Sorts by Dog then Cat, then sorts by kennel size if same type.
 *
 * @param {Animal} a
 * @param {Animal} b
 * @returns {Animal}
 */
function sortFunction(a, b) {
  console.log(a.type, b.type);
  if (a.type === b.type) {
    return compareKennelSize(a, b);
  } else if (a.type === 'Dog') {
    console.log(a.name + '>' + b.name);
    return -1;
  } else {
    console.log(b.name + '>' + a.name);
    return 1;
  }
}

/**
 * Sorts from small to large.
 *
 * @param {Animal} a
 * @param {Animal} b
 * @returns {Animal}
 */
function compareKennelSize(a, b) {
  if (a.kennelSize === 'Small') return -1;
  else if (b.kennelSize === 'Small') return 1;
  else if (a.kennelSize === 'Medium') return -1;
  else if (b.kennelSize === 'Medium') return 1;
  else return -1;
}

/**
 * @TODO Write this function
 *
 * Merges data from both sources and sorts it first by animal type (cat/dog) and
 * then by kennel size.
 *
 * Any missing data should be replaced with the string "Unknown".
 *
 * @param {PetProject} petProject
 * @param {PetSanctuary} petSanctuary
 * @returns {Animal[]}
 */

/**
 * Maps kennel IDs to sizes, then iterates through the array, storing values and
 * applying title case.
 *
 * @param {PetProject} petProject
 * @returns {Animal[]}
 */
function transformPetProjectData(petProject) {
  const animals = [];
  const kennelMap = new Map([
    [1, 'small'],
    [2, 'small'],
    [3, 'small'],
    [4, 'medium'],
    [5, 'medium'],
    [6, 'large'],
  ]);
  petProject.animals.forEach((e) => {
    var newType = e.type.charAt(0).toUpperCase() + e.type.slice(1);
    var newName = e.name.charAt(0).toUpperCase() + e.name.slice(1);
    var newBreed = e.breed.charAt(0).toUpperCase() + e.breed.slice(1);
    var newKennelSize =
      kennelMap.get(e.kennelId).charAt(0).toUpperCase() +
      kennelMap.get(e.kennelId).slice(1);
    var animal = {
      type: newType,
      name: newName,
      breed: newBreed,
      kennelSize: newKennelSize,
    };
    animals.push(animal);
  });
  return animals;
}

function transformPetSanctuaryData(petSanctuary) {
  const animals = [];
  let kennels = Object.entries(petSanctuary.shelter);
  kennels.forEach((kennel) => {
    var newType;
    var newName;
    var newBreed;
    var newKennelSize = kennel[1].size;
    if (kennel[1].animal) {
      newType = kennel[1].animal.species;
      newName = kennel[1].animal.name;
      if (kennel[1].animal.breed) {
        newBreed = kennel[1].animal.breed;
      } else {
        newBreed = 'Unknown';
      }
    } else {
      //Accounts for potential typo in the animal key
      newType = kennel[1].animals.species;
      newName = kennel[1].animals.name;
      if (kennel[1].animals.breed) {
        newBreed = kennel[1].animals.breed;
      } else {
        newBreed = 'Unknown';
      }
    }

    newType = newType.charAt(0).toUpperCase() + newType.slice(1);
    newName = newName.charAt(0).toUpperCase() + newName.slice(1);
    newBreed = newBreed.charAt(0).toUpperCase() + newBreed.slice(1);
    newKennelSize =
      newKennelSize.charAt(0).toUpperCase() + newKennelSize.slice(1);
    var animal = {
      type: newType,
      name: newName,
      breed: newBreed,
      kennelSize: newKennelSize,
    };

    animals.push(animal);
  });
  return animals;
}

function mergeAndSortData(petProject, petSanctuary) {
  const petProjectTransformed = transformPetProjectData(petProject);
  const petSanctuaryTransformed = transformPetSanctuaryData(petSanctuary);

  const allAnimals = petProjectTransformed
    .concat(petSanctuaryTransformed)
    .sort(sortFunction);
  console.log(allAnimals);

  return petProjectTransformed
    .concat(petSanctuaryTransformed)
    .sort(sortFunction);
}

/**
 * @TODO Check for bugs
 *
 * Transforms a Pet Sanctuary kennel object into our animal object.
 *
 * @param {PetSanctuaryKennel} kennel
 * @returns {Animal}
 */
function transformPetSanctuary(kennel) {
  const animal = {};
  animal.type = kennel.animal.type.toLowerCase();
  animal.name = kennel.animal.name;
  animal.breed = kennel.animal.breed.toLowerCase();
  animal.kennelSize = kennel.size;
  return animal;
}

// #region Types
/**
 * @typedef {Object} PetProject
 * @property {PetProjectKennel[]} kennels
 * @property {PetProjectAnimal[]} animals
 */

/**
 * @typedef {Object} PetProjectKennel
 * @property {number} id
 * @property {string} size
 * @property {string} type
 */

/**
 * @typedef {Object} PetProjectAnimal
 * @property {number} id
 * @property {string} type
 * @property {string} breed
 * @property {string} name
 * @property {string} kennelId
 */

/**
 * @typedef {Object} PetSanctuary
 * @property {PetSanctuaryShelter} shelter
 */

/**
 * @typedef {Object.<string, PetSanctuaryKennel>} PetSanctuaryShelter
 */

/**
 * @typedef {Object} PetSanctuaryKennel
 * @property {string} size
 * @property {PetSanctuaryAnimal} animal
 */

/**
 * @typedef {Object} PetSanctuaryAnimal
 * @property {string} species
 * @property {string} name
 * @property {string} breed
 */

/**
 * @typedef {Object} Animal
 * @property {'Cat' | 'Dog' | 'Unknown'} type
 * @property {string} name
 * @property {string} breed
 * @property {'Small' | 'Medium' | 'Large' | 'Unknown'} kennelSize
 */
// #endregion Types
