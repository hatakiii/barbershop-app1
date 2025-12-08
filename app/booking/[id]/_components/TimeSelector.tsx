export default function TimeSelector({
  ALL_TIMES,
  selectedTime,
  setSelectedTime,
  bookedTimes = [],
}: {
  ALL_TIMES: string[];
  selectedTime: string | null;
  setSelectedTime: (t: string) => void;
  bookedTimes?: string[];
}) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {ALL_TIMES.map((time) => {
        const isBooked = bookedTimes.includes(time);

        return (
          <button
            key={time}
            disabled={isBooked}
            onClick={() => !isBooked && setSelectedTime(time)}
            className={`p-2 rounded-lg border transition ${
              isBooked
                ? "bg-red-200 text-red-800 cursor-not-allowed"
                : selectedTime === time
                ? "bg-green-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
