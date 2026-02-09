export default function SectionSkeleton() {
  return (
    <div className="skeleton-section">
      <div className="skeleton-pulse skeleton-title" />
      <div className="skeleton-pulse skeleton-subtitle" />
      <div className="skeleton-cards">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton-pulse skeleton-card" />
        ))}
      </div>
    </div>
  )
}
