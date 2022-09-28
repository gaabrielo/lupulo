import { ArrowBendDownRight, CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { CustomSelect } from '../components/CustomSelect';
import { ListItem } from '../components/ListItem';
import { format } from 'date-fns';

interface Props {
  handleNewAnalysis: () => void;
}

interface WeatherDataProps {
  humidity?: number | null;
  temperature?: number | null;
  climaticCondition?: string | null;
}

export function Dash({ handleNewAnalysis }: Props) {
  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [lastAnalysisDate, setLastAnalysisDate] = useState(null);

  useEffect(() => {
    const date = localStorage.getItem('lastAnalysisDate');

    if (date) setLastAnalysisDate(JSON.parse(date));

    try {
      fetch(
        'https://api.openweathermap.org/data/2.5/weather?lat=-24.2817&lon=-53.8404&appid=4917b81e0867695458dc26cdc1daac35&lang=pt_br'
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setWeatherData({
            humidity: data.main.humidity,
            temperature: data.main.temp - 273.15,
            climaticCondition: data.weather[0].description,
          });
        });
    } catch (e: any) {
      console.log(e.message);
    }
  }, []);

  return (
    <div className="mt-14 px-2 w-full max-w-lg mx-auto">
      {lastAnalysisDate && (
        <div className="rounded-lg flex justify-between bg-black text-white px-5 py-2 mb-5 font-[400]">
          <p>Última análise</p>
          <p>
            {format(new Date(lastAnalysisDate), "MM/dd/yyyy' às ' HH:mm'h'")}
          </p>
        </div>
      )}

      <div className="grid grid-cols-5 gap-5 min-h-40 mb-5">
        <button
          onClick={handleNewAnalysis}
          className="h-full col-span-2 bg-black rounded-lg px-5 py-4 flex flex-col justify-between group border hover:bg-white border-transparent hover:border-black text-white hover:text-black transition-all"
        >
          <h1 className="text-white text-left group-hover:text-black transition-all">
            Gerar nova análise
          </h1>

          <ArrowBendDownRight size="2rem" />
        </button>

        <div className="h-full col-span-3 px-5 py-4 bg-[#FEF680] rounded-lg">
          <ListItem
            firstItem
            value={`${weatherData?.temperature?.toFixed(2)}ºC`}
            label="Temperatura"
            isLoading={!weatherData}
          />
          <ListItem
            value={`${weatherData?.humidity?.toFixed(2)}%`}
            label="Umidade"
            isLoading={!weatherData}
          />
          <ListItem
            lastItem
            value={weatherData?.climaticCondition ?? ''}
            label="Cond. climática"
            isLoading={!weatherData}
          />
        </div>
      </div>

      <CustomSelect selected={true} onClick={() => {}} />
    </div>
  );
}
