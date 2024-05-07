import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import { useState } from 'react';
import {
    QueryClient,
    QueryClientProvider,
    useQuery,
  } from '@tanstack/react-query'            // imports for react-query
import "./MapPage.css"
import zoomPlugin from "chartjs-plugin-zoom"; // chart zoom plugin import
import 'leaflet/dist/leaflet.css' // import for map 
import 'chartjs-adapter-moment';    // import for chart's time series type
import { Line } from 'react-chartjs-2'  // Importing Line Geometry 
import { CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, TimeScale, Title, Tooltip } from 'chart.js' // importing compnents for chart
ChartJS.register(
    zoomPlugin,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale
  ); 
  
  

const queryClient = new QueryClient(); // calling query client

export default function MapPage() {  // entry point for both rendering of Map and chart component
    const [map,setMap]=useState<boolean>(true);
    return (
      <QueryClientProvider client={queryClient}>
        <div className="map_container" >
            {map?<Map key="map" />:<Chart key="chart"/>}   {/*Conditional Rendering based on the button if clicked or not*/}
            {/* <Chart/> */}
        <button onClick={()=>{setMap(!map)}}>{map?"Change to Chart":"Change to Map"}</button> {/*Button for switching between map nad chart*/}
        </div>
      </QueryClientProvider>
    )
  }
const Map = () => {                         // map compnent function
    const { isPending, error, data } = useQuery({  // query for API call using react-query
        queryKey: ['repoData'],
        queryFn: () =>
          fetch('https://disease.sh/v3/covid-19/countries').then((res) =>
            res.json(),
          ),
      })
      console.log(data);
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
      if (!data || data.length === 0) return 'No data available'

  return (
    <MapContainer style={{ height: '600px', width: '100%' }} center={[51.505, -0.09]} zoom={5}>   {/*map container*/}
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {/*data obtained from the API is not being rendered using map function inside which all the markers are rendered */}
    {               
        data?.map((val:any)=>{
            return(
                <Marker key={val.countryInfo._id} position={[val.countryInfo.lat, val.countryInfo.long]}>
                    <Popup>             {/*Setting the text inside popup*/}
                        <p>{`Country: ${val.country}`}</p>
                        <p>{`Active Cases: ${val.active}`}</p>
                        <p>{`Recovered: ${val.recovered}`}</p>
                        <p>{`Deaths: ${val.deaths}`}</p>
                    </Popup>
                </Marker>
            )
        })
    }
  </MapContainer>
  )
}

{/*Option parameter that specifies configuration for line chart to be drawn*/}
const options = {   
    scales: {
      x: {
        ticks: {
          font: {
              size: 14,
          }
      },
     
        // max: currentTime,
        // min: currentDateTime, // this is not current date time, but it has logic whether to output tomorrows 12pm or todays.
        // alignToPixels:true,
        type:'time' as const,
          title: {
              display:true,
              text:'timestamps' as const 
          },
      },
      y: {
        ticks: {
          font: {
              size: 14,
          }
      }},
      x1: {
        ticks: {
          font: {
              size: 12,
          }
        },
        type: 'time' as const,
        time: {
          unit: 'day' as const,
          // displayFormats: {
          //   month: 'DD'
          // }
        },
        // position: 'bottom',
      }
  },
    tension: 0.3,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltips: {
        mode: 'index',
        intersect: false,
    },
      legend: {
        position: "bottom" as const,
        labels: {
          font: {
            size: 18,
          },
        },
      },
      
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
            speed:0.1
          },
          drag:{
            enabled:true,
            mode:"x" as const,
            modifierKey:'shift' as const,
            backgroundColor:'rgba(0,0,0,0.3)'
          },
          mode: "x" as const,
          // speed: 100
        },
        pan: {
          enabled: true,
          mode: "x" as const,
          // speed: 0.5
        },
        limits: {
          // y: {min: 0, max:100},
          // x: { min: 1680516080000,
          //   max: 1680616080000,}
        },
      }
    },
  };
const Chart =()=>{          {/*Chart Component*/}
      
    const { isPending, error, data } = useQuery({
        queryKey: ['repoData2'],
        queryFn: () =>
          fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=all').then((res) =>
            res.json(),
          ),
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message
      if (!data || data.length === 0) return 'No data available'
      console.log(data);
      const labels = Object.keys(data?.cases);  // extracting the values to be displayed on chart
      const values = Object.values(data?.cases); // extracting the labels to be displayed on chart
      const Dataa = {           // this Dataa object is prepared here that will lateron be passed to the Line component
        labels: labels,        
        datasets: [
          {
            label: 'Cases',
            data: values,
            borderColor: 'rgba(75,192,192,1)',     
            backgroundColor: 'rgba(75,192,192,0.4)',
          },
        ],
      };
      return (
        <>
        <Line options={options} data={Dataa}/>      {/* rendering the line graph*/}
        </>
      )
}