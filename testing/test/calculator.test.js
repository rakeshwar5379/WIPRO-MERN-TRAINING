const { expect } = require("chai");
const calculator = require("../src/calculator");

describe("Calculator Unit Tests", () => {

  describe("Addition", () => {
    it("should add two numbers correctly", () => {
      const result = calculator.add(5, 3);
      expect(result).to.equal(8);
    });
  });

  describe("Subtraction", () => {
    it("should subtract two numbers correctly", () => {
      const result = calculator.subtract(10, 4);
      expect(result).to.equal(6);
    });
  });

  describe("Multiplication", () => {
    it("should multiply two numbers correctly", () => {
      const result = calculator.multiply(3, 4);
      expect(result).to.equal(12);
    });
  });

  describe("Division", () => {
    it("should divide two numbers correctly", () => {
      const result = calculator.divide(20, 5);
      expect(result).to.equal(4);
    });

    it("should throw error when dividing by zero", () => {
      expect(() => calculator.divide(10, 0)).to.throw("Cannot divide by zero");
    });
  });

});
