const reportsList = Deno.readTextFileSync("day-2/reports.txt");
const reports = reportsList.split("\r\n");

function day2(reports: string[]): number {
  let safeReports = 0;
  reports.forEach((report) => {
    const numbers = report.split(" ").map(Number);
    let ascending = false;
    let descending = false;
    for (let i = 0; i < numbers.length - 1; i++) {
      const firstValue = numbers[i];
      const nextValue = numbers[i + 1];
      const difference = Math.abs(firstValue - nextValue) > 3;
      if (firstValue > nextValue) {
        ascending = true;
      } else if (firstValue < nextValue) {
        descending = true;
      }
      if (
        (ascending && descending) || difference || firstValue === nextValue
      ) {
        break;
      }
      if (i === numbers.length - 2) {
        console.log("Report", report, "Safe");
        safeReports++;
      }
    }
  });
  return safeReports;
}

const safeReports = day2(reports);
console.log("Safe reports", safeReports);
