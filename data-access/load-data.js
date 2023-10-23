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
  return {
    animals: [
      {
        type: 'Unknown',
        name: 'Unknown',
        breed: 'Unknown',
        kennelSize: 'Unknown',
      },
    ],
  };
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
