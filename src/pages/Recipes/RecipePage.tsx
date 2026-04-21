import { useState } from 'react';
import { Badge, Button, CodeBlock, Flex, Typography } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { LivePreview } from '@components/LivePreview';
import { getRecipe, RECIPE_ORDER } from '@const/recipes.const';

interface RecipePageProps {
  slug: string;
}

export function RecipePage({ slug }: RecipePageProps) {
  const [showCode, setShowCode] = useState(false);
  const recipe = getRecipe(slug);

  if (!recipe) {
    return (
      <Flex direction="column" gap={3}>
        <Typography variant="h3" weight="bold">Recipe not found</Typography>
        <Link to="/docs/recipes">
          <Button variant="primary" size="sm">Back to recipes</Button>
        </Link>
      </Flex>
    );
  }

  const idx = RECIPE_ORDER.indexOf(slug);
  const prevSlug = idx > 0 ? RECIPE_ORDER[idx - 1] : undefined;
  const nextSlug = idx >= 0 && idx < RECIPE_ORDER.length - 1 ? RECIPE_ORDER[idx + 1] : undefined;

  return (
    <Flex direction="column" gap={5}>
      <Flex direction="column" gap={2}>
        <Flex direction="row" align="center" gap={2} className="ac-recipe-head">
          <Typography variant="h2" weight="bold">{recipe.title}</Typography>
          <Badge variant="secondary">Recipe</Badge>
        </Flex>
        <Typography variant="body1" color="muted" className="ac-recipe-lead">
          {recipe.description}
        </Typography>
        <Flex direction="row" gap={1} className="ac-recipe-tags">
          {recipe.tags.map((tag) => (
            <span key={tag} className="ac-recipe-tag">{tag}</span>
          ))}
        </Flex>
      </Flex>

      <Flex direction="row" align="center" gap={2} className="ac-recipe-toolbar">
        <Button
          variant={showCode ? 'outline' : 'primary'}
          size="sm"
          onClick={() => setShowCode(false)}
        >
          Preview
        </Button>
        <Button
          variant={showCode ? 'primary' : 'outline'}
          size="sm"
          onClick={() => setShowCode(true)}
        >
          View code
        </Button>
      </Flex>

      {showCode ? (
        <CodeBlock code={recipe.markup} language="html" title={`${recipe.title}.html`} showLineNumbers copyable />
      ) : (
        <LivePreview
          markup={recipe.markup}
          label="Mobile preview"
          minHeight={recipe.minHeight}
          showClasses={false}
        />
      )}

      <Flex direction="row" align="center" justify="between" className="ac-recipe-prev-next">
        {prevSlug ? (
          <Link to={`/docs/recipes/${prevSlug}`}>
            <Button variant="ghost" size="sm">← {RECIPES_LABEL(prevSlug)}</Button>
          </Link>
        ) : <span />}
        {nextSlug ? (
          <Link to={`/docs/recipes/${nextSlug}`}>
            <Button variant="ghost" size="sm">{RECIPES_LABEL(nextSlug)} →</Button>
          </Link>
        ) : <span />}
      </Flex>
    </Flex>
  );
}

function RECIPES_LABEL(slug: string): string {
  return getRecipe(slug)?.title ?? slug;
}

export function RecipesHubPage() {
  return (
    <Flex direction="column" gap={4}>
      <Flex direction="column" gap={2}>
        <Typography variant="h2" weight="bold">Recipes</Typography>
        <Typography variant="body1" color="muted" className="ac-recipe-lead">
          Copy-paste patterns for real product UI. Each recipe is mobile-first, designed for 44–48px
          touch targets, and emits zero runtime JavaScript. Flip the toggle to see the exact markup.
        </Typography>
      </Flex>

      <div className="ac-recipe-grid">
        {RECIPE_ORDER.map((slug) => {
          const r = getRecipe(slug);
          if (!r) return null;
          return (
            <Link key={slug} to={`/docs/recipes/${slug}`} className="ac-recipe-card-link">
              <div className="ac-recipe-card ac-card-hover">
                <div className="ac-recipe-card-preview">
                  <LivePreview
                    markup={r.markup}
                    minHeight={r.minHeight}
                    showClasses={false}
                    background="#100819"
                  />
                </div>
                <div className="ac-recipe-card-body">
                  <Typography variant="body1" weight="semibold">{r.title}</Typography>
                  <Typography variant="caption" color="muted">{r.description}</Typography>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Flex>
  );
}
