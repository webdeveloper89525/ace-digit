import { Box, Grid } from "@mui/material";
import { useMemo } from "react";
import { _getChartList } from "store/selectors";
import ChartCard from "./chart-card";
import DashboardTable from "./dashboard-table";

const tmpBackColors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 205, 86)",
];

const tmpCharts = [
  {
    title: "Title 1",
    config: {
      type: "pie",
      data: {
        labels: ["Jan", "Feb", "Mar", "Apr"],
        datasets: [
          {
            // label: "My First Dataset",
            // data: [26, 66, 45, 98],
            backgroundColor: [...tmpBackColors],
            // hoverOffset: 4,
            label: "Dataset",
            data: [300, 50, 100, 300, 50, 100, 200],
            // backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    },
  },
  {
    title: "Title 2",
    config: {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Dataset",
            data: [300, 50, 100, 300, 50, 100, 200],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    },
  },
  {
    title: "Title 3",
    config: {
      type: "line",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Dataset",
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    },
  },
];

const Dashboard = () => {
  const chartList = _getChartList();

  const charts = useMemo(() => {
    const charts = [...tmpCharts];

    if (chartList.length > 0) {
      const labels = chartList.map((item) => item.label);
      const data = chartList.map((item) => item.val);
      const backgroundColor = tmpBackColors.slice(0, data.length);

      charts[0].config.data.labels = [...labels];
      charts[0].config.data.datasets[0].data = [...data];
      charts[0].config.data.datasets[0].backgroundColor = [...backgroundColor];

      charts[1].config.data.labels = [...labels];
      charts[1].config.data.datasets[0].data = [...data];

      charts[2].config.data.labels = [...labels];
      charts[2].config.data.datasets[0].data = [...data];
    }

    return charts;
  }, [chartList]);

  return (
    <Box sx={{ pt: 3 }}>
      <Grid
        container
        spacing={2}
        sx={{ minHeight: 350, mb: 3 }}
      >
        {charts.map((chart, idx) => {
          return (
            <Grid
              key={idx}
              item
              xs={4}
            >
              <ChartCard chart={chart} />
            </Grid>
          );
        })}
      </Grid>
      <DashboardTable />
    </Box>
  );
};

export default Dashboard;
