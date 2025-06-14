export default function generateIntegerID(minNumber=1000,maxNumber=9000) {
    return Math.floor(minNumber + Math.random() * maxNumber); // Generates a number between 1000 and 9999
}