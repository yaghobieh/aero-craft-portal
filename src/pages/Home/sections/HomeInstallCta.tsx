import { Button, Flex, Typography, BearIcons } from '@forgedevstack/bear';
import { Link } from '@forgedevstack/forge-compass/react';
import { ROUTES, AEROCRAFT_VERSION } from '@const/routes.const';

export function HomeInstallCta() {
  return (
    <div
      style={{
        position: 'relative',
        borderRadius: 22,
        padding: 1,
        background: 'linear-gradient(120deg, #2563eb, #3b82f6, #6366f1, #4338ca)',
        boxShadow: '0 40px 80px rgba(37, 99, 235, 0.22)',
      }}
    >
      <div
        style={{
          position: 'relative',
          borderRadius: 21,
          background: 'radial-gradient(120% 140% at 0% 0%, rgba(59,130,246,0.18), transparent 60%), linear-gradient(180deg, #140a1d, #0a0311)',
          padding: 'clamp(28px, 5vw, 56px)',
          overflow: 'hidden',
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: -80,
            right: -80,
            width: 260,
            height: 260,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(195,77,247,0.22), transparent 60%)',
            filter: 'blur(40px)',
          }}
        />

        <Flex direction="column" gap={5} className="ac-relative-col">
          <Typography variant="caption" weight="semibold" className="ac-cta-kicker">
            Ready when you are
          </Typography>

          <Typography variant="h1" weight="bold" className="ac-cta-title">
            Install AeroCraft.
            <br />
            Ship the next PR in one class.
          </Typography>

          <Flex direction="row" gap={3} align="center" className="ac-flex-wrap">
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                padding: '14px 18px',
                borderRadius: 12,
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.12)',
                fontFamily: 'Fira Code, ui-monospace, monospace',
                fontSize: 14,
                color: '#fff',
              }}
            >
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>$</span>
              <span>npm i @forgedevstack/aerocraft</span>
              <span
                style={{
                  marginLeft: 8,
                  padding: '2px 8px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.12)',
                  fontSize: 11,
                  letterSpacing: '0.04em',
                }}
              >
                v{AEROCRAFT_VERSION}
              </span>
            </div>
          </Flex>

          <Flex direction="row" gap={3} className="ac-flex-wrap">
            <Link to="/docs/getting-started">
              <Button variant="primary" size="lg" className="ac-btn-on-dark-primary">
                <Flex align="center" gap={2}>
                  Start the tour
                  <BearIcons.ArrowRightIcon size="sm" />
                </Flex>
              </Button>
            </Link>
            <Link to={ROUTES.DOCS}>
              <Button variant="outline" size="lg" className="ac-btn-on-dark-outline">
                Reference
              </Button>
            </Link>
            <Link to={ROUTES.STUDIO}>
              <Button variant="ghost" size="lg" className="ac-btn-on-dark-ghost">
                <Flex align="center" gap={2}>
                  <BearIcons.PlayCircleIcon size="sm" />
                  Open Studio
                </Flex>
              </Button>
            </Link>
          </Flex>

          <Typography variant="caption" className="ac-cta-microcopy">
            Zero runtime dependencies · TypeScript · PostCSS · MIT licensed
          </Typography>
        </Flex>
      </div>
    </div>
  );
}
