type TrendingInput = {
  views: number;
  shares: number;
  branchCount: number;
  createdAt: Date;
  now?: Date;
};

export function calculateTrendingScore(input: TrendingInput) {
  const now = input.now ?? new Date();
  const ageHours = Math.max(1, (now.getTime() - input.createdAt.getTime()) / 3_600_000);
  const engagement = input.views + input.shares * 6 + input.branchCount * 10;
  const recencyBoost = 1 / Math.sqrt(ageHours);

  return Math.round(engagement * recencyBoost);
}
