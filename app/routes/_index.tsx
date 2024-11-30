import type { MetaFunction } from "@remix-run/node";
import { useState } from 'react';
import { Trash2, PlusCircle } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription
} from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';

export const meta: MetaFunction = () => {
  return [
    { title: "Dough Calculator" },
    { name: "description", content: "Calculate bread dough ingredients" },
  ];
};

interface Ingredient {
  id: number;
  name: string;
  percentage: number;
  quantity?: string;
}

export default function Index() {
  const [desiredTotalWeight, setDesiredTotalWeight] = useState(1000);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: 1, name: 'Flour', percentage: 100 },
    { id: 2, name: 'Water', percentage: 65 },
    { id: 3, name: 'Salt', percentage: 2 },
  ]);

  const addIngredient = () => {
    const newId = Math.max(...ingredients.map(i => i.id)) + 1;
    setIngredients([...ingredients, {
      id: newId,
      name: '',
      percentage: 0
    }]);
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const updateIngredient = (id: number, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map(ing => {
      if (ing.id === id) {
        return { ...ing, [field]: value };
      }
      return ing;
    }));
  };

  const calculateQuantities = () => {
    const totalPercentage = ingredients.reduce((sum, ing) => sum + ing.percentage, 0);
    const scaleFactor = desiredTotalWeight / totalPercentage;

    return ingredients.map(ing => ({
      ...ing,
      quantity: (ing.percentage * scaleFactor).toFixed(1)
    }));
  };

  const results = calculateQuantities();
  const actualTotalWeight = results.reduce((sum, ing) => sum + parseFloat(ing.quantity || '0'), 0);

  return (
      <div className="container mx-auto p-4">
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Dough Calculator</CardTitle>
            <CardDescription>
              Total weight: {actualTotalWeight.toFixed(1)}g
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="desired-total">Desired Total Weight (g)</Label>
              <Input
                  id="desired-total"
                  type="number"
                  value={desiredTotalWeight}
                  onChange={(e) => setDesiredTotalWeight(Number(e.target.value))}
                  className="w-32"
              />
            </div>

            <div className="space-y-4">
              {ingredients.map((ing, index) => (
                  <div key={ing.id} className="flex items-center gap-4">
                    <Input
                        placeholder="Ingredient name"
                        value={ing.name}
                        onChange={(e) => updateIngredient(ing.id, 'name', e.target.value)}
                        className="w-48"
                    />
                    <Input
                        type="number"
                        value={ing.percentage}
                        onChange={(e) => updateIngredient(ing.id, 'percentage', Number(e.target.value))}
                        className="w-24"
                        suffix="%"
                    />
                    {results[index].quantity && (
                        <div className="w-24 text-right">
                          {results[index].quantity}g
                        </div>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeIngredient(ing.id)}
                        disabled={ingredients.length === 1}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="justify-between">
            <Button
                variant="outline"
                onClick={addIngredient}
                className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              Add Ingredient
            </Button>
          </CardFooter>
        </Card>
      </div>
  );
}