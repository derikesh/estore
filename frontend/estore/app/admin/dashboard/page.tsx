"use client"

import type React from "react"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { api, useCheckAuthQuery } from "@/src/store/rtkQuery"
import type { AppDispatch } from "@/src/store/store"
import { FaUsers, FaShoppingCart, FaMoneyBillWave, FaChartLine } from "react-icons/fa"
import { HiCube, HiCurrencyDollar, HiShoppingBag, HiTrendingUp } from "react-icons/hi"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { useRouter } from "next/navigation"


// Sample data for charts
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
]

const categoryData = [
  { name: "Electronics", value: 400 },
  { name: "Clothing", value: 300 },
  { name: "Books", value: 200 },
  { name: "Home", value: 250 },
  { name: "Sports", value: 150 },
]

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();



    useEffect(() => {
    dispatch(api.util.prefetch("readallProduct", undefined, { force: true }))
    dispatch(api.util.prefetch("readCategories", undefined, { force: true }))
  }, [dispatch])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard icon={<FaUsers className="text-blue-500" />} title="Total Users" value="1,234" />
        <SummaryCard icon={<FaShoppingCart className="text-green-500" />} title="Total Orders" value="5,678" />
        <SummaryCard icon={<FaMoneyBillWave className="text-yellow-500" />} title="Revenue" value="$123,456" />
        <SummaryCard icon={<FaChartLine className="text-purple-500" />} title="Growth" value="+15%" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Sales</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Category Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={categoryData}> 
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <ActivityItem
            icon={<HiCube className="text-blue-500" />}
            title="New product added"
            description="iPhone 13 Pro has been added to the inventory"
            time="2 hours ago"
          />
          <ActivityItem
            icon={<HiCurrencyDollar className="text-green-500" />}
            title="Large order received"
            description="$5,000 order from Apple Inc."
            time="5 hours ago"
          />
          <ActivityItem
            icon={<HiShoppingBag className="text-yellow-500" />}
            title="New category created"
            description="'Smart Home' category has been added"
            time="1 day ago"
          />
          <ActivityItem
            icon={<HiTrendingUp className="text-purple-500" />}
            title="Sales milestone reached"
            description="Monthly sales surpassed $100,000"
            time="2 days ago"
          />
        </div>
      </div>
    </div>
  )
}

function SummaryCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  )
}

function ActivityItem({
  icon,
  title,
  description,
  time,
}: { icon: React.ReactNode; title: string; description: string; time: string }) {
  return (
    <div className="flex items-start">
      <div className="mr-4 mt-1">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  )
}

