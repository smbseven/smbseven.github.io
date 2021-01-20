// Define initial function for positioning and data extraction from dataset (json)

function init() {
  
    // Variable to select the location of the bar chart from index.html
    let CHART = d3.selectAll("#bar").node();
  
    // Import data from samples.json
      d3.json("samples.json").then(importedData => {
      var data = importedData;
  
    // Get info from dataset
        test_sub = data.names;
        test_sample = data.samples;
        test_metadata = data.metadata;
  
    // Pre-Populate subject ID into dropdown
      const subjectselect = d3.select("#selDataset");
  
    // Build drop down list
      test_sub.forEach(namevalue =>{
        var option = subjectselect.append("option");
        option.text(namevalue);
        option.attr("value",namevalue);
      });
  
    // Barplot: Build arrays for axis and labels
      let sample_values = test_sample[0].sample_values;
      let otu_ids = test_sample[0].otu_ids;
      let otu_labels = test_sample[0].otu_labels;
    
    // Top 10 Subject OTU
      sample_values = sample_values.slice(0, 10);
      otu_ids = otu_ids.slice(0, 10);
      otu_labels = otu_labels.slice(0,10);
  
    // Format OTU ID string
      let otu_ids_list = otu_ids.map(otuid => 'OTU ' + otuid);
  
    // Reversing arrays 
      sample_values = sample_values.reverse();
      otu_ids_list = otu_ids_list.reverse();
      otu_labels = otu_labels.reverse();
    
    // bar chart trace
    var trace = {
      x: sample_values,
      y: otu_ids_list,
      text: otu_labels,
      type: "bar",
      orientation: "h"
    };
  
    // map data
    var chartData = [trace];
  
    // Apply title
    var layout = {
      title: "<b>Top 10 OTUs found in selected subject<b>"
    };
  
    // Create plot
    Plotly.newPlot(CHART, chartData, layout);
    
    // Bubble chart plot
    var trace1 = {
    //   type:"scatter",
      x: test_sample[0].otu_ids,
      y: test_sample[0].sample_values,
      text: test_sample[0].otu_labels,
      mode: 'markers',
      marker: {
        size: test_sample[0].sample_values,
        color: test_sample[0].otu_ids,
        colorscale: [[0,'rgb(1,1,255)'],[1,'rgb(255,1,1)']]
      },
      hovertext: "otu_labels"
    };
    
    var data = [trace1];
    
    var layout = {
      title: "<b>Operational Taxonomic Units (OTU) in Subject Sample<b>",
      showlegend: false
    };
      Plotly.newPlot('bubble', data, layout);
  
    // Demographic Data panel
      d3.select("#sample-metadata").append("p").text('ID: '+ test_metadata[0].id);
      d3.select("#sample-metadata").append("p").text('Ethnicity: '+ test_metadata[0].ethnicity);
      d3.select("#sample-metadata").append("p").text('Gender: '+ test_metadata[0].gender);
      d3.select("#sample-metadata").append("p").text('Age: '+ test_metadata[0].age);
      d3.select("#sample-metadata").append("p").text('Location: '+ test_metadata[0].location);
      d3.select("#sample-metadata").append("p").text('Bbtype: '+ test_metadata[0].bbtype);
      d3.select("#sample-metadata").append("p").text('Wfreq: '+ test_metadata[0].wfreq);
    
     // Call Gauge chart 
       init_gauge_chart();
    });
  };    
  
  // New function to update when subject changes in drop-down menu
  
    d3.selectAll("body").on("change", updatePlotly);
    var CHART = d3.selectAll("#bar").node();
    function updatePlotly() {
    var subjectselect = d3.select("#selDataset");
    var dataset = subjectselect.node().value;
      
    // This was hard ... te concept of an index
      let subjectindex = test_sub.indexOf(dataset);
    
    // Repeat: arrays
      let sample_values = test_sample[subjectindex].sample_values;
      let otu_ids = test_sample[subjectindex].otu_ids;
      let otu_labels = test_sample[subjectindex].otu_labels;
  
    // Reeat: slicing
      sample_values = sample_values.slice(0, 10);
      otu_ids = otu_ids.slice(0, 10);
      otu_labels = otu_labels.slice(0,10);
  
    // Repeat: Format OTU ID string
      let otu_ids_list = otu_ids.map(otuid => 'OTU ' + otuid);
  
    // Repeat: Reverse array
      sample_values = sample_values.reverse();
      otu_ids_list = otu_ids_list.reverse();
      otu_labels = otu_labels.reverse();
  
    // Repeat bar chart trace
      x = sample_values;
      y = otu_ids_list;
      text = otu_labels;
  
    // Re-style the Bar chart  
      Plotly.restyle(CHART, "x", [x]);
      Plotly.restyle(CHART, "y", [y]);
      Plotly.restyle(CHART, "text", [text]);
  
    // Repeat Plot the Bubble chart  
      var trace1 = {
        x: test_sample[subjectindex].otu_ids,
        y: test_sample[subjectindex].sample_values,
        text: test_sample[subjectindex].otu_labels,
        mode: 'markers',
        marker: {
          size: test_sample[subjectindex].sample_values,
          color: test_sample[subjectindex].otu_ids,
          colorscale: [[0,'rgb(0,0,255)'],[1,'rgb(255,0,0)']]
        }
      };
      
      var data = [trace1];
      
      var layout = {
        title: '<b>Operational Taxonomic Units (OTU) in Subject Sample<b>',
        showlegend: false
      };
      
      Plotly.newPlot('bubble', data, layout);
  
    // Repeat Demographic Data Panel for refresh data
  
      d3.select("#sample-metadata").selectAll('p').remove();
  
      d3.select("#sample-metadata").append("p").text('ID: '+ test_metadata[subjectindex].id);
      d3.select("#sample-metadata").append("p").text('Ethnicity: '+ test_metadata[subjectindex].ethnicity);
      d3.select("#sample-metadata").append("p").text('Gender: '+ test_metadata[subjectindex].gender);
      d3.select("#sample-metadata").append("p").text('Age: '+ test_metadata[subjectindex].age);
      d3.select("#sample-metadata").append("p").text('Location: '+ test_metadata[subjectindex].location);
      d3.select("#sample-metadata").append("p").text('Bbtype: '+ test_metadata[subjectindex].bbtype);
      d3.select("#sample-metadata").append("p").text('Wfreq: '+ test_metadata[subjectindex].wfreq);
  
     // Call function to restyle gauge chart
  
      restyle_gauge_chart(subjectindex);
  }
  // End of updatePlotly()
  
  init();