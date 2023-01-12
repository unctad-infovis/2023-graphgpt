import React, {
  useState, useEffect, useMemo, useCallback
} from 'react';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartScatter.jsx';

import '../styles/styles.less';

function App() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const series = useMemo(() => [{
    data: [],
    id: 'low_income',
    marker: {
      symbol: 'circle'
    },
    name: 'Low income'
  }, {
    data: [],
    id: 'lower_middle_income',
    marker: {
      symbol: 'circle'
    },
    name: 'Lower middle income'
  }, {
    data: [],
    id: 'upper_middle_income',
    marker: {
      symbol: 'circle'
    },
    name: 'Upper middle income'
  }, {
    data: [],
    id: 'high_income',
    marker: {
      symbol: 'circle'
    },
    name: 'High income'
  }], []);

  const cleanData = useCallback((data) => {
    data.map((el) => {
      if (el.wb_income_classification === 'Low income') {
        series[0].data.push({ x: parseFloat(el.download_speed), y: parseFloat(el.skilled_workers), name: el.country });
      } else if (el.wb_income_classification === 'Lower middle income') {
        series[1].data.push({ x: parseFloat(el.download_speed), y: parseFloat(el.skilled_workers), name: el.country });
      } else if (el.wb_income_classification === 'Upper middle income') {
        series[2].data.push({ x: parseFloat(el.download_speed), y: parseFloat(el.skilled_workers), name: el.country });
      } else if (el.wb_income_classification === 'High income') {
        series[3].data.push({ x: parseFloat(el.download_speed), y: parseFloat(el.skilled_workers), name: el.country });
      }
      return false;
    });
    return series;
  }, [series]);

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2023-graphgpt/' : './'}assets/data/2023-graphgpt_data.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON(body))));
    } catch (error) {
      console.error(error);
    }
  }, [cleanData]);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        idx="1"
        data={dataFigure}
        note="Dotted lines represent averages"
        source="UNCTAD based on data from ITU and M-Lab."
        subtitle="TODO, explain data and year"
        suffix=""
        title="Which countries may be better positioned to benefit from the diffusion of AI technologies?"
      />
      )}
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

export default App;
