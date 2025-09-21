type ApiSpreadProfile = {
  spreadProfile: string;
  bidSpread: number;
  askSpread: number;
  bid: number;
  ask: number;
};

type ApiEntry = {
  topo: { platform: string; server: string };
  spreadProfilePrices: ApiSpreadProfile[];
  ts: number;
};

export type ApiWrapper = {
  status: string;
  data: ApiEntry[];
  message?: string;
};

export type HistoryEntry = {
  id: number;
  instrument: string;
  currency: string;
  timestamp: string;
  data: ApiEntry[];
  created_at?: string;
};

export type HistoryWrapper = {
  status: string;
  data: {
    data: HistoryEntry[];
    pagination?: unknown;
    filter?: unknown;
  };
  message?: string;
};