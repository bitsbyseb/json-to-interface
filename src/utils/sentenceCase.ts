/** **The SentenceCase Functions is From**  
 * [GeeksForGeeks](https://www.geeksforgeeks.org/convert-string-to-title-case-in-javascript/)
*/
export default function sentenceCase(str: string) {
    if ((str === null) || (str === ''))
        return false;
    else
        str = str.toString();

    return str.replace(/\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() +
                txt.substr(1).toLowerCase();
        });
}