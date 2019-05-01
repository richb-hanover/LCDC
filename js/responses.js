/**
 * Javascript for the LCDC Questionnaire summary page
 * April 2019 - reb
 */

/**
 * cleanText - given a text field, clean it up by"
 * - removing leading/trailing whitespace
 * - removing duplicate spaces
 * - changing "\n" to "<br />"
 * @param field
 *
 */
function cleanText(field) {
  let retstr = field.trim();
  retstr = retstr.replace(/ +/g," ");
  retstr = retstr.replace(/\n/g,"<br />");
  return retstr;
}

/**
 * formatScale - take a numeric value, return its human-readable value
 * @param x
 */
function formatScale(x) {
  if (x >= "1" && x <= "5") return satisfactionLabels[x];
  if (x === '') return satisfactionLabels[0];
  return x;

}
/**
 * formatResponse
 * Given an object containing a single response, return a <dl>
 *   with its properties "prettied up"
 * @param resp - the response to format
 * @return "<dl>" with the properties
 */
function formatResponse(resp) {
  return `
  <dl>
  <b>Entry Number:</b> ${resp.Response} 
  <b>Attend Forum:</b> ${formatScale(resp.Attend)} 
  <b>View online:</b>  ${formatScale(resp.View)} 
  <br />
  <b>Municipal Tax Value:</b>  ${formatScale(resp.Muni)} 
  <b>School Tax Value:</b>  ${formatScale(resp.School)} 
  <b>Overall Tax:</b>  ${formatScale(resp.Taxes)}
  <br />  <br />
  <dt>Takeaway:</dt>  <dd>${cleanText(resp.Takeaway)}</dd>
  <dt>Like about Lyme:</dt>  <dd>${cleanText(resp.Like)}</dd>
  <dt>Desirable Changes:</dt>  <dd>${cleanText(resp.Change)}</dd>
   <dt>How address:</dt>  <dd>${cleanText(resp["How-address"])}</dd>
  <dt>Other thoughts:</dt>  <dd>${cleanText(resp.Other)}</dd>
  </dl>
  `;
}

/**
 * Beginning of main routine
 */

satisfactionLabels = [
  "<i>No entry</i>",
  "Very unsatisfied",
  "Unsatisfied",
  "Neutral",
  "Satisfied",
  "Very satisfied"
];
document.getElementById("ct").innerHTML = responses.length;

const tbody = responses
  .map(function(x) { return formatResponse(x) })
  .map(function(x) { return "<tr><td>" + x + "</td></tr>" });

document.getElementById("resps").innerHTML = "<tbody>" + tbody + "</tbody>";
