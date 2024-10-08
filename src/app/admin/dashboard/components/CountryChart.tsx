"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { subDays } from 'date-fns';
import { Range } from 'react-date-range';
import { API_URL } from '@/config/api';
import { DatePickerWithRange } from '@/components/ui/dateRange';

interface CountryVisitData {
    _id: string;
    visitors: number;
    pageViews: number;
}


const getCountryVisitData = async (startDate: string, endDate: string) => {
    const res = await fetch(`${API_URL}/analytics/country?startDate=${startDate}&endDate=${endDate}`);
    return await res.json();
};



const CountryVisitChart: React.FC = () => {
    const [countryVisitData, setCountryVisitData] = useState<CountryVisitData[]>([]);
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: subDays(new Date(), 30),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const fetchData = useCallback(async () => {
        const startDate = dateRange[0].startDate?.toISOString().split('T')[0];
        const endDate = dateRange[0].endDate?.toISOString().split('T')[0];
        if (startDate && endDate) {
            const data = await getCountryVisitData(startDate, endDate);
            setCountryVisitData(data);
        }
    }, [dateRange]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <Card className="mb-8 w-full">
            <CardHeader>
                <CardTitle className='text-left text-lg md:text-2xl'>Country Visit Statistics</CardTitle>
                <CardTitle className="flex gap-6 items-center justify-between">
                    <DatePickerWithRange />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={countryVisitData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis yAxisId="left" orientation="left" stroke="#444" />
                        <YAxis yAxisId="right" orientation="right" stroke="#ccc" />
                        <Tooltip />
                        <Legend />
                        <defs>
                            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <Bar yAxisId="left" dataKey="visitors" name="Visitors" fill="#556595" />
                        <Bar yAxisId="right" dataKey="pageViews" name="Page Views" fill="#ff8888" />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default CountryVisitChart;