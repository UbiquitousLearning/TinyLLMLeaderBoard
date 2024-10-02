import { records } from "./lib/data";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

const data = {
  Winogrande: [],
  MMLU: [],
  Hellaswag: [],
  latency: [],
  catalog: [],
  memory: [],
} as any;

records
  .sort((a, b) => {
    return Number(a.memory) - Number(b.memory);
  })
  .forEach((record) => {
    if (record.device === "Xiaomi 14") {
      if (record.performance) {
        data["Winogrande"].push([
          record.decoding_latency.split("/")[2],
          record.performance.wino,
          record.memory,
          record.name,
          "Winogrande",
        ]);
        data["MMLU"].push([
          record.decoding_latency.split("/")[2],
          record.performance.mmlu,
          record.memory,
          record.name,
          "MMLU",
        ]);
        data["Hellaswag"].push([
          record.decoding_latency.split("/")[2],
          record.performance.hellaswag,
          record.memory,
          record.name,
          "Hellaswag",
        ]);
      }
      data["catalog"].push(record.name);
      data["latency"].push(record.decoding_latency.split("/")[2]);
      data["memory"].push(Number(record.memory));
    }
  });
console.log(data);
const bubbleOption = {
  title: {
    text: "Parameter Size,Inference Time vs Performance",
  },
  legend: {
    right: "1%",
    data: ["Winogrande", "MMLU", "Hellaswag"],
  },
  grid: {
    left: "5%",
    right: "2%",
  },
  xAxis: {
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
    scale: true,
    max: 180,
    name: "Inference Time (ms)",
    nameLocation: "center",
  },
  yAxis: {
    splitLine: {
      lineStyle: {
        type: "dashed",
      },
    },
    scale: true,
    name: "Performance Score",
    nameLocation: "end",
    nameTextStyle: {
      padding: 2,
    },
  },
  series: [
    {
      name: "Winogrande",
      data: data["Winogrande"],
      type: "scatter",
      symbolSize: function (data: number[]) {
        return Math.sqrt(data[2] * 1024);
      },
      emphasis: {
        focus: "series",
        label: {
          show: true,
          formatter: function (param: any) {
            return param.data[3];
          },
          position: "top",
        },
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(120, 36, 50, 0.5)",
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: "rgb(251, 118, 123)",
          },
          {
            offset: 1,
            color: "rgb(204, 46, 72)",
          },
        ]),
      },
    },
    {
      name: "MMLU",
      data: data["MMLU"],
      type: "scatter",
      symbolSize: function (data: number[]) {
        return Math.sqrt(data[2] * 1024);
      },
      emphasis: {
        focus: "series",
        label: {
          show: true,
          formatter: function (param: any) {
            return param.data[3];
          },
          position: "top",
        },
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(25, 100, 150, 0.5)",
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: "rgb(129, 227, 238)",
          },
          {
            offset: 1,
            color: "rgb(25, 183, 207)",
          },
        ]),
      },
    },
    {
      name: "Hellaswag",
      data: data["Hellaswag"],
      type: "scatter",
      symbolSize: function (data: number[]) {
        return Math.sqrt(data[2] * 1024);
      },
      emphasis: {
        focus: "series",
        label: {
          show: true,
          formatter: function (param: any) {
            return param.data[3];
          },
          position: "top",
        },
      },
      itemStyle: {
        shadowBlur: 10,
        shadowColor: "rgba(255, 218, 185, 0.7)", // 浅灰色阴影
        shadowOffsetY: 5,
        color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
          {
            offset: 0,
            color: "rgb(255, 218, 185)", // 淡橙色
          },
          {
            offset: 1,
            color: "rgb(255, 165, 0)", // 橙色
          },
        ]),
      },
    },
  ],
};
const barOption = {
  title: { text: "Inference Time" },
  xAxis: {
    type: "category",
    data: data["catalog"],
    axisLabel: {
      interval: 0,
      rotate: 45,
    },
  },
  grid: {
    left: "5%",
    right: "5%",
    bottom: "25%",
  },
  yAxis: [
    {
      type: "value",
      name: "Latency (ms)",
    },
    {
      name: "Memory (GB)",
      type: "value",
      // offset
    },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      label: {
        show: true,
      },
      type: "shadow",
      // text is [yAxis Name]: {c}
      formatter: "{a} <br/>{b} : {c} ({d}%)",
    },
  },
  series: [
    {
      name: "Latency",
      data: data["latency"],
      type: "line",
      itemStyle: {
        borderRadius: [5, 5, 0, 0],
        color: "#FFBE7A",
      },
    },
    {
      name: "Memory",
      data: data["memory"],
      type: "bar",
      yAxisIndex: 1,

      itemStyle: {
        borderRadius: [5, 5, 0, 0],
        color: "#82B0D2",
      },
    },
  ],
};

export function BubbleChart() {
  return (
    // @ts-ignore
    <ReactECharts
      option={bubbleOption}
      lazyUpdate={true}
      style={{ height: "60vh", width: "100%" }}
    />
  );
}
export function BarChart() {
  return (
    <ReactECharts
      option={barOption}
      lazyUpdate={true}
      style={{ height: "60vh", width: "100%" }}
    />
  );
}