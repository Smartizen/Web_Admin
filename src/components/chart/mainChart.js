import React, { useState, useEffect } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle, hexToRgba } from '@coreui/utils';

const brandInfo = getStyle('info') || '#20a8d8';

const MainChart = (attributes) => {
  const [label, setLabel] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    function countUser() {
      let datalabel = [];
      datalabel = label.map((lb) => 0);
      attributes.data.rows.forEach((data) => {
        datalabel[new Date(data.created_at).getDate() - 1] += 1;
      });
      return datalabel;
    }
    const getLabel = () => {
      let current = new Date(attributes.data.rows[0].created_at);
      setLabel(getDaysInMonth(current.getMonth(), current.getFullYear()));
      setDataUser(countUser());
    };
    if (attributes.data) getLabel();
  }, [attributes]);

  const defaultDatasets = (() => {
    let data1 = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ];

    if (attributes.data) {
      data1 = dataUser;
    }

    return [
      {
        label: 'My First dataset',
        backgroundColor: hexToRgba(brandInfo, 10),
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        data: data1,
      },
    ];
  })();

  const defaultOptions = (() => {
    return {
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              drawOnChartArea: false,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              maxTicksLimit: 5,
              stepSize: Math.ceil(16 / 5),
              max: 16,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      elements: {
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    };
  })();

  function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
      days.push(
        new Date(date).getDate().toString() + '/' + (new Date(date).getMonth() + 1).toString()
      );
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  // render
  return (
    <>
      <CChartLine
        {...attributes}
        datasets={defaultDatasets}
        options={defaultOptions}
        labels={label}
      />
    </>
  );
};

export default MainChart;
