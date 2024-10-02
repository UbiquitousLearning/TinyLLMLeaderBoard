import { BadgeInfo, BarChartBig, BarChartHorizontal } from "lucide-react";
import "./App.css";
import { Button } from "./components/ui/button";
import Arxiv from "./assets/arxiv.svg";

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
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";
import { InfoTable } from "./Table";
import { TextHoverEffect } from "./components/ui/text-hover-effect";
import { Cover } from "./components/ui/cover";
import { HeroHighlight, Highlight } from "./components/ui/hero-highlight";
import { motion } from "framer-motion";
import { FeatureCard, FeatureDescription, FeatureTitle } from "./lib/feature";
export function NewApp() {
    return (
      <div className="container font-mono">
        <div className="h-screen flex items-center justify-center">
          {/* <div> */}
          <HeroHighlight containerClassName="w-screen h-screen">
            {/* make  TextHoverEffect underneath the pageheader */}

            <TextHoverEffect text="SLM" style={{ marginBottom: "-10%" }} />
            <PageHeader className="py-2 md:py-2 md:pb-8 lg:py-2">
              <PageHeaderHeading className="hidden sm:block">
                {/* <HeroHighlight> */}
                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                >
                  🤩 All we know about <Cover>Small LLMs </Cover>
                  <br />
                  {/* <span className="underline decoration-dashed decoration-yellow-500 decoration-3 underline-offset-2"> */}
                  <div className="py-1 my-2">
                    <Highlight className="text-black dark:text-white ">
                      on Edge Devices
                    </Highlight>
                  </div>
                  {/* </span> */}
                </motion.h1>
                {/* </HeroHighlight> */}
              </PageHeaderHeading>
              <PageHeaderHeading className="sm:hidden">
                📈 Small LLM
              </PageHeaderHeading>
              <PageHeaderDescription>
                SURVEY, MEASUREMENTS, AND INSIGHTS
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
                  Accuracy
                </Button>
                <Button
                  onClick={() => {
                    document
                      .getElementById("data-analysis")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  <BarChartBig className="mr-2 h-4 w-4" />
                  Cost on Device
                </Button>
                <Button
                  variant={"secondary"}
                  onClick={() =>
                    window.open("https://arxiv.org/pdf/2409.15790")
                  }
                >
                  {/* Arxiv Logo */}
                  <img src={Arxiv} alt="Arxiv" className="w-4 h-4 mr-2" />
                  Paper
                </Button>
              </PageActions>
            </PageHeader>
            {/* </div> */}
          </HeroHighlight>
        </div>
        <div className="h-screen flex flex-col">
          <SubTitle id="leaderboard">
            <div>
              <SubTitleHeading>📊 Accuracy Table</SubTitleHeading>
              <SubTitleDescription>
                The evaluation results of small LM (whose parameters size &lt;
                6B).
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
              {/* Generate Lists */}
              <span className="block mt-2">Experiment Details:</span>
              <ul className="list-disc list-outside	">
                <li>
                  🏖️ <strong>Commonsense reasoning Accuracy</strong> is the
                  average of
                  hellaswag,truthfulqa_mc2,winogrande,commonsense_qa,piqa,openbookqa,boolq.
                  <br />
                  <strong>Problem solving</strong> is the average of
                  arc_easy,arc_challenge,mmlu.
                  <br />
                  <strong>Math</strong> is the average of gsm8k,minerva_math.
                </li>
                <li>
                  🛸 Performance Metrics tested with{" "}
                  <a
                    href="https://github.com/EleutherAI/lm-evaluation-harness"
                    className="underline font-semibold"
                  >
                    lm-evaluation-harness
                  </a>{" "}
                  library.{" "}
                </li>
                <li>
                  🚀 Icons: 🤖 for base model, 💠 for Instruct finetuned model.
                </li>
              </ul>
            </AlertDescription>
          </Alert>
          <InfoTable />
          <div className="h-32"></div>
        </div>
        <div className="flex flex-col">
          <SubTitle id="data-analysis">
            <div>
              {" "}
              <SubTitleHeading>📈 Data Analysis</SubTitleHeading>
            </div>
          </SubTitle>
          <div className="relative mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-9 mt-2 xl:border rounded-md dark:border-neutral-800">
              <div key="f1" className="col-span-1 lg:col-span-5 ">
                <FeatureCard className="border-b lg:border-r dark:border-neutral-800">
                  <FeatureTitle> Overview of SLMs</FeatureTitle>
                  <FeatureDescription>
                    SLMs have gained increasing attention from both the research
                    and industrial communities.
                  </FeatureDescription>
                  <div className=" h-full w-full">
                    <img
                      src="https://github.com/UbiquitousLearning/SLM_Survey/raw/main/figs/overview.png"
                      alt="overivew "
                    />
                  </div>
                </FeatureCard>
                <FeatureCard className="border-b lg:border-r dark:border-neutral-800">
                  <FeatureTitle> Capabilities of SLM</FeatureTitle>
                  <FeatureDescription>
                    The charts show substantial performance improvements across
                    all tasks between 2022 and 2024. Specifically, model
                    performance improved by 10.4%, 13.5%, and 13.5% for the
                    three tasks, respectively.
                  </FeatureDescription>
                  <div className=" h-full w-full">
                    <img
                      src="https://github.com/UbiquitousLearning/SLM_Survey/raw/main/figs/SLM_Capabilities.png"
                      alt="overivew "
                    />
                  </div>
                </FeatureCard>
              </div>
              <FeatureCard
                key="f3"
                className="border-b col-span-1 lg:col-span-4 dark:border-neutral-800"
              >
                <FeatureTitle> Runtime Cost of SLM</FeatureTitle>
                <FeatureDescription>
                  The inference latency and memory usage within each size group
                  ( 0.1-1B, 1-2B, and 2-3B) is relatively similar and aligns
                  with the latency increase as the model size grows.For models
                  of similar size from different architectures, the first token
                  time during the prefill stage vary significantly.However, the
                  model’s latency during the decode stage more closely follows a
                  linear relationship with model size.
                </FeatureDescription>
                <div className=" h-full w-full   align-middle ">
                  <img
                    src="https://raw.githubusercontent.com/UbiquitousLearning/SLM_Survey/refs/heads/main/figs/runtime_cost.png"
                    alt="overivew "
                    style={{
                      objectFit: "contain",
                      flexGrow: 0,
                      marginTop: "10%",
                    }}
                  />
                </div>
              </FeatureCard>
              <FeatureCard
                key="f4"
                className="border-b col-span-1 lg:col-span-9 dark:border-neutral-800"
              >
                <FeatureTitle>
                  {" "}
                  Architecture and Datasets over time
                </FeatureTitle>
                <FeatureDescription>
                  While we focus on only decoder-only transformer SLMs, their
                  specific configurations still diversify.but we can conclude
                  some common trends.
                  <li>
                    {" "}
                    MHA is gradually being phased out and replaced by GQA.
                  </li>
                  <li>
                    Standard FFN is gradually being phased out and replaced by
                    Gated FFN.
                  </li>
                  <li>
                    The activation function of FFN was mostly ReLU in 2022, and
                    then changed to GELU and its variants in 2023. For those
                    released in 2024, SiLU becomes the dominant type.
                  </li>
                  <li>
                    We also investigate how the open-sourced pre-training
                    datasets are used in training the SLMs,and you can see how
                    they change over time.
                  </li>
                </FeatureDescription>
                <div className=" h-full w-full   align-middle ">
                  <img src="https://github.com/UbiquitousLearning/SLM_Survey/raw/main/figs/Figure-2b-%5BThe%20architecture%20analysis%20of%20the%20SLM%5D-1.png" />
                  <img
                    src="https://github.com/UbiquitousLearning/SLM_Survey/raw/main/figs/Figure-3-%5BThe%20usage%20frequence%20of%20pre-training%20dataset%5D-1.png"
                    style={{ marginTop: "1%" }}
                  />
                </div>
              </FeatureCard>
            </div>
          </div>
        </div>
      </div>
    );
}
