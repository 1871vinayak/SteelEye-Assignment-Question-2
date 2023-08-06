function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
  // Create a function to convert plain text positions to HTML positions
  const getHTMLPosition = (plainTextPosition) => {
    const prefix = htmlContent.substring(0, plainTextPosition.start);
    const highlighted = htmlContent.substring(plainTextPosition.start, plainTextPosition.end + 1);
    const suffix = htmlContent.substring(plainTextPosition.end + 1);

    const openTagIndex = prefix.lastIndexOf("<");
    const closeTagIndex = suffix.indexOf(">");

    const startPos = openTagIndex !== -1 ? openTagIndex + 1 : prefix.length;
    const endPos = closeTagIndex !== -1 ? htmlContent.length - suffix.length + closeTagIndex : htmlContent.length;

    return [startPos, endPos, highlighted];
  };

  // Sort the plainTextPositions in reverse order to avoid index shifting when applying highlighting
  const sortedPlainTextPositions = plainTextPositions.slice().sort((a, b) => b.start - a.start);

  // Apply highlighting to htmlContent
  let resultHTML = htmlContent;
  for (const position of sortedPlainTextPositions) {
    const [startPos, endPos, highlighted] = getHTMLPosition(position);
    resultHTML =
      resultHTML.substring(0, startPos) + `<mark>${highlighted}</mark>` + resultHTML.substring(endPos);
  }

  return resultHTML;
}

module.exports = highlightHTMLContent;
