export interface Citation {
  IEEE: string;
  APA: string;
  MLA: string;
}

export interface Dataset {
    name: string;
    link: string;
    usage_tips: string;
}

export interface Project {
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  steps: string[];
  expected_outcome: string;
  datasets: Dataset[];
  tools_frameworks: string[];
}

export interface AbstractAnalysis {
    input_type: 'abstract';
    key_findings: string[];
    methods: string[];
    limitations: string[];
    potential_extensions: string[];
    citation: Citation;
    bib_entry: string;
    suggested_projects: Project[];
    explain_like_im_5?: string;
}

export interface TopicAnalysis {
    input_type: 'topic';
    key_findings: string[];
    methods: string[];
    limitations: string[];
    potential_extensions: string[];
    citation: Citation;
    bib_entry: string;
    suggested_projects: Project[];
    explain_like_im_5?: string;
}

export type AnalysisResult = AbstractAnalysis | TopicAnalysis;