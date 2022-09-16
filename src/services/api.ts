import axios from 'axios';

// export const api = axios.create({
//   baseURL: 'http://localhost:5000',
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     'Content-Type': 'text/plain',
//   },
// });

interface GetIrrigationStatusProps {
  soilMoisture: number;
  secondPhase: string;
}

export async function getIrrigationStatus(args: GetIrrigationStatusProps) {
  const res = await axios.get('http://localhost:5000/irrigation', {
    params: args,
  });

  return res;
}
