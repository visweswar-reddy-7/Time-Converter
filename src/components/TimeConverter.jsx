import {useEffect} from "react";
import {useState} from "react";
import TimeZoneDropdown from "./dropdown";

const TimeConverter = () => {
  const [timeZones, setTimeZones] = useState([]);
  const [fromTimeZone, setFromTimeZone] = useState('');
  const [time, setTime] = useState('');
  const [toTimeZone, setToTimeZone] = useState('');
  const [convertedTime, setConvertedTime] = useState('');
  const [converting, setConverting] = useState(false);

  const api_key = "GQ71S3G5QHWS"; //timeZonedb api key


  // Currencies -> https://api.frankfurter.app/currencies
  const fetchTimeZones = async () => {
    try {
      const res = await fetch(`https://api.timezonedb.com/v2.1/list-time-zone?key=${api_key}&format=json`);
      const data = await res.json();

      setTimeZones(data.zones.map(zone => zone.zoneName));
    } catch (error) {
      console.error("Error Fetching", error);
    }
  };

  useEffect(() => {
    fetchTimeZones();
  }, []);


  const convertTime = async () => {
    if (!time) return;
    setConverting(true);
    try {
      const res = await fetch(
        `https://api.timezonedb.com/v2.1/convert-time-zone?key=${api_key}&format=json&from=${fromTimeZone}&to=${toTimeZone}&time=${time}`
      );
      const data = await res.json();
      const tomilliseconds = data.toTimestamp * 1000;
      const toDate = new Date(tomilliseconds);

      console.log(toDate.toLocaleString()); // Output in local time zone format

      console.log(toDate.toUTCString()); // Output in UTC format

      setConvertedTime(toDate.toLocaleString());

    } catch (error) {
      console.error("Error Fetching", error);
    } finally {
      setConverting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md">
      <h2 className="mb-5 text-2xl font-semibold text-gray-700">
        Time Converter
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <TimeZoneDropdown
          timeZones={timeZones}
          title="From:"
          timeZone={fromTimeZone}
          setTimeZone={setFromTimeZone}
        />
        <TimeZoneDropdown
          timeZones={timeZones}
          timeZone={toTimeZone}
          setTimeZone={setToTimeZone}
          title="To:"
        />
      </div>

      <div className="mt-4">
        <label
          htmlFor="time"
          className="block text-sm font-medium text-gray-700"
        >
          Time:
        </label>
        <input
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="time"
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1"
        />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={convertTime}
          className={`px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
          ${converting ? "animate-pulse" : ""}`}
        >
          Convert
        </button>
      </div>

      {convertedTime && (
        <div className="mt-4 text-lg font-medium text-right text-blue-600">
          Converted Time: {convertedTime}
        </div>
      )}
    </div>
  );
};

export default TimeConverter;
