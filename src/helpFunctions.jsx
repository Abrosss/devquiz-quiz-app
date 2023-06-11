
import axios from "./api/axios";

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

export function uploadToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const response = await axios.post('/addImage', { image: reader.result });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
}
export async function deleteFromCloudinary(cloudinaryId) {
  try {
    const response = await axios.post('/deleteImage', {
      cloudinaryId: cloudinaryId
    });
    if (response.status === 200) {
      return true
    }
    else return false
  
  
  } catch (err) {
  
    console.error(err);
  }
}











