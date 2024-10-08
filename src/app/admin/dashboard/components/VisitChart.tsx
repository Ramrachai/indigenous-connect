"use client";
import { Card, CardContent,  CardHeader, CardTitle } from '@/components/ui/card';
import { API_URL } from '@/config/api';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { subDays } from 'date-fns';
import { Range } from 'react-date-range';
import { DatePickerWithRange } from '@/components/ui/dateRange';

interface VisitData {
    _id: string;
    visitors: number;
    pageViews: number;
}

export const getVisitData = async (startDate: string, endDate: string) => {
    const res = await fetch(`${API_URL}/analytics/visit/${startDate}/${endDate}`);
    return await res.json();
};

const VisitChart = () => {
    const [visitData, setVisitData] = useState<VisitData[]>([]);
    const [dateRange, setDateRange] = useState<Range[]>([
        {
            startDate: subDays(new Date(), 30),
            endDate: new Date(),
            key: 'selection',
        },
    ]);

    const fetchData = async () => {
        const startDate = dateRange[0].startDate?.toISOString().split('T')[0];
        const endDate = dateRange[0].endDate?.toISOString().split('T')[0];
        if (startDate && endDate) {
            const data = await getVisitData(startDate, endDate);
            setVisitData(data);
        }
    };

    useEffect(() => {
        fetchData();
    }, [dateRange]);

    return (
        <Card className="mb-8 w-full">
            <CardHeader>
                <CardTitle className='text-left text-lg md:text-2xl'>Visit Statistics</CardTitle>
                <CardTitle className="flex gap-6 items-center justify-between">
                    <DatePickerWithRange />
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={visitData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="_id" />
                        <YAxis yAxisId="left" />
                        <YAxis yAxisId="right" orientation="right" />
                        <Tooltip />
                        <Line yAxisId="left" type="monotone" dataKey="visitors" stroke="#4484f8" />
                        <Line yAxisId="right" type="monotone" dataKey="pageViews" stroke="#fc5a0d" />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
            
        </Card>
    );
};

export default VisitChart;
