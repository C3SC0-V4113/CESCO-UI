import { CopyButton } from './copy-button';

import type { ApiProp } from '../_docs/types';

export function InstallationSection({ name }: { name: string }) {
  const command = `npx shadcn@latest add @cesco/${name}`;
  return (
    <section aria-labelledby="installation-heading" className="min-w-0 space-y-4">
      <h2 id="installation-heading" className="text-xl font-semibold tracking-tight">
        Installation
      </h2>
      <div className="flex items-center justify-between gap-3 rounded-lg border bg-muted/40 p-4">
        <code className="overflow-x-auto text-sm">{command}</code>
        <CopyButton value={command} />
      </div>
      <p className="text-sm text-muted-foreground">
        Add the Cesco registry to <code>components.json</code>:
      </p>
      <pre className="max-w-full overflow-auto rounded-lg border bg-muted/40 p-4 text-sm">
        <code>{`{
  "registries": {
    "@cesco": "https://ui.cescovalle.com/r/{style}/{name}.json"
  }
}`}</code>
      </pre>
    </section>
  );
}

export function UsageSection({ usage }: { usage: string }) {
  return (
    <section aria-labelledby="usage-heading" className="min-w-0 space-y-4">
      <h2 id="usage-heading" className="text-xl font-semibold tracking-tight">
        Usage
      </h2>
      <pre className="max-w-full overflow-auto rounded-lg border bg-muted/40 p-4 text-sm">
        <code>{usage}</code>
      </pre>
    </section>
  );
}

export function ApiReference({ props }: { props: ApiProp[] }) {
  return (
    <section aria-labelledby="api-heading" className="min-w-0 space-y-4">
      <h2 id="api-heading" className="text-xl font-semibold tracking-tight">
        API Reference
      </h2>
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full min-w-[48rem] table-fixed text-left text-sm">
          <colgroup>
            <col className="w-[25%]" />
            <col className="w-[25%]" />
            <col className="w-[20%]" />
            <col className="w-[30%]" />
          </colgroup>
          <thead className="border-b bg-muted/40">
            <tr>
              <th scope="col" className="p-3 font-medium">
                Prop
              </th>
              <th scope="col" className="p-3 font-medium">
                Type
              </th>
              <th scope="col" className="p-3 font-medium">
                Default
              </th>
              <th scope="col" className="p-3 font-medium">
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {props.map((prop) => (
              <tr key={prop.name} className="border-b last:border-0">
                <th scope="row" className="p-3 font-mono font-normal">
                  {prop.name}
                </th>
                <td className="p-3 font-mono break-words">{prop.type}</td>
                <td className="p-3 font-mono break-words">{prop.defaultValue}</td>
                <td className="p-3 break-words text-muted-foreground">{prop.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
