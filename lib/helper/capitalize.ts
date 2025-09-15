// export function capitalizeName(name: string) {
//     return name
//       .toLowerCase()
//       .split(' ')
//       .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//       .join(' ')
//   }
  
 
  
    ////////////first letter////
    export function capitalizeName(name: string) {
      // Handle non-string inputs or empty strings
      if (typeof name !== 'string' || name.length === 0) {
        return "";
      }
    
      // Convert the string to lowercase, split it into an array of words,
      // capitalize the first letter of each word, and then join them back.
      return name
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }


//////////////all letters///////
     export function capitalizeAllLetters(name: string): string {
      if (!name) return '';
      return name.toUpperCase();
    }