import { HttpClient, HttpResponse } from "./http";
import { GptRequest, GptResponse, TranslationRequest, TranslationResponse } from "./types";


export class RestService {

    http: HttpClient;
    baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
        this.http =  new HttpClient({ baseURL: this.baseURL });
    }

    public async translate(params: TranslationRequest) {
        return this.http.post<HttpResponse<TranslationResponse>, TranslationRequest>('/', params);
    }

    public async gpt(params: GptRequest) {
        return this.http.post<HttpResponse<GptResponse>, GptRequest>('/', params);
    }
}

const service = new RestService(process.env.REACT_APP_API || 'http://localhost:8000');

export default service;