/**
 * Handlebars helper to capitalize.
 *
 * @param {string} str - The string to capitalize the first character
 * @example
 * {{ucfirst foo}}
 * @returns string The string capitalized
 */
module.exports = function (str) {
    if (str && typeof str === "string") {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    console.warn("helpers: ucfirst called with a non string parameter.");
    return '';
}
