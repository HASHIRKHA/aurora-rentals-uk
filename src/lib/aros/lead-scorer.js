export function scoreLead(inquiry = {}) {
  let score = 0;

  if (inquiry.inquiry_type === 'investment_inquiry') score += 30;
  if (inquiry.inquiry_type === 'corporate_inquiry') score += 25;
  if (inquiry.message && inquiry.message.length > 120) score += 10;
  if (inquiry.phone) score += 10;
  if (inquiry.company_name) score += 15;

  const tier = score >= 60 ? 'tier_1' : score >= 40 ? 'tier_2' : 'tier_3';
  const confidence = Math.min(0.95, 0.4 + score / 100);

  return { score, tier, confidence };
}
