import { useEffect, useState } from "react";

import {
  getAnalyticsSummary,
  getWeeklyAnalytics,
  getTopDiseases,
  getMonthlyPatients,
  type AnalyticsSummary,
  type WeeklyAnalytics,
  type TopDisease,
  type MonthlyPatient,
} from "../../services/patientApi";


import SummaryCard from "../../components/analytics/SummaryCard";
import WeeklyPatientsChart from "../../components/analytics/WeeklyPatientsChart";
import GenderPieChart from "../../components/analytics/GenderPieChart";
import TopDiseasesChart from "../../components/analytics/TopDiseasesChart";
import MonthlyPatientsChart from "../../components/analytics/MonthlyPatientsChart";



export default function Analytics() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [weeklyData, setWeeklyData] = useState<WeeklyAnalytics[]>([]);
  const [topDiseases, setTopDiseases] = useState<TopDisease[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyPatient[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [
              summaryResponse,
              weeklyResponse,
              diseaseResponse,
              monthlyResponse,
            ] = await Promise.all([
              getAnalyticsSummary(),
              getWeeklyAnalytics(),
              getTopDiseases(),
              getMonthlyPatients(),
            ]);

            setSummary(summaryResponse);
            setWeeklyData(weeklyResponse);
            setTopDiseases(diseaseResponse);
            setMonthlyData(monthlyResponse);

      } catch (err) {
        console.error(err);
        setError("Failed to load analytics.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex h-80 items-center justify-center text-lg text-slate-500">
        Loading Analytics...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor hospital insights and patient statistics.
        </p>
      </div>

      {/* ================= SUMMARY ================= */}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <SummaryCard
          title="Total Patients"
          value={summary?.totalPatients ?? 0}
          color="blue"
        />

        <SummaryCard
          title="Today's Patients"
          value={summary?.todayPatients ?? 0}
          color="green"
        />

        <SummaryCard
          title="Male Patients"
          value={summary?.malePatients ?? 0}
          color="purple"
        />

        <SummaryCard
          title="Female Patients"
          value={summary?.femalePatients ?? 0}
          color="pink"
        />

      </div>

      {/* ================= FILTERS ================= */}

      <div className="flex flex-wrap gap-3">

        <button className="rounded-xl bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow">
          Today
        </button>

        <button className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm hover:bg-slate-50">
          Week
        </button>

        <button className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm hover:bg-slate-50">
          Month
        </button>

        <button className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-sm hover:bg-slate-50">
          Year
        </button>

      </div>

      {/* ================= CHARTS ================= */}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

        <WeeklyPatientsChart
          data={weeklyData}
        />

        <MonthlyPatientsChart
          data={monthlyData}
        />

        <TopDiseasesChart
          data={topDiseases}
        />

        <GenderPieChart
          male={summary?.malePatients ?? 0}
          female={summary?.femalePatients ?? 0}
        />

      </div>

    </div>
  );
}

