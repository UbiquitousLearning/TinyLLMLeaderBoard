import records_ from "../../data.json";

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