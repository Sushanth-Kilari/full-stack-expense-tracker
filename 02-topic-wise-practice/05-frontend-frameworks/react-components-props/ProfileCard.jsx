// Component composition: a card that shows a budget summary and renders children
function BudgetBar({ spent, limit }) {
  const pct = Math.min(100, Math.round((spent / limit) * 100));
  return (
    <div style={{ background: "#e5e7eb", borderRadius: 4 }}>
      <div style={{ width: `${pct}%`, background: pct > 90 ? "crimson" : "teal", color: "#fff", padding: "2px 6px" }}>
        {pct}%
      </div>
    </div>
  );
}

export default function ProfileCard({ name, email, spent, limit, children }) {
  return (
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: "1rem", maxWidth: 320 }}>
      <h3>{name}</h3>
      <p>{email}</p>
      <p>Spent Rs. {spent} of Rs. {limit}</p>
      <BudgetBar spent={spent} limit={limit} />
      {children}
    </div>
  );
}

// Usage: <ProfileCard name="Asha" email="asha@example.com" spent={8200} limit={10000}><small>Premium</small></ProfileCard>
