import { getUserForms } from "@/db/actions/form.action";

export const getStats = async () => {
    try {
        const forms = await getUserForms();
        // Calculate total responses
        const totalResponses = forms.reduce((sum, f) => sum + (f.responsesCount || 0), 0);

        // Calculate conversion rate (responses / forms), avoid division by zero
        const conversionRate =
            forms.length > 0
            ? `${Math.round((totalResponses / forms.length) * 100)}%`
            : "0%";

        // Find top form by responsesCount
        const topForm =
            forms.length > 0
            ? forms.reduce(
                  (top, f) =>
                  (f.responsesCount || 0) > (top?.responsesCount || 0)
                      ? f
                      : top,
                  forms[0]
              )
            : null;

        return [
            {
            label: "Total Forms",
            value: forms.length || 0,
            icon: "FileText",
            color: "var(--chart-1)",
            },
            {
            label: "Responses",
            value: totalResponses,
            icon: "BarChart3",
            color: "var(--chart-2)",
            },
            {
            label: "Conversion Rate",
            value: conversionRate,
            icon: "TrendingUp",
            color: "var(--chart-4)",
            },
            {
            label: "Top Form",
            value:
                topForm && topForm.title
                ? topForm.title.split(" ").slice(0, 2).join(" ") + "..."
                : "No Forms",
            icon: "Star",
            color: "#f59e0b",
            },
        ];
    } catch (error) {
        console.error("Error fetching stats:", error);
        throw new Error("Failed to fetch stats");
    }
};

export const getChartData = async () => {
    try {
        const forms = await getUserForms();
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const chartMap: Record<string, { forms: number; responses: number }> = {};
        days.forEach(day => {
            chartMap[day] = { forms: 0, responses: 0 };
        });
        forms.forEach(form => {
            const date = new Date(form.createdAt);
            const day = days[date.getDay()];
            chartMap[day].forms += 1;
            chartMap[day].responses += form.responsesCount || 0;
        });
        return days.map(day => ({
            name: day,
            forms: chartMap[day].forms,
            responses: chartMap[day].responses,
        }));
    } catch (error) {
        console.error("Error fetching chart data:", error);
        throw new Error("Failed to fetch chart data");
    }
};
