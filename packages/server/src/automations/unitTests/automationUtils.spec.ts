const automationUtils = require("../automationUtils")

describe("automationUtils", () => {
  describe("substituteLoopStep", () => {
    it("should allow multiple loop binding substitutes", () => {
      expect(
        automationUtils.substituteLoopStep(
          `{{ loop.currentItem._id }} {{ loop.currentItem._id }} {{ loop.currentItem._id }}`,
          "step.2"
        )
      ).toBe(
        `{{ step.2.currentItem._id }} {{ step.2.currentItem._id }} {{ step.2.currentItem._id }}`
      )
    })

    it("should handle not subsituting outside of curly braces", () => {
      expect(
        automationUtils.substituteLoopStep(
          `loop {{ loop.currentItem._id }}loop loop{{ loop.currentItem._id }}loop`,
          "step.2"
        )
      ).toBe(
        `loop {{ step.2.currentItem._id }}loop loop{{ step.2.currentItem._id }}loop`
      )
    })
  })

  describe("typeCastForLooping", () => {
    it("should parse to correct type", () => {
      expect(
        automationUtils.typecastForLooping(
          { inputs: { option: "Array" } },
          { binding: [1, 2, 3] }
        )
      ).toEqual([1, 2, 3])
      expect(
        automationUtils.typecastForLooping(
          { inputs: { option: "Array" } },
          { binding: "[1, 2, 3]" }
        )
      ).toEqual([1, 2, 3])
      expect(
        automationUtils.typecastForLooping(
          { inputs: { option: "String" } },
          { binding: [1, 2, 3] }
        )
      ).toEqual("1,2,3")
    })
    it("should handle null values", () => {
      // expect it to handle where the binding is null
      expect(
        automationUtils.typecastForLooping(
          { inputs: { option: "Array" } },
          { binding: null }
        )
      ).toEqual(null)
      expect(() =>
        automationUtils.typecastForLooping(
          { inputs: { option: "Array" } },
          { binding: "test" }
        )
      ).toThrow()
    })
  })
})
