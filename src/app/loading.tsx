
export default function Loading() {
  return (
    <main className="wrap" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <div className="skeleton-line wide" />
      <div
        className="skeleton-line"
        style={{ height: 32, width: "55%", marginTop: 18, marginBottom: 30 }}
      />
      <div className="product-grid">
        {Array.from({ length: 8 }, (_, i) => (
          <div className="product-skeleton" key={i}>
            <div className="skeleton-art" />
            <div className="skeleton-line wide" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        ))}
      </div>
    </main>
  );
}
