import React from 'react';

interface InfoCardProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  iconColor?: string;
  children: React.ReactNode;
}

const InfoCard: React.FC<InfoCardProps> = ({ 
  title, 
  subtitle, 
  icon, 
  iconColor = 'blue',
  children 
}) => {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 space-y-4">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg bg-${iconColor}-500/10 text-${iconColor}-400 shrink-0`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-medium text-white">{title}</h3>
          {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
};

export default InfoCard;
