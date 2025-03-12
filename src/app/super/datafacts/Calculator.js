import React, { useState, useEffect } from "react";
import {
  Calculator as CalculatorIcon,
  DollarSign,
  Percent,
  Calendar,
  Home,
  Building,
  RefreshCw,
} from "lucide-react";

const Calculator = ({ data = {} }) => {
  // Set up state for input values
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState(null);

  // Initialize inputs from data
  useEffect(() => {
    if (data?.inputs) {
      const initialInputs = {};
      data.inputs.forEach((input) => {
        // Use default value if provided, otherwise reasonably smart defaults
        if (input.defaultValue !== undefined) {
          initialInputs[input.name] = input.defaultValue;
        } else if (input.type === "slider" || input.type === "number") {
          initialInputs[input.name] = input.min || 0;
        } else if (input.type === "select" && input.options?.length > 0) {
          initialInputs[input.name] = input.options[0].value;
        } else {
          initialInputs[input.name] = "";
        }
      });
      setInputs(initialInputs);

      // Calculate initial results
      calculateResults(initialInputs);
    }
  }, [data]);

  // Handle input changes
  const handleInputChange = (name, value) => {
    // Parse numeric values
    if (typeof value === "string" && !isNaN(parseFloat(value))) {
      value = parseFloat(value);
    }

    const newInputs = { ...inputs, [name]: value };
    setInputs(newInputs);
    calculateResults(newInputs);
  };

  // Calculate results based on inputs and calculation functions
  const calculateResults = (currentInputs) => {
    if (!data?.calculations) return;

    // For the utility cost calculator
    if (data?.title?.toLowerCase().includes("utility")) {
      // Extract input values
      const {
        homeSize,
        occupants,
        heatingSystem,
        neighborhood,
        insulation,
        windows,
      } = currentInputs;

      // Calculate electricity cost
      const electricityBase = data.calculations.electricity.base[homeSize] || 0;
      const electricityOccupantCost =
        (occupants || 1) * data.calculations.electricity.occupantFactor;
      const electricityHeatingFactor =
        data.calculations.electricity.heatingFactor[heatingSystem] || 0;
      const electricityNeighborhoodFactor =
        data.calculations.electricity.neighborhoodFactor[neighborhood] || 1;
      const electricityInsulationFactor =
        data.calculations.electricity.insulationFactor[insulation] || 1;
      const electricityWindowsFactor =
        data.calculations.electricity.windowsFactor[windows] || 1;

      const electricityCost =
        (electricityBase + electricityOccupantCost + electricityHeatingFactor) *
        electricityNeighborhoodFactor *
        electricityInsulationFactor *
        electricityWindowsFactor;

      // Calculate gas cost
      const gasBase = data.calculations.gas.base[homeSize] || 0;
      const gasOccupantCost =
        (occupants || 1) * data.calculations.gas.occupantFactor;
      const gasHeatingFactor =
        data.calculations.gas.heatingFactor[heatingSystem] || 0;
      const gasNeighborhoodFactor =
        data.calculations.gas.neighborhoodFactor[neighborhood] || 1;
      const gasInsulationFactor =
        data.calculations.gas.insulationFactor[insulation] || 1;
      const gasWindowsFactor =
        data.calculations.gas.windowsFactor[windows] || 1;

      const gasCost =
        (gasBase + gasOccupantCost + gasHeatingFactor) *
        gasNeighborhoodFactor *
        gasInsulationFactor *
        gasWindowsFactor;

      // Calculate water & sewer cost
      const waterBase = data.calculations.water.base || 0;
      const waterOccupantCost =
        (occupants || 1) * data.calculations.water.occupantFactor;
      const waterCost = waterBase + waterOccupantCost;

      const sewerBase = data.calculations.sewer.base || 0;
      const sewerOccupantCost =
        (occupants || 1) * data.calculations.sewer.occupantFactor;
      const sewerCost = sewerBase + sewerOccupantCost;

      // Calculate trash cost
      const trashCost = data.calculations.trash[homeSize] || 0;

      // Calculate internet cost
      const internetCost = data.calculations.internet || 0;

      // Total monthly cost
      const totalMonthlyCost = Math.round(
        electricityCost +
          gasCost +
          waterCost +
          sewerCost +
          trashCost +
          internetCost,
      );

      // Set the results
      setResults({
        electricity: Math.round(electricityCost),
        gas: Math.round(gasCost),
        water: Math.round(waterCost),
        sewer: Math.round(sewerCost),
        trash: Math.round(trashCost),
        internet: Math.round(internetCost),
        total: totalMonthlyCost,
      });
    }

    // For mortgage calculator (implement additional calculators as needed)
    else if (data?.title?.toLowerCase().includes("mortgage")) {
      // Extract input values
      const {
        homePrice,
        downPayment,
        interestRate,
        loanTerm,
        propertyTax,
        insurance,
      } = currentInputs;

      // Calculate loan amount
      const loanAmount = homePrice - homePrice * (downPayment / 100);

      // Calculate monthly interest rate
      const monthlyInterestRate = interestRate / 100 / 12;

      // Calculate number of payments
      const numberOfPayments = loanTerm * 12;

      // Calculate principal and interest payment
      const piPayment =
        (loanAmount *
          (monthlyInterestRate *
            Math.pow(1 + monthlyInterestRate, numberOfPayments))) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

      // Calculate monthly property tax payment
      const monthlyPropertyTax = (homePrice * (propertyTax / 100)) / 12;

      // Calculate monthly insurance payment
      const monthlyInsurance = insurance / 12;

      // Calculate total monthly payment
      const totalMonthlyPayment =
        piPayment + monthlyPropertyTax + monthlyInsurance;

      // Set the results
      setResults({
        loanAmount: Math.round(loanAmount),
        principalAndInterest: Math.round(piPayment),
        propertyTax: Math.round(monthlyPropertyTax),
        insurance: Math.round(monthlyInsurance),
        totalMonthlyPayment: Math.round(totalMonthlyPayment),
        totalInterestPaid: Math.round(
          piPayment * numberOfPayments - loanAmount,
        ),
      });
    }
  };

  // Render an input field based on its type
  const renderInput = (input) => {
    switch (input.type) {
      case "select":
        return (
          <select
            value={inputs[input.name] || ""}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {input.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case "number":
        return (
          <div className="relative">
            {input.prefix && (
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                {input.prefix === "$" && <DollarSign className="w-4 h-4" />}
                {input.prefix === "%" && <Percent className="w-4 h-4" />}
                {!["$", "%"].includes(input.prefix) && input.prefix}
              </div>
            )}
            <input
              type="number"
              value={inputs[input.name] || 0}
              onChange={(e) => handleInputChange(input.name, e.target.value)}
              min={input.min}
              max={input.max}
              step={input.step || 1}
              className={`w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${input.prefix ? "pl-8" : ""}`}
            />
          </div>
        );

      case "slider":
        return (
          <div className="space-y-1">
            <input
              type="range"
              value={inputs[input.name] || input.min || 0}
              onChange={(e) =>
                handleInputChange(input.name, parseFloat(e.target.value))
              }
              min={input.min}
              max={input.max}
              step={input.step || 1}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {input.prefix || ""}
                {input.min}
                {input.suffix || ""}
              </span>
              <span>
                {input.prefix || ""}
                {input.max}
                {input.suffix || ""}
              </span>
            </div>
          </div>
        );

      default:
        return (
          <input
            type="text"
            value={inputs[input.name] || ""}
            onChange={(e) => handleInputChange(input.name, e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
    }
  };

  // Render results based on calculator type
  const renderResults = () => {
    if (!results) return null;

    // For utility cost calculator
    if (data?.title?.toLowerCase().includes("utility")) {
      return (
        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 p-3 border-b border-gray-200">
            <h3 className="font-medium text-blue-800">
              Estimated Monthly Utility Costs
            </h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-500">Electricity</p>
                <p className="text-lg font-medium">${results.electricity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Natural Gas</p>
                <p className="text-lg font-medium">${results.gas}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Water</p>
                <p className="text-lg font-medium">${results.water}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Sewer</p>
                <p className="text-lg font-medium">${results.sewer}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Trash/Recycling</p>
                <p className="text-lg font-medium">${results.trash}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Internet</p>
                <p className="text-lg font-medium">${results.internet}</p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium text-blue-800">
                  Total Monthly Utilities
                </p>
                <p className="text-xl font-semibold text-blue-800">
                  ${results.total}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // For mortgage calculator
    else if (data?.title?.toLowerCase().includes("mortgage")) {
      return (
        <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-blue-50 p-3 border-b border-gray-200">
            <h3 className="font-medium text-blue-800">
              Mortgage Payment Breakdown
            </h3>
          </div>
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${(results.principalAndInterest / results.totalMonthlyPayment) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Principal & Interest</p>
                <p className="text-lg font-medium">
                  ${results.principalAndInterest}/mo
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Property Tax</p>
                <p className="text-lg font-medium">${results.propertyTax}/mo</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Homeowners Insurance</p>
                <p className="text-lg font-medium">${results.insurance}/mo</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Loan Amount</p>
                <p className="text-lg font-medium">
                  ${results.loanAmount.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-medium text-blue-800">Monthly Payment</p>
                <p className="text-xl font-semibold text-blue-800">
                  ${results.totalMonthlyPayment}/mo
                </p>
              </div>
            </div>

            <div className="mt-3 text-sm text-gray-500">
              <p>
                Total interest paid over the life of the loan: $
                {results.totalInterestPaid.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Generic results display for other calculators
    return (
      <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
        <div className="bg-blue-50 p-3 border-b border-gray-200">
          <h3 className="font-medium text-blue-800">Calculation Results</h3>
        </div>
        <div className="p-4">
          {Object.entries(results).map(([key, value], index) => (
            <div key={index} className="mb-3 last:mb-0">
              <p className="text-xs text-gray-500">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())
                  .replace(/([A-Z])\s(?=[A-Z])/g, "$1")}
              </p>
              <p className="text-lg font-medium">
                {typeof value === "number"
                  ? key.toLowerCase().includes("amount") ||
                    key.toLowerCase().includes("payment") ||
                    key.toLowerCase().includes("cost") ||
                    key.toLowerCase().includes("price")
                    ? `$${value.toLocaleString()}`
                    : value.toLocaleString()
                  : value}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-gray-900">
          {data?.title || "Calculator"}
        </h3>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
          <CalculatorIcon className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 space-y-4">
          {/* Input fields */}
          {data?.inputs &&
            data.inputs.map((input, index) => (
              <div key={index} className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  {input.label}
                  {input.required && <span className="text-red-500">*</span>}
                </label>
                {renderInput(input)}
                {input.helpText && (
                  <p className="text-xs text-gray-500">{input.helpText}</p>
                )}
              </div>
            ))}

          {/* Reset button */}
          <div className="flex justify-end">
            <button
              className="flex items-center gap-1 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              onClick={() => {
                // Reset to initial values
                const initialInputs = {};
                if (data?.inputs) {
                  data.inputs.forEach((input) => {
                    if (input.defaultValue !== undefined) {
                      initialInputs[input.name] = input.defaultValue;
                    } else if (
                      input.type === "slider" ||
                      input.type === "number"
                    ) {
                      initialInputs[input.name] = input.min || 0;
                    } else if (
                      input.type === "select" &&
                      input.options?.length > 0
                    ) {
                      initialInputs[input.name] = input.options[0].value;
                    } else {
                      initialInputs[input.name] = "";
                    }
                  });
                }
                setInputs(initialInputs);
                calculateResults(initialInputs);
              }}
            >
              <RefreshCw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results section */}
      {renderResults()}
    </div>
  );
};

export default Calculator;
