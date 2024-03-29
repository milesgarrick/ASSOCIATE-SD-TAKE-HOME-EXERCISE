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
 * Sorts by dog then cat, then sorts by kennel size if same type.
 *
 * @param {Animal} a
 * @param {Animal} b
 * @returns {Animal}
 */
function sortFunction(a, b) {
  if (a.type === b.type) {
    return compareKennelSize(a, b);
  } else if (a.type === 'dog') {
    return -1;
  } else {
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
  if (a.kennelSize === 'small') return 1;
  else if (b.kennelSize === 'small') return -1;
  else if (a.kennelSize === 'medium') return 1;
  else if (b.kennelSize === 'medium') return -1;
  else return 1;
}

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
    let animal = {};
    animal.Type = e.type.toLowerCase();
    animal.name = e.name.toLowerCase();
    animal.breed = e.breed.toLowerCase();
    animal.kennelSize = kennelMap.get(e.kennelId);
    animals.push(animal);
  });
  return animals;
}

/**
 * Kept this wrapper function to separate pre-existing code for the purposes of
 * this assessment.  This function calls the fixed transformPetSanctuary function.
 *
 * @param {PetSanctuary} petSanctuary
 * @returns {Animal[]}
 */
function transformPetSanctuaryData(petSanctuary) {
  const animals = [];
  const kennels = Object.getOwnPropertyNames(petSanctuary.shelter);
  kennels.forEach((kennel) => {
    animals.push(transformPetSanctuary(petSanctuary.shelter[kennel]));
  });
  return animals;
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
function mergeAndSortData(petProject, petSanctuary) {
  const petProjectTransformed = transformPetProjectData(petProject);
  const petSanctuaryTransformed = transformPetSanctuaryData(petSanctuary);
  const allAnimals = petProjectTransformed
    .concat(petSanctuaryTransformed)
    .sort(sortFunction);

  return allAnimals;
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
  const animalProp = Object.getOwnPropertyNames(kennel)[1]; // Fixed bug with varying property name
  animal.type = kennel[animalProp].species.toLowerCase(); // Fixed property name in right operand (type -> species)
  animal.name = kennel[animalProp].name.toLowerCase();
  if ('breed' in kennel[animalProp]) {
    // Fixed bug occurring on missing breed property
    animal.breed = kennel[animalProp].breed.toLowerCase();
  } else {
    animal.breed = 'Unknown';
  }
  animal.kennelSize = kennel.size.toLowerCase();
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
