import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { Flex } from '@forgedevstack/bear';
import { TopNavbar } from '../TopNavbar';
import { CommandPalette } from '../CommandPalette';

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <Flex direction="column" style={{ minHeight: '100vh', width: '100%' }}>
      <TopNavbar onOpenSearch={() => setSearchOpen(true)} />
      <CommandPalette open={searchOpen} onClose={() => setSearchOpen(false)} />
      <Flex direction="column" style={{ flex: 1, width: '100%', minWidth: 0 }}>
        {children}
      </Flex>
    </Flex>
  );
}
