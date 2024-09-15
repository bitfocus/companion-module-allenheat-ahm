import { InstanceBase } from '@companion-module/base'

 /**
 * Generates a Dropdown Choices Array with labelled incrementing values.
 * Example: name = "Mute Input", Qty=64, Offset=1
 * Output:
 * { id: '0', label: 'Mute Input 1' }, 
 * { id: '1', label: 'Mute Input 2' }, 
 * ...
 * { id: '63', label: 'Mute Input 64' },
 * @param name Prefix of the label
 * @param qty Amount of elements to generate
 * @param offset offset between number of elements
 */
export function getChoicesArrayWithIncrementingNumbers(name, qty, offset) {
    let choices = []
    for (let i = 1; i <= qty; i++) {
        choices.push({ label: `${name} ${i}`, id: i + offset })
    }
    return choices;
} 

 /**
 * Generates a Dropdown Choices Array with values of a single-dimension array. 
 * Id is just counted up, starting from 0.
 * Output:
 * { id: '0', label: 'Value of Array[0]' }, 
 * { id: '1', label: 'Value of Array[1]' }, 
 * ...
 * { id: '10', label: 'Value of Array[10]' },
 * @param arr Single-Diemension Array to turn into Dropdown Choices Array
 */
export function getChoicesArrayOf1DArray(arr) {
    let choices = []
    for (let i = 0; i < arr.length; i++) {
        choices.push({ label: `${arr[i]}`, id: i })
    }
    return choices;
} 

/**
 * Generates a Dropdown Choices Array with values of an object. 
 * The objects keys are assigned as labels of the choice array, the value is assigned the id.
 * Output:
 * { id: 'Value of Object element 1', label: 'Key of Object element 1' }, 
 * { id: 'Value of Object element 2', label: 'Key of Object element 2' }, 
 * ...
 * { id: 'Value of Object element x', label: 'Key of Object element x' }, 
 * @param arr Object with key-value elements (e.g. const obj = { Element1: 0, Element2: 50 } )
 */
export function getChoicesArrayOfKeyValueObject(kvObj) {
    let choices = []
    for (const [key, value] of Object.entries(kvObj)) {
        choices.push({ label: `${key}`, id: value })
    }
    return choices;
} 

 /**
 * Returns the variable name of the variable that displays the input's current level.
 * @param inputNum Integer number of the Input channel
 */
export function getVarNameInputLevel(inputNum) {
    return `ip_${inputNum}_lvl`;
} 

 /**
 * Returns the variable name of the variable that displays the zones's current level.
 * @param zoneNum Integer number of the Zone channel
 */
 export function getVarNameZoneLevel(zoneNum) {
    return `zn_${zoneNum}_lvl`;
} 