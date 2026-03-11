import { ReactNode } from "react";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
}

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  return (
    <div className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:border-sky-100 hover:shadow-md sm:p-8">
      <div className="mb-4 inline-flex rounded-xl bg-sky-50 p-3 text-sky-600 transition group-hover:bg-sky-100">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-slate-800">{title}</h3>
      <p className="mt-2 text-slate-600">{description}</p>
    </div>
  );
}
