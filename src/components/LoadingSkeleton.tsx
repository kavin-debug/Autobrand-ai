import React from 'react'

const SkeletonLine: React.FC<{ width?: string; height?: number }> = ({
  width = '100%',
  height = 14,
}) => (
  <div
    className="skeleton rounded"
    style={{ width, height, borderRadius: 6 }}
  />
)

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-5 w-full content-appear">
      {/* Tab skeleton */}
      <div className="flex gap-2">
        {[80, 70, 60].map((w, i) => (
          <div key={i} className="skeleton rounded-lg" style={{ width: w, height: 36 }} />
        ))}
      </div>

      {/* Platform badge skeleton */}
      <div className="flex items-center justify-between">
        <div className="skeleton rounded-full" style={{ width: 110, height: 24 }} />
        <div className="skeleton rounded-lg" style={{ width: 70, height: 28 }} />
      </div>

      {/* Content skeleton */}
      <div className="flex flex-col gap-3 mt-2">
        <SkeletonLine />
        <SkeletonLine width="90%" />
        <SkeletonLine width="95%" />
        <SkeletonLine width="75%" />
        <div style={{ height: 8 }} />
        <SkeletonLine width="85%" />
        <SkeletonLine width="100%" />
        <SkeletonLine width="60%" />
      </div>

      {/* Loading status */}
      <div
        className="flex items-center gap-3 mt-2 px-4 py-3 rounded-xl"
        style={{
          background: 'rgba(255, 107, 53, 0.05)',
          border: '1px solid rgba(255, 107, 53, 0.1)',
        }}
      >
        <span
          className="inline-block w-4 h-4 rounded-full border-2"
          style={{
            borderColor: 'rgba(255,107,53,0.4)',
            borderTopColor: '#FF6B35',
            animation: 'spin 0.8s linear infinite',
            flexShrink: 0,
          }}
        />
        <div className="flex flex-col gap-1">
          <span
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 13,
              fontWeight: 700,
              color: 'rgba(255, 107, 53, 0.9)',
            }}
          >
            AI is crafting your content...
          </span>
          <span
            style={{
              fontSize: 11,
              color: 'rgba(232,234,246,0.35)',
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Generating Instagram, LinkedIn & Email simultaneously
          </span>
        </div>
      </div>
    </div>
  )
}
