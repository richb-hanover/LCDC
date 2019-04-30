/**
 * Javascript for the LCDC Questionnaire summary page
 * April 2019 - reb
 */

/**
 * tablerow(ary, prop)
 *
 * reduce function that creates text of a table ("<tbody> [<tr><td> stuff </td></tr> ]+ </tbody>")
 *  from the array.
 */
function tablerow(accum, x) {
  return accum + "<tr><td>" + x + "</td></tr>\n"
}

/**
 * tableize(array, propName)
 * Return the the table contents from the array's propName items.
 */
function tableize(ary, prop, qID) {
  const theResps = ary
    .map(function(x) { return x[prop] } )                     // get the requested prop
    .map(function(x) { return x.trim() } )                    // remove leading & trailing whitespace
    .filter(function(x) { return /\S/.test(x) } )             // remove empty answers
    .map(function(x) { return x.replace(/\n/g,"<br />") } );  // substitute \n with <br />
  document.getElementById("ct"+qID).innerHTML = theResps.length;

  const theDom = theResps.reduce(tablerow,"");
  document.getElementById("r"+qID).innerHTML = theDom;
}

/**
 * countResponses
 * @param accum
 * @param x
 * Return an object whose props contain the number of times the prop occurs in the input array.
 */
function countResponses(accum, x) {
  if (accum[x] === undefined) {
    accum[x] = 0;
  }
  accum[x]++;
  return accum;
}
/**
 * summarizeResponses(ary, prop, init)
 * @ary array to summarize
 * @prop prop to summarize
 * @init starting value (sets all options to zero, to ensure they're shown)
 * Return an object with the total number of each kind of response
 */
function summarizeResponses(ary, prop, labels) {

  const zeroAry = {};
  labels.forEach(function(x) { zeroAry[x] = 0 });
  const retary = ary
    .map(function(x) { return x[prop] } )
    .map(function(x) { if (x >= "1" && x <= "5") { x = labels[x] } return x; } )
    .map(function(x) { if (x === '') { x = "N/A"; } return x; } )      // Fix up empty string
    .map(function(x) { if (x === null) { x = "N/A"; }  return x; } )  // Fix up "null"
    .reduce(countResponses, zeroAry);

  return retary;
}

/**
 * pieChart - create a pie chart from the responses
 * @param ary
 * @param prop
 * @param textLabels
 * @param qID
 */
function pieChart (ary, prop, textLabels, qID ) {
  //pie
  const ctxP = document.getElementById("r"+qID).getContext('2d');
  const resps = summarizeResponses(ary, prop, textLabels);
  const labels = Object.keys(resps);
  let data = [];
  let count = 0;
  labels.forEach(function(x) { data.push(resps[x]); count+= resps[x] });
  document.getElementById("ct"+qID).innerHTML = count;

  const myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        data: data,
        // backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)', // blue
          'rgba(75, 192, 192, 0.2)', // green
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
        ],
        hoverBackgroundColor: [
          'rgba(54, 162, 235, 1)', // blue
          'rgba(75, 192, 192, 1)', // green
          'rgba(255,99,132,1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ]
      }]
    },
    options: {
      responsive: true
    }
  });
}
/**
 * barChart - create a bar chart with responses
 * @param ary
 * @param prop
 * @param textLabels
 * @param qID
 * @param label
 */
function barChart (ary, prop, textLabels, qID, label) {
  const ctx = document.getElementById("r"+qID).getContext('2d');
  const resps = summarizeResponses(ary, prop, textLabels);

  const labels = Object.keys(resps);
  let data = [];
  let count = 0;
  labels.forEach(function(x) { data.push(resps[x]); count+= resps[x] });
  document.getElementById("ct"+qID).innerHTML = count;

  const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: label,
        data: data,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)', // blue
          'rgba(75, 192, 192, 0.2)', // green
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // blue
          'rgba(75, 192, 192, 1)', // green
          'rgba(255,99,132,1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

}

/**
 * Beginning of main routine
 */

// copy the questions array to the respective <h3>'s
for (let i=1; i<=10; i++) {
  let id = "q"+i;
  document.getElementById(id).innerHTML = questions[i];
}

pieChart(responses, "Attend",["Yes", "No"], "1" );
pieChart(responses, "View",  ["Yes", "No"], "2");
barChart(responses, "Muni",  ["N/A","Very unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"], "6" );
barChart(responses, "School",["N/A","Very unsatisfied", "Unsatisfied", "Neutral", "Satisfied", "Very Satisfied"], "7");
barChart(responses, "Taxes", ["N/A", "Too low","About right", "Too high"], "8", "Taxes");

tableize(responses, "Takeaway", "3");
tableize(responses, "Like", "4");
tableize(responses, "Change", "5");
tableize(responses, "How-address", "9");
tableize(responses, "Other", "10");
