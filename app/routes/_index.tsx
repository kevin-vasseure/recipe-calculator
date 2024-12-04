import type { MetaFunction } from "@remix-run/node";
import PercentageCalculator from "~/components/PercentageCalculator";

export const meta: MetaFunction = () => {
  return [
    { title: "Dough Calculator" },
    { name: "description", content: "Calculate bread dough ingredients" },
  ];
};

export default function Index() {
  return (
      <div className="container mx-auto p-4">
        <PercentageCalculator
            title="Percentage Calculator"
            description="Calculate your ingredients with baker percentages"
            defaultWeight={1000}
            defaultIngredients={[
              { id: 1, name: 'Flour', percentage: 100 },
              { id: 2, name: 'Water', percentage: 65 },
              { id: 3, name: 'Salt', percentage: 2 },
            ]}
        />
      </div>
  );
}