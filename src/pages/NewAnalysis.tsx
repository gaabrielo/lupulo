import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { styled } from '@stitches/react';
import { CaretLeft, CloudRain, Lightbulb } from 'phosphor-react';
import { useEffect, useState } from 'react';

const StyledRadio = styled(RadioGroupPrimitive.Item, {
  all: 'unset',
  backgroundColor: 'white',
  width: 20,
  height: 20,
  borderRadius: '100%',
  border: '1px solid #000',
  // boxShadow: `0 2px 10px #000`,
  '&:hover': { backgroundColor: 'rgba(0,0,0,0.065)' },
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
  position: 'relative',
  '&::after': {
    content: '""',
    display: 'block',
    width: 10,
    height: 10,
    borderRadius: '50%',
    backgroundColor: '#000',
  },
});

// Exports
export const RadioGroup = RadioGroupPrimitive.Root;
export const RadioGroupRadio = StyledRadio;
export const RadioGroupIndicator = StyledIndicator;

interface Props {
  handleGoBack: () => void;
}

export function NewAnalysis({ handleGoBack }: Props) {
  const [soilMoisture, setSoilMoisture] = useState('');
  const [biggerThanSix, setBiggerThanSix] = useState(true);
  const [responseData, setResponseData] = useState({
    message: null,
    obs: null,
    hours: null,
  });

  function handleHeightSelect(v: any) {
    setBiggerThanSix(v !== 'lessThanSix');
  }

  async function handleSubmit() {
    const args = {
      soilMoisture: Number(soilMoisture),
      secondPhase: biggerThanSix.toString(),
    };

    localStorage.setItem('lastAnalysisDate', JSON.stringify(new Date()));

    try {
      fetch(
        `${import.meta.env.VITE_API_URL}/irrigation?soilMoisture=${
          args.soilMoisture
        }&secondPhase=${args.secondPhase}`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw response;
        })
        .then((data) => {
          setResponseData({
            message: data[0],
            obs: data[1],
            hours: data[2],
          });
        });
    } catch (e: any) {
      console.log(e.message);
    }
  }

  return (
    <div className="mt-14 px-2 w-full max-w-lg mx-auto focus:ring-1 flex flex-col gap-5 font-[400]">
      <button onClick={handleGoBack} className="flex items-center gap-1">
        <CaretLeft size="1rem" />
        <span>Voltar</span>
      </button>

      <div>
        <label htmlFor="soil-moisture" className="block text-base mb-2">
          Umidade do solo
        </label>
        <input
          type="text"
          name="soil"
          id="soil-moisture"
          className="block w-full bg-transparent border border-gray-300 rounded-lg px-4 py-2 placeholder:text-gray-500 ring-black"
          placeholder="Ex: 45"
          onChange={(e) => setSoilMoisture(e.target.value)}
          value={soilMoisture}
        />
      </div>

      <div>
        <h1 className="text-base mb-2">Altura da planta</h1>

        <RadioGroup
          defaultChecked
          defaultValue="moreThanSix"
          aria-label="View density"
          onValueChange={handleHeightSelect}
        >
          <div className="flex gap-2 items-center mb-2">
            <RadioGroupRadio value="moreThanSix" id="r2">
              <RadioGroupIndicator />
            </RadioGroupRadio>
            <label htmlFor="r2" className="text-sm">
              Igual ou superior a 6m
            </label>
          </div>

          <div className="flex gap-2 items-center">
            <RadioGroupRadio value="lessThanSix" id="r1">
              <RadioGroupIndicator />
            </RadioGroupRadio>
            <label htmlFor="r1" className="text-sm">
              Abaixo de 6m
            </label>
          </div>
        </RadioGroup>
      </div>

      <button
        onClick={handleSubmit}
        className="w-fit ml-auto bg-black rounded-lg px-4 py-2 border hover:bg-white border-transparent hover:border-black text-white hover:text-black transition-all"
      >
        Gerar análise
      </button>

      {responseData.message && (
        <div className="rounded-lg w-full px-5 py-4 flex gap-5 items-center shadow-lg border border-gray-100">
          <div className="rounded-full p-2 bg-[#D9FFCB]">
            <CloudRain size="2rem" color="#0DBD83" />
          </div>

          <div>
            <p className="text-base font-[500]">{responseData.message}</p>
            {responseData.obs && (
              <span className="text-sm text-gray-600">{responseData.obs}</span>
            )}
          </div>
        </div>
      )}

      {responseData.hours && (
        <div className="rounded-lg w-full px-5 py-4 flex gap-5 items-center shadow-lg border border-gray-100">
          <div className="rounded-full p-2 bg-[#F2F8FF]">
            <Lightbulb size="2rem" color="#0077FF" />
          </div>

          <div>
            <p className="text-base font-[500]">Iluminação diária</p>
            <span className="text-sm text-gray-600">
              Iluminar artificialmente por mais{' '}
              {17 - Number(responseData.hours)} horas
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
