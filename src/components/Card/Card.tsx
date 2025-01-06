import "./Card.scss";

type TCardProps = {
  title: string;
  value: string | number;
};

export default function Card({ title, value }: TCardProps) {
  return (
    <div className="Card">
      {title && `${title}:`} {value}
    </div>
  );
}
