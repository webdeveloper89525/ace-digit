import { Box, Grid } from "@mui/material";
import ChartCard from "./chart-card";
import DashboardTable from "./dashboard-table";

const charts = [
  {
    title: "Title 1",
    config: {
      type: "pie",
      data: {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [300, 50, 100],
            backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"],
            hoverOffset: 4,
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
