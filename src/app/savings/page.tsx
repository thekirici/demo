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

const SavingsGoalCalculator = () => {
    const [targetAmount, setTargetAmount] = useState('');
    const [initialAmount, setInitialAmount] = useState('');
    const [years, setYears] = useState('');
    const [monthlySaving, setMonthlySaving] = useState<number | null>(null);
    const [selectedCurrency, setSelectedCurrency] = useState('TRY');

    const handleCalculate = () => {
        const target = parseFloat(targetAmount);
        const initial = parseFloat(initialAmount) || 0;
        const termInMonths = parseInt(years) * 12;

        if (target > initial && termInMonths > 0) {
            const requiredSavings = (target - initial) / termInMonths;
            setMonthlySaving(requiredSavings);
        } else {
            setMonthlySaving(null);
        }
    };

    const symbol = currencySymbols[selectedCurrency];

    return (
        <div className="container mx-auto p-4 flex justify-center">
            <Card className="w-full max-w-md p-4">
                <CardHeader>
                    <h1 className="text-2xl font-bold text-center">Birikim Hedefi Hesaplayıcı</h1>
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
                        label="Mevcut Birikim (İsteğe Bağlı)"
                        placeholder="0.00"
                        value={initialAmount}
                        onValueChange={setInitialAmount}
                        startContent={<div className="pointer-events-none flex items-center"><span className="text-default-400 text-small">{symbol}</span></div>}
                    />

                    <Input
                        type="number"
                        label="Hedef Süresi (Yıl)"
                        placeholder="Örn: 3"
                        value={years}
                        onValueChange={setYears}
                    />

                    <Button color="primary" onClick={handleCalculate} size="lg">
                        Hesapla
                    </Button>

                    {monthlySaving !== null && (
                        <div className="mt-4 p-4 bg-default-100 rounded-lg">
                            <h2 className="text-xl font-bold mb-2">Hedefinize Ulaşmak İçin</h2>
                            <div className="flex justify-between">
                                <p>Gereken Aylık Birikim:</p>
                                <p className="font-semibold">{symbol}{monthlySaving.toFixed(2)}</p>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
        </div>
    );
};

export default SavingsGoalCalculator;