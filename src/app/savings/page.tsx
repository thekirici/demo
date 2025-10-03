"use client";
import React, { useState } from 'react';
import {Input, Button, Card, CardBody, CardHeader, Select, SelectItem} from "@heroui/react";

const currencies = [
    {key: "TRY", label: "₺ (TL)"},
    {key: "USD", label: "$ (USD)"},
    {key: "EUR", label: "€ (EUR)"},
];

const currencySymbols: { [key: string]: string } = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
};

const SavingsPage = () => {
  const [targetAmount, setTargetAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [timeToGoal, setTimeToGoal] = useState<number | null>(null);
  const [totalSavings, setTotalSavings] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('TRY');

  const handleCalculate = () => {
    const P = parseFloat(monthlyContribution);
    const A = parseFloat(targetAmount);
    const r = parseFloat(annualInterestRate) / 100 / 12;

    if (A > 0 && P > 0 && r > 0) {
      const n = Math.log((A * r / P) + 1) / Math.log(1 + r);
      const totalSaved = P * n;
      setTimeToGoal(n);
      setTotalSavings(A);
      setTotalInterest(A - totalSaved);
    } else {
      setTimeToGoal(null);
      setTotalSavings(null);
      setTotalInterest(null);
    }
  };

  const symbol = currencySymbols[selectedCurrency];

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Card className="p-4">
            <CardHeader>
              <h1 className="text-2xl font-bold text-center">Tasarruf Planlayıcı</h1>
            </CardHeader>
            <CardBody className="flex flex-col gap-4">
              <Input
                type="number"
                label="Hedef Tutar"
                placeholder="0.00"
                value={targetAmount}
                onValueChange={setTargetAmount}
                startContent={
                    <Select
                        size="sm"
                        aria-label="Currency"
                        selectedKeys={[selectedCurrency]}
                        onChange={(e) => setSelectedCurrency(e.target.value)}
                        className="w-24"
                    >
                        {currencies.map((currency) => (
                            <SelectItem key={currency.key}>
                                {currency.label}
                            </SelectItem>
                        ))}
                    </Select>
                }
              />
              <Input
                type="number"
                label="Aylık Birikim"
                placeholder="0.00"
                value={monthlyContribution}
                onValueChange={setMonthlyContribution}
                startContent={
                    <span className="text-default-400 text-small">{symbol}</span>
                }
              />
              <Input
                type="number"
                label="Yıllık Faiz Oranı"
                placeholder="0.00"
                value={annualInterestRate}
                onValueChange={setAnnualInterestRate}
                endContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">%</span>
                  </div>
                }
              />
              <Button color="primary" onClick={handleCalculate} size="lg">
                Hesapla
              </Button>
            </CardBody>
          </Card>
        </div>
        <div className="md:w-1/2">
          {timeToGoal !== null && totalSavings !== null && totalInterest !== null && (
            <Card className="p-4 h-full">
              <CardHeader>
                <h2 className="text-2xl font-bold text-center">Sonuçlar</h2>
              </CardHeader>
              <CardBody className="flex flex-col justify-center items-center gap-4">
                <div className="text-center">
                  <p className="text-lg text-default-500">Hedefe Ulaşma Süresi</p>
                  <p className="text-4xl font-bold">{(timeToGoal / 12).toFixed(1)} yıl ({timeToGoal.toFixed(0)} ay)</p>
                </div>
                <div className="text-center">
                  <p className="text-lg text-default-500">Toplam Faiz Getirisi</p>
                  <p className="text-4xl font-bold">{symbol}{totalInterest.toFixed(2)}</p>
                </div>
                 <div className="text-center">
                  <p className="text-lg text-default-500">Toplam Birikim</p>
                  <p className="text-4xl font-bold">{symbol}{totalSavings.toFixed(2)}</p>
                </div>
              </CardBody>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;