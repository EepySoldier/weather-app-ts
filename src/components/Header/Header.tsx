import "./Header.scss";

export default function Header() {
  return (
    <h1 className="Header">
      Weather data for{" "}
      {new Date().getHours() > 12
        ? new Date().getHours() - 12
        : new Date().getHours()}
      {":"}
      {new Date().getMinutes().toString().padStart(2, "0")}
      {new Date().getHours() > 12 ? " PM" : " AM"}
    </h1>
  );
}
