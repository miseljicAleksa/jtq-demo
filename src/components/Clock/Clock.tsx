import "./style.css";

const Clock: React.FC<{ currentTime: string }> = ({ currentTime }) => {
  return (
    <div className="timediv">
      <p className="time">{currentTime}</p>
    </div>
  );
};

export default Clock;
