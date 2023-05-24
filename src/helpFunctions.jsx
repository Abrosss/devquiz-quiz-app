
export function deleteFromArray(array, index) {
  const filteredQuestions = [...array]; 
  filteredQuestions.splice(index, 1); 
  return filteredQuestions

 }
 export function addToArray(array, element) {
    return [...array, element]
  
 }
 export function recordInputs (e, array, index) {
  const { name, value } = e.target;
  const updatedArray = [ ...array ]
  updatedArray[index][name] = value;
  return updatedArray
};