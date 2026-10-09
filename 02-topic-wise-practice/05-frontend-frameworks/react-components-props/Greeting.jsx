// A simple functional component with props and a default value
export default function Greeting({ name = "Guest", month }) {
  return (
    <h2>
      Welcome back, {name}! Here is your {month ?? "monthly"} spending overview.
    </h2>
  );
}

// Usage: <Greeting name="Asha" month="October" />
