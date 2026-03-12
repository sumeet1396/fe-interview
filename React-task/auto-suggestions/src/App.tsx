import { useState, useEffect, useRef } from "react";
import useDebounce from "./hooks/useDebounce";
//import { LRUCache } from "./helper/cache";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

function App() {
  const [query, setQuery] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);

  const cache = useRef<Record<string, Recipe[]>>({});
  // LRU cache
  //const cache = useRef(new LRUCache<string, Recipe[]>(10));

  const controllerRef = useRef<AbortController | null>(null);

  const debouncedQuery = useDebounce(query, 500);

  const fetchData = async (searchQuery: string) => {
    try {
      const cached = cache.current[searchQuery];
      //const cached = cache.current.get(searchQuery);

      // check cache first
      if (cached) {
        setRecipes(cached);
        return;
      }

      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      const res = await fetch(
        `https://dummyjson.com/recipes/search?q=${searchQuery}`,
        { signal: controller.signal },
      );

      const data: RecipesResponse = await res.json();

      // store in cache
      cache.current[searchQuery] = data.recipes;
      //cache.current.put(searchQuery, data.recipes);

      setRecipes(data.recipes);
    } catch (err) {
      console.error("API Error:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setRecipes([]);
    }
  };

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    fetchData(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      <div className="w-full flex justify-center mt-8">
        <div className="w-75">
          <input
            type="text"
            name="search"
            id="search"
            className="border w-full mb-2 rounded-md"
            onChange={handleChange}
            onFocus={() => setIsResultVisible(true)}
            onBlur={() => setIsResultVisible(false)}
          />

          {recipes.length > 0 && isResultVisible && (
            <div className="border rounded mt-1 bg-white w-75 absolute shadow">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {recipe.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
