// Bonus Gauge chart taken from documentation

function  init_gauge_chart() { 
    var data = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: test_metadata[0].wfreq,
          title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs per week", font: {size:18} },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 9]},
            steps: [
              { range: [0, 1], color: "rgb(255,255,255)" },
              { range: [1, 2], color: "rgb(245,245,245)" },
              { range: [2, 3], color: "rgb(235,235,235)" },
              { range: [3, 4], color: "rgb(225,225,225)" },
              { range: [4, 5], color: "rgb(215,215,215)" },
              { range: [5, 6], color: "rgb(205,205,205)" },
              { range: [6, 7], color: "rgb(195,195,195)" },
              { range: [7, 8], color: "rgb(185,185,185)" },
              { range: [8, 9], color: "rgb(175,175,175)" }
            ],
          }
        }
      ];
      
      var layout = { width: 520, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data, layout);
    };



// Restyle_gauge_chart function is called from app.js when new subject is selected
  function restyle_gauge_chart(subjindex) {

    value = test_metadata[subjindex].wfreq;
    Plotly.restyle('gauge', "value", [value]);

  };