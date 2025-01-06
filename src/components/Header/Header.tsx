import "./Header.scss";

export default function Header() {
  const date = new Date();
  const hour = date.getHours() % 12 || 12;
  const ampm = date.getHours() >= 12 ? "PM" : "AM";
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  return (
    <h1 className="Header">
      Weather data for {`${hour} ${ampm}, ${month} ${day}`}
    </h1>
  );
}
