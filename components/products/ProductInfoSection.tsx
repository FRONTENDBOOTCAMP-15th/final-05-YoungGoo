import type { NutritionNutrient } from '@/types/product';

type Props = {
  features: string[];
  nutritionFacts: NutritionNutrient[];
  intake: string;
  cautions: string[];
};

export default function ProductInfoSection({ features, nutritionFacts, intake, cautions }: Props) {
  return (
    <section className="space-y-10">
      {/* 기능 */}
      <div id="features">
        <h2 className="text-lg font-bold mb-3">기능</h2>
        <ul className="list-disc pl-5 space-y-1">
          {features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </div>

      {/* 영양정보 */}
      <div id="nutrition">
        <h2 className="text-lg font-bold mb-3">영양정보</h2>
        <ul className="space-y-2">
          {nutritionFacts.map((n) => (
            <li key={n.name} className="flex justify-between">
              <span>{n.name}</span>
              <span>
                {n.amount} ({n.percent})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 섭취 방법 */}
      <div id="intake">
        <h2 className="text-lg font-bold mb-3">섭취 방법</h2>
        <p>{intake}</p>
      </div>

      {/* 주의사항 */}
      <div id="cautions">
        <h2 className="text-lg font-bold mb-3">주의사항</h2>
        <ul className="list-disc pl-5 space-y-1">
          {cautions.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
