const TimeZoneDropdown = ({
  timeZones,
  timeZone,
  setTimeZone,
  title = "",
}) => {

  return (
    <div>
      <label
        htmlFor={title}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>

      <div className="mt-1 relative">
        <select
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {timeZones
            .map((timeZone) => {
              return (
                <option value={timeZone} key={timeZone}>
                  {timeZone}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default TimeZoneDropdown;
