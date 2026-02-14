const { expect } = require("chai");

describe("Salary Calculator Test", function () {

  function calculateSalary(baseSalary, bonusAmount, leaveCount, taxPercent) {

    var leaveCost = leaveCount * 500;
    var totalSalary = baseSalary + bonusAmount - leaveCost;
    var taxAmount = (totalSalary * taxPercent) / 100;
    var finalSalary = totalSalary - taxAmount;
    return finalSalary;
  }

  it("calculates salary with bonus", function () {
    var result = calculateSalary(50000, 5000, 2, 10);
    expect(result).to.equal(48600);
  });

  it("calculates salary without bonus", function () {
    var result = calculateSalary(40000, 0, 1, 5);
    expect(result).to.equal(37525);
  });

});
