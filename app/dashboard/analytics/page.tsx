"use client"

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, FileText, BarChart3, Star } from "lucide-react"
import ChartClient from "@/components/ui/ChartClient"
import { getChartData, getStats } from '@/lib/stats'

const chartConfig = {
	forms: { label: "Forms", color: "var(--chart-1)", icon: FileText },
	responses: { label: "Responses", color: "var(--chart-2)", icon: BarChart3 },
}

const iconMap = {
	FileText,
	BarChart3,
	Users,
	TrendingUp,
	Star,
}

const SkeletonCard = () => (
	<Card className="shadow-md border border-border/60 animate-pulse">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="rounded-md p-2 bg-muted w-[40px] h-[40px]" />
			<CardTitle className="text-base font-medium bg-muted h-4 w-24 rounded" />
		</CardHeader>
		<CardContent className="pt-0">
			<div className="bg-muted h-6 w-20 rounded" />
		</CardContent>
	</Card>
)

const SkeletonChart = () => (
	<div className="bg-card rounded-xl border shadow-md p-4 sm:p-6 max-md:hidden ">
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
			<div>
				<div className="h-4 w-40 bg-muted rounded mb-1" />
				<div className="h-3 w-60 bg-muted rounded" />
			</div>
			<Badge variant="secondary">Live Data</Badge>
		</div>
		<div className="h-48 bg-muted rounded" />
	</div>
)

const AnalyticsPage = () => {
	const [stats, setStats] = useState<StatItem[] | null>(null)
	const [chartData, setChartData] = useState<ChartDataItem[] | null>(null)

	useEffect(() => {
		(async () => {
			const statsData = await getStats()
			setStats(statsData)
			const chart = await getChartData()
			setChartData(chart)
		})()
	}, [])

	return (
		<main className="w-full p-4 mt-4 md:p-8 max-w-6xl mx-auto">
			<h1 className="text-2xl md:text-3xl font-bold mb-2">Analytics Overview</h1>
			<p className="text-muted-foreground mb-4 lg:mb-8">Get insights into your forms and user engagement.</p>

			{/* Stats Grid */}
			<div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
				{stats ? (
					stats.map((stat, i) => {
						const Icon = iconMap[stat.icon as keyof typeof iconMap]
						return (
							<Card key={i} className="shadow-md border border-border/60">
								<CardHeader className="flex flex-row items-center gap-3 pb-2">
									<span className="rounded-md p-2 flex items-center justify-center min-w-[40px] min-h-[40px]" style={{ background: stat.color + '22' }}>
										<Icon className="w-6 h-6" style={{ color: stat.color }} />
									</span>
									<CardTitle className="text-base font-medium">{stat.label}</CardTitle>
								</CardHeader>
								<CardContent className="pt-0">
									<div className="text-2xl font-bold">{stat.value}</div>
								</CardContent>
							</Card>
						)
					})
				) : (
					Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
				)}
			</div>

			{/* Chart Section */}
			{chartData ? (
				<div className="bg-card rounded-xl border shadow-md p-4 sm:p-6 overflow-x-auto">
					<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
						<div>
							<h2 className="text-lg font-semibold">Weekly Activity</h2>
							<p className="text-muted-foreground text-sm">Forms created and responses received this week</p>
						</div>
						<Badge variant="secondary">Live Data</Badge>
					</div>
					<div className="w-full min-w-[320px] max-md:hidden">
						<ChartClient chartData={chartData} chartConfig={chartConfig} iconMap={iconMap} />
					</div>
					<div className="md:hidden flex flex-col items-center justify-center">
						<TrendingUp className="w-8 h-8 text-muted-foreground mb-2" />
						<h2 className="text-lg font-semibold mb-1">Chart Unavailable</h2>
						<p className="text-muted-foreground text-sm text-center">
							Live analytics chart is available on desktop screens.<br />
							Please switch to a larger device for full insights.
						</p>
					</div>
				</div>
			) : (
				<SkeletonChart />
			)}
		</main>
	)
}

export default AnalyticsPage
