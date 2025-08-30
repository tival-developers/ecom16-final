'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`bg-white border-r ${collapsed ? 'w-16' : 'w-64'} transition-all duration-200 hidden md:block`}>
      <div className="p-4 border-b flex justify-between items-center">
        {!collapsed && <span className="font-bold text-lg">SpendWise</span>}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </Button>
      </div>
      <nav className="p-4 space-y-2">
        {['Dashboard', 'Analytics', 'Product', 'Sales'].map((item) => (
          <div key={item} className="text-sm text-muted-foreground">{!collapsed && item}</div>
        ))}
      </nav>
    </aside>
  );
}
