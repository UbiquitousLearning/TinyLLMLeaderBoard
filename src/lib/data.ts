import records_ from "../../data.json";
import info_ from "../../SLM.json"
export type Record = {
    name: string;
    link: string;
    quantization: "INT4" | "INT8" | "FP16" | "FP32";
    device: string;
    memory: number;
    prefilling_latency: string;
    decoding_latency: string;
    performance: {
        mmlu: number;
        wino: number;
        hellaswag: number;
    }
    // performance: number[];
};
console.log(records_)
export const records: Record[] = records_ as any as Record[];
//Model	Parameters	Type	Release Date (Year.Month)	affiliation	Link (paper or huggingface)	Attention Type (MHA/MQA/GQA/etc)	Layer Number	Hidden Size	Head Num	Activation	Vocabulary Size	FFN ratio	Architecture Innovation (e.g., weights sharing, etc)	Training Tokens	Training Datasets (unk -> closed dataset)	GPU-hours	Max Context Window	Training Innovations (e.g., Distillation)	Commonsense reasoning/understanding	Problem solving	Math	...	In-context Learning
// All string
export type Info = {
    Model: string;
    Parameters: string;
    Type: string;
    ReleaseDate: string;
    affiliation: string;
    Link: string;
    AttentionType: string;
    LayerNumber: string;
    HiddenSize: string;
    HeadNum: string;
    Activation: string;
    VocabularySize: string;
    FFNratio: string;
    ArchitectureInnovation: string;
    TrainingTokens: string;
    TrainingDatasets: string;
    GPUhours: string;
    MaxContextWindow: string;
    TrainingInnovations: string;
    Commonsensereasoning: string;
    Problemsolving: string;
    Math: string;
    IncontextLearning: string;
};
export const info: Info[] = info_ as any as Info[];