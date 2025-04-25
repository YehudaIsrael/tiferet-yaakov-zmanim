export default function Omer({ omer }: { omer: string }) {
  return (
    <div className="top-center">
      <div className="omer">
        <label>ספירת העומר</label>
        <span>{omer.match(/\d+/)?.[0]}</span>
      </div>
    </div>
  );
}
