import "./App.css";
import Arxiv from "./assets/arxiv.svg";
import { BarChartHorizontal, BarChartBig, BadgeInfo } from "lucide-react";
import {
  PageActions,
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "./lib/page-header";
import {
  SubTitle,
  SubTitleActions,
  SubTitleDescription,
  SubTitleHeading,
} from "./lib/sub-title";
import { Button } from "./components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { DataTable } from "./Table";
import { BubbleChart, BarChart } from "./BubuleChart";
// import { BubuleChart } from "./BubuleChart";

function App() {
  return (
    <div className="container font-mono">
      <div className=" h-screen flex items-center justify-center">
        <PageHeader>
          <div className="Logo flex items-center justify-center mt-6">
            <img src="/Logo.webp" alt="TinyLLM" className="w-64 h-64" />
          </div>
          <PageHeaderHeading className="hidden sm:block">
            🧐 How{" "}
            <span className="bg-clip-text bg-gradient-to-r from-pink-400 to-yellow-500 text-transparent">
              small LLMs{" "}
            </span>
            {"  "}
            works{" "}
            <span className="underline decoration-dashed decoration-yellow-500 decoration-3 underline-offset-2">
              on Device
            </span>
            ?
          </PageHeaderHeading>
          <PageHeaderHeading className="sm:hidden">
            📈 TinyLLM LeaderBoard
          </PageHeaderHeading>
          <PageHeaderDescription>
            Let's Run them on Device and see how they perform!
          </PageHeaderDescription>
          <PageActions>
            <Button
              variant="outline"
              onClick={() => {
                document
                  .getElementById("leaderboard")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <BarChartHorizontal className="mr-2 h-4 w-4" />
              LeaderBoard
            </Button>
            <Button
              onClick={() => {
                document
                  .getElementById("data-analysis")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <BarChartBig className="mr-2 h-4 w-4" />
              Data Analysis
            </Button>
            <Button variant={"secondary"}>
              {/* Arxiv Logo */}
              <img src={Arxiv} alt="Arxiv" className="w-4 h-4 mr-2" />
              Paper
            </Button>
          </PageActions>
        </PageHeader>
      </div>
      <div className="h-screen flex flex-col">
        <SubTitle id="leaderboard">
          <div>
            <SubTitleHeading>📊 LeaderBoard</SubTitleHeading>
            <SubTitleDescription>
              Here is the LeaderBoard of TinyLLMs
            </SubTitleDescription>
          </div>

          <SubTitleActions>
            <Button variant="outline">View All</Button>
          </SubTitleActions>
        </SubTitle>
        <Alert>
          <div
            className="flex flex-row space-x-2 align-middle"
            style={{ alignItems: "center" }}
          >
            <BadgeInfo className="h-4 w-4" />
            <AlertTitle className="font-bold">Notes</AlertTitle>
          </div>

          <AlertDescription className="px-4">
            <span className="font-semibold">
              Small LLMs(whose parameters size &lt; 7B) are tested on various
              devices and the performance is measured.
            </span>
            {/* Generate Lists */}
            <span className="block mt-2">Experiment Details:</span>
            <ul className="list-disc list-outside	">
              <li>
                🏖️ Target Devices include Xiaomi 12S(Snapdragon8Gen1,12G
                Memory),Meizu 18Pro(Snapdragon888,8G Memory),Pixel 7Pro(Google
                Tensor2,12G Memory),Xiaomi 14(Snapdragon8Gen3,16G Memory). More
                Devices will be added soon.
              </li>
              <li>
                🛸 Performance Metrics tested with{" "}
                <a
                  href="https://github.com/ggerganov/llama.cpp"
                  className="underline font-semibold"
                >
                  llama.cpp
                </a>{" "}
                library.{" "}
              </li>
            </ul>
          </AlertDescription>
        </Alert>
        <DataTable />
        <div className="h-32"></div>
      </div>
      <div className="flex flex-col">
        <SubTitle id="data-analysis">
          <div>
            {" "}
            <SubTitleHeading>📈 Data Analysis</SubTitleHeading>
            <SubTitleDescription>
              Lantency & Memory data profiled on Xiaomi 14 Device
            </SubTitleDescription>
          </div>
        </SubTitle>
        <BubbleChart />
        <BarChart />
      </div>
    </div>
  );
}

export default App;
