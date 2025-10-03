"use client";
import React, { useState, useCallback, useEffect } from 'react';
import { Input, Button, Card, CardBody, CardHeader, Select, SelectItem } from "@heroui/react";

const currencies = [
    { key: "TRY", label: "₺ (TL)" },
    { key: "USD", label: "$ (USD)" },
    { key: "EUR", label: "€ (EUR)" },
];

const currencySymbols: { [key: string]: string } = {
    TRY: "₺",
    USD: "$",
    EUR: "€",
};

const SavingsPage = () => {
  const [targetAmount, setTargetAmount] = useState('100000');
  const [monthlyContribution, setMonthlyContribution] = useState('1500');
  const [annualInterestRate, setAnnualInterestRate] = useState('5');
  const [timeToGoal, setTimeToGoal] = useState<number | null>(null);
  const [totalInterest, setTotalInterest] = useState<number | null>(null);
  const [selectedCurrency, setSelectedCurrency] = useState('TRY');

  const handleCalculate = useCallback(() => {
    const P = parseFloat(monthlyContribution); // Aylık yatırım
    const A = parseFloat(targetAmount); // Gelecekteki değer (hedef tutar)
    const r = parseFloat(annualInterestRate) / 100 / 12; // Aylık faiz oranı

    if (A > 0 && P > 0 && r > 0) {
      // n = log( (A*r/P) + 1 ) / log(1 + r)
      const n = Math.log((A * r / P) + 1) / Math.log(1 + r);
      const totalContribution = P * n;
      const interestEarned = A - totalContribution;

      setTimeToGoal(n); // Ay olarak süre
      setTotalInterest(interestEarned);
    } else {
      setTimeToGoal(null);
      setTotalInterest(null);
    }
  }, [monthlyContribution, targetAmount, annualInterestRate]);

  // Sayfa ilk yüklendiğinde otomatik olarak hesaplama yap
  useEffect(() => {
    handleCalculate();
  }, [handleCalculate]);

  const symbol = currencySymbols[selectedCurrency];

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <Card className="p-4 h-full">
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
                labelPlacement="outside"
                startContent={
                  <Select
                    size="sm"
                    aria-label="Para Birimi"
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
                label="Aylık Birikim Tutarı"
                placeholder="0.00"
                value={monthlyContribution}
                onValueChange={setMonthlyContribution}
                labelPlacement="outside"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">{symbol}</span>
                  </div>
                }
              />
              <Input
                type="number"
                label="Yıllık Net Faiz Oranı"
                placeholder="0.00"
                value={annualInterestRate}
                onValueChange={setAnnualInterestRate}
                labelPlacement="outside"
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
          {timeToGoal !== null && totalInterest !== null ? (
            <Card className="p-4 h-full flex flex-col justify-center">
              <CardHeader>
                <h2 className="text-2xl font-bold text-center">Hesaplama Sonuçları</h2>
              </CardHeader>
              <CardBody className="flex flex-col justify-center items-center gap-8 text-center">
                <div>
                  <p className="text-lg text-default-500">Hedefe Ulaşma Süresi</p>
                  <p className="text-4xl font-bold">
                    {`${Math.floor(timeToGoal / 12)} yıl ${Math.ceil(timeToGoal % 12)} ay`}
                  </p>
                  <p className="text-default-500">({timeToGoal.toFixed(0)} ay)</p>
                </div>
                <div>
                  <p className="text-lg text-default-500">Toplam Faiz Getirisi</p>
                  <p className="text-4xl font-bold">
                    {new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(totalInterest)}
                  </p>
                </div>
              </CardBody>
            </Card>
          ) : (
             <Card className="p-4 h-full flex flex-col justify-center items-center">
                <p className="text-default-500">Sonuçları görmek için lütfen hesaplama yapın.</p>
             </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SavingsPage;