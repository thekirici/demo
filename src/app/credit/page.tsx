"use client";
import React, { useState } from 'react';

const CreditPage = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);
  const [totalPayment, setTotalPayment] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const P = parseFloat(loanAmount);
    const annualInterestRate = parseFloat(interestRate);
    const r = annualInterestRate / 100 / 12;
    const n = parseInt(loanTerm) * 12;

    if (P > 0 && r > 0 && n > 0) {
      const M = (P * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1);
      setMonthlyPayment(M);
      setTotalPayment(M * n);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Credit Calculator</h1>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanAmount">
            Loan Amount
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="loanAmount"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="interestRate">
            Interest Rate (%)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="interestRate"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="loanTerm">
            Loan Term (years)
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            id="loanTerm"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
          Calculate
        </button>
      </form>
      {monthlyPayment !== null && totalPayment !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-bold mb-2">Results</h2>
          <p className="text-gray-700">Monthly Payment: ${monthlyPayment.toFixed(2)}</p>
          <p className="text-gray-700">Total Payment: ${totalPayment.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CreditPage;