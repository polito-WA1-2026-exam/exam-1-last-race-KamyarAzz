export type Segment = {
  from: string;
  to: string;
  line: string;
};

export type Line = {[key: string]: string[]};

export type Network = {
  lines: Line;
  segments: Segment[];
};
