"use client"

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, FileText, BarChart3, Star } from "lucide-react";
import ChartClient from "@/components/ui/ChartClient";

const dummyStats = [
	{
		label: "Total Forms",
		value: 24,
		icon: "FileText",
		color: "var(--chart-1)",
	},
	{
		label: "Responses",
		value: 1342,
		icon: "BarChart3",
		color: "var(--chart-2)",
	},
	{
		label: "Active Users",
		value: 312,
		icon: "Users",
		color: "var(--chart-3)",
	},
	{
		label: "Conversion Rate",
		value: "42%",
		icon: "TrendingUp",
		color: "var(--chart-4)",
	},
	{
		label: "Top Form",
		value: "Customer Feedback",
		icon: "Star",
		color: "#fbbf24", // golden color
	},
];

const chartData = [
	{ name: "Mon", forms: 3, responses: 120 },
	{ name: "Tue", forms: 5, responses: 200 },
	{ name: "Wed", forms: 2, responses: 150 },
	{ name: "Thu", forms: 6, responses: 300 },
	{ name: "Fri", forms: 4, responses: 180 },
	{ name: "Sat", forms: 1, responses: 80 },
	{ name: "Sun", forms: 3, responses: 100 },
];

const chartConfig = {
	forms: { label: "Forms", color: "var(--chart-1)", icon: FileText },
	responses: { label: "Responses", color: "var(--chart-2)", icon: BarChart3 },
};

const iconMap = {
	FileText,
	BarChart3,
	Users,
	TrendingUp,
	Star,
};

const AnalyticesPage = () => {
	return (
		<main className="p-4 md:p-8 max-w-6xl mx-auto">
			<h1 className="text-2xl md:text-3xl font-bold mb-2">Analytics Overview</h1>
			<p className="text-muted-foreground mb-8">Get insights into your forms and user engagement.</p>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
				{dummyStats.map((stat, i) => {
					const Icon = iconMap[stat.icon as keyof typeof iconMap];
					return (
						<Card key={i} className="shadow-md border border-border/60">
							<CardHeader className="flex flex-row items-center gap-3 pb-2">
								<span className="rounded-md p-2" style={{ background: stat.color + '22' }}>
									<Icon className="w-6 h-6" style={{ color: stat.color }} />
								</span>
								<CardTitle className="text-base font-medium">{stat.label}</CardTitle>
							</CardHeader>
							<CardContent className="pt-0">
								<div className="text-2xl font-bold">{stat.value}</div>
							</CardContent>
						</Card>
					);
				})}
			</div>
			<div className="bg-card rounded-xl border shadow-md p-6">
				<div className="flex items-center justify-between mb-4">
					<div>
						<h2 className="text-lg font-semibold">Weekly Activity</h2>
						<p className="text-muted-foreground text-sm">Forms created and responses received this week</p>
					</div>
					<Badge variant="secondary">Demo Data</Badge>
				</div>
				<ChartClient chartData={chartData} chartConfig={chartConfig} iconMap={iconMap} />
			</div>
		</main>
	)
}

export default AnalyticesPage
