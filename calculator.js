// Assignment 3 - Simple JavaScript Calculator
// Taliah Kitt

(function () {
  "use strict";

  function makeTable(rows) {
    var html = '<table>';
    html += '<tr><th>x</th><th>op</th><th>y</th><th>result</th></tr>';

    for (var i = 0; i < rows.length; i++) {
      html += '<tr>';
      html += '<td>' + escapeHtml(rows[i].x) + '</td>';
      html += '<td class="operator">' + escapeHtml(rows[i].op) + '</td>';
      html += '<td>' + escapeHtml(rows[i].y) + '</td>';
      html += '<td>' + escapeHtml(String(rows[i].result)) + '</td>';
      html += '</tr>';
    }

    html += '</table>';
    return html;
  }

  function makeSummary(validResults) {
    var min = "N/A";
    var max = "N/A";
    var average = "N/A";
    var total = "N/A";

    if (validResults.length > 0) {
      min = Math.min.apply(null, validResults);
      max = Math.max.apply(null, validResults);
      total = 0;

      for (var i = 0; i < validResults.length; i++) {
        total += validResults[i];
      }

      average = total / validResults.length;
      if (Math.round(average) !== average) {
        average = average.toFixed(2);
      }
    }

    var html = '<table>';
    html += '<tr><th>Min</th><th>Max</th><th>Average</th><th>Total</th></tr>';
    html += '<tr><td>' + min + '</td><td>' + max + '</td><td>' + average + '</td><td>' + total + '</td></tr>';
    html += '</table>';
    return html;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function runCalculator() {
    var rows = [];
    var validResults = [];

    while (true) {
      var xInput = window.prompt("Enter the first number (x):");
      if (xInput === null) {
        break;
      }

      var yInput = window.prompt("Enter the second number (y):");
      if (yInput === null) {
        break;
      }

      var op = window.prompt("Enter an operator (+, -, *, /, %):");
      if (op === null) {
        break;
      }

      var x = Number(xInput);
      var y = Number(yInput);
      var result;
      var valid = true;

      if (isNaN(x) || isNaN(y)) {
        result = "wrong input number";
        valid = false;
      } else if (op === "+") {
        result = x + y;
      } else if (op === "-") {
        result = x - y;
      } else if (op === "*") {
        result = x * y;
      } else if (op === "/") {
        result = x / y;
      } else if (op === "%") {
        result = x % y;
      } else {
        result = "computation error";
        valid = false;
      }

      rows.push({ x: xInput, op: op, y: yInput, result: result });

      if (valid) {
        validResults.push(result);
      }

      var again = window.confirm("Click OK to enter another calculation. Click Cancel to stop.");
      if (!again) {
        break;
      }
    }

    document.getElementById("results").innerHTML = makeTable(rows);
    document.getElementById("summary").innerHTML = makeSummary(validResults);
    document.getElementById("status").textContent = "Calculator finished. Click Start Calculator to run it again.";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.getElementById("startCalculator");
    button.addEventListener("click", runCalculator);
    document.getElementById("status").textContent = "Ready. Click Start Calculator.";
  });
}());
