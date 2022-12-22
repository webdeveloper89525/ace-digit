// import { CardContent, CardHeader } from "@material-ui/core";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Chart as ChartItem, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);

const ChartCard = (props) => {
  const { chart } = props;
  console.log("chart: ", chart);

  return (
    <Card
      variant="outlined"
      sx={{ height: "100%", display: "flex", flexDirection: "column" }}
    >
      <CardHeader title={chart.title} />
      <CardContent
        sx={{
          flexGrow: 1,
        }}
      >
        <ChartItem
          type={chart.config}
          {...chart.config}
          options={{
            ...chart.config.options,
            responsive: true,
            maintainAspectRatio: false,
          }}
          redraw={true}
        />
      </CardContent>
    </Card>
  );
};

export default ChartCard;
