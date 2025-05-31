'use client'

import React from 'react'
import { Plans } from '@/lib/constent'
import Link from 'next/link'

const UpgradePage = () => {
  const isUpgrade = false

  return (
    <main className="p-4 md:p-8 max-w-6xl">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Upgrade Your Plan</h1>
      <p className="text-muted-foreground mb-8">Choose the plan that fits your needs and unlock premium features.</p>
      {isUpgrade ? (
        <div className="flex flex-col mx-auto items-center justify-center w-full max-w-lg bg-white border border-primary/20 rounded-3xl p-8 shadow-xl animate-fade-in space-y-4">
          <svg className="w-16 h-16 text-green-500 animate-bounce-slow" fill="none" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" fill="#22c55e22" />
            <path
              stroke="#22c55e"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12l2.5 2.5L16 9"
            />
          </svg>
          <h2 className="text-2xl font-bold text-primary text-center">You are already upgraded!</h2>
          <p className="text-primary/80 text-base text-center">
            Thank you for being a Pro user. Enjoy all premium features!
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-2 rounded-xl bg-primary text-white font-semibold text-sm shadow-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-primary/60"
          >
            Go to Dashboard
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 w-full mx-auto max-w-6xl grid-cols-1 md:grid-cols-2 px-2">
          {Plans.map((plan) => {
            const isYearly = plan.name.toLowerCase().includes('yearly')

            return (
              <div
                key={plan.priceId}
                className={`
                    relative bg-white rounded-3xl shadow-xl p-8 sm:p-10 flex flex-col items-center text-center
                    border border-gray-100 transition-all duration-300 transform hover:shadow-2xl hover:-translate-y-2
                    group overflow-hidden ${isYearly ? 'ring-2 ring-indigo-500 scale-105 z-10' : ''}
                  `}
              >
                {/* Animated background */}
                <div
                  className={`
                      absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-30
                      ${isYearly
                      ? 'bg-gradient-to-br from-indigo-400 to-pink-400'
                      : 'bg-gradient-to-br from-pink-300 to-indigo-200'}
                      group-hover:scale-110 transition-all duration-500
                    `}
                  style={{
                    top: '-60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                />

                {isYearly && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-5 py-1 rounded-full shadow-lg animate-pulse">
                    Recommended
                  </span>
                )}

                <h2 className="text-2xl font-extrabold mb-2 text-transparent bg-clip-text bg-primary drop-shadow">
                  {plan.name}
                </h2>

                <div className="text-4xl font-black mb-2 text-gray-900 tracking-tight flex items-end justify-center gap-2">
                  {plan.price}
                  {isYearly && (
                    <span className="text-xs font-semibold text-indigo-500 mb-1 animate-bounce">
                      Best Value
                    </span>
                  )}
                </div>

                <p className="text-gray-500 mb-6 text-sm sm:text-base">{plan.description}</p>

                <Link
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2 sm:px-8 sm:py-3 rounded-xl bg-primary text-white font-bold shadow-lg text-sm sm:text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-200 border-2 border-transparent hover:border-indigo-400"
                >
                  Buy Now
                </Link>
              </div>
            )
          })}
        </div>
      )}
    </main>
  )
}

export default UpgradePage
