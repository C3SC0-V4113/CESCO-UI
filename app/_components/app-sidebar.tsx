'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { componentBaseFromPathname } from '@/app/components/_docs/routes';
import { components } from '@/app/registry';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function AppSidebar() {
  const pathname = usePathname();
  const base = componentBaseFromPathname(pathname);
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <Link className="font-semibold tracking-tight" href="/">
          Cesco UI
        </Link>
        <p className="text-sm text-muted-foreground">Component registry</p>
      </SidebarHeader>
      <SidebarContent>
        <nav aria-label="Registry components">
          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarGroupContent>
              {components.length ? (
                <SidebarMenu>
                  {components.map((component) => {
                    const href = `/components/${base}/${component.name}`;
                    const isActive = pathname === href;

                    return (
                      <SidebarMenuItem key={component.name}>
                        <SidebarMenuButton
                          render={<Link href={href} />}
                          isActive={isActive}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => {
                            if (isMobile) setOpenMobile(false);
                          }}
                        >
                          {component.title}
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              ) : (
                <p className="px-2 py-2 text-sm text-muted-foreground">No components yet.</p>
              )}
            </SidebarGroupContent>
          </SidebarGroup>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
}
